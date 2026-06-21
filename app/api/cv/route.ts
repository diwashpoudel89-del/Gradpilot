import { NextRequest, NextResponse } from "next/server";
import { anthropic, generateJson } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const FREE_MONTHLY_LIMIT = 3;

const SYSTEM = `You are GradPilot AI's CV coach for international students applying to UK employers. You know what UK graduate recruiters expect: a concise (1-2 page) reverse-chronological CV, no photo, no date of birth, strong action verbs, quantified achievements, UK spelling, and clear visa/right-to-work positioning for Graduate Route candidates.

Score the CV honestly out of 100 for UK-readiness, give specific actionable suggestions, rewrite it for the UK market, and draft a tailored cover letter. Be specific, never generic.`;

const SCHEMA = {
  type: "object",
  properties: {
    score: { type: "integer" },
    summary: { type: "string" },
    suggestions: { type: "array", items: { type: "string" } },
    rewritten_cv: { type: "string" },
    cover_letter: { type: "string" },
  },
  required: ["score", "summary", "suggestions", "rewritten_cv", "cover_letter"],
  additionalProperties: false,
};

const startOfMonth = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString();
};

export async function POST(req: NextRequest) {
  if (!anthropic) {
    return NextResponse.json({ error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." }, { status: 503 });
  }

  let cvText = "", targetRole = "", targetCompany = "";
  try {
    const b = await req.json();
    cvText = String(b?.cvText ?? "").trim();
    targetRole = String(b?.targetRole ?? "").trim();
    targetCompany = String(b?.targetCompany ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (cvText.length < 50) {
    return NextResponse.json({ error: "Please paste your CV (at least a few lines)." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use the CV Coach.", requiresAuth: true }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
  if ((profile?.plan ?? "free") === "free") {
    const { count } = await supabase
      .from("cvs").select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", startOfMonth());
    if ((count ?? 0) >= FREE_MONTHLY_LIMIT) {
      return NextResponse.json(
        { error: `You've used your ${FREE_MONTHLY_LIMIT} free CV analyses this month. Upgrade to Pro for unlimited.`, limitReached: true },
        { status: 429 }
      );
    }
  }

  try {
    const parsed = await generateJson({
      system: SYSTEM,
      prompt: `Target role: ${targetRole || "(not specified)"}${targetCompany ? `\nTarget company: ${targetCompany}` : ""}\n\nCV:\n${cvText}`,
      schema: SCHEMA,
      maxTokens: 8000,
    });
    await supabase.from("cvs").insert({
      user_id: user.id,
      original_content: cvText,
      rewritten_content: parsed.rewritten_cv ?? null,
      cover_letter: parsed.cover_letter ?? null,
      target_role: targetRole || null,
      target_company: targetCompany || null,
      score: parsed.score ?? null,
      suggestions: parsed.suggestions ?? null,
      analysis: parsed,
    });
    return NextResponse.json(parsed);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("cv route error", err);
    return NextResponse.json({ error: "The CV coach hit an error. Please try again." }, { status: 500 });
  }
}
