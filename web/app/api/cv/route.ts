import { NextRequest, NextResponse } from "next/server";
import { MODEL, anthropic } from "@/lib/anthropic";
import { createSupabaseServerClient } from "@/lib/auth-server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are GradPilot AI's CV coach for international students applying to UK employers. You know exactly what UK graduate recruiters expect: a concise (1-2 page) reverse-chronological CV, no photo, no date of birth, strong action verbs, quantified achievements, UK spelling, and clear visa/right-to-work positioning for Graduate Route candidates.

You will receive a CV and a target role. Score it honestly out of 100 for UK-readiness, give specific, actionable suggestions, rewrite it for the UK market, and draft a tailored cover letter. Be specific and practical, never generic.`;

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
} as const;

export async function POST(req: NextRequest) {
  const client = anthropic;
  if (!client) {
    return NextResponse.json(
      { error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 }
    );
  }

  let cvText = "";
  let targetRole = "";
  let targetCompany = "";
  try {
    const body = await req.json();
    cvText = String(body?.cvText ?? "").trim();
    targetRole = String(body?.targetRole ?? "").trim();
    targetCompany = String(body?.targetCompany ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (cvText.length < 50) {
    return NextResponse.json(
      { error: "Please paste your CV (at least a few lines)." },
      { status: 400 }
    );
  }

  const userPrompt = `Target role: ${targetRole || "(not specified)"}${
    targetCompany ? `\nTarget company: ${targetCompany}` : ""
  }\n\nCV:\n${cvText}`;

  try {
    const params: Record<string, unknown> = {
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM,
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: SCHEMA },
      },
      messages: [{ role: "user", content: userPrompt }],
    };

    const message = (await client.messages.create(
      params as unknown as Parameters<typeof client.messages.create>[0]
    )) as unknown as { content: { type: string; text?: string }[] };

    const textBlock = message.content.find((b) => b.type === "text");
    const parsed = JSON.parse(textBlock?.text ?? "{}");

    // Persist for signed-in users (best-effort; RLS scopes to the user).
    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
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
      }
    } catch {
      // saving is best-effort
    }

    return NextResponse.json(parsed);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("cv route error", err);
    return NextResponse.json({ error: "The CV coach hit an error. Please try again." }, { status: 500 });
  }
}
