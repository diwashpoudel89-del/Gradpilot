import { NextRequest, NextResponse } from "next/server";
import { anthropic, generateJson } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const FREE_DAILY_LIMIT = 15;

const SYSTEM = `You are GradPilot AI's interview coach for international students interviewing with UK graduate employers. Score the candidate's answer honestly against what UK graduate recruiters look for (structure, specificity, evidence, STAR where relevant, commercial awareness). Give warm, concrete feedback and a strong model answer. Where relevant add a tip specific to international candidates.`;

const SCHEMA = {
  type: "object",
  properties: {
    score: { type: "integer" },
    feedback: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
    model_answer: { type: "string" },
  },
  required: ["score", "feedback", "strengths", "improvements", "model_answer"],
  additionalProperties: false,
};

const startOfDay = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();
};

export async function POST(req: NextRequest) {
  if (!anthropic) {
    return NextResponse.json({ error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." }, { status: 503 });
  }

  let question = "", answer = "", role = "";
  try {
    const b = await req.json();
    question = String(b?.question ?? "").trim();
    answer = String(b?.answer ?? "").trim();
    role = String(b?.role ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!question || answer.length < 10) {
    return NextResponse.json({ error: "Write a fuller answer before submitting." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use interview prep.", requiresAuth: true }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
  if ((profile?.plan ?? "free") === "free") {
    const { count } = await supabase
      .from("interview_prep_sessions").select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", startOfDay());
    if ((count ?? 0) >= FREE_DAILY_LIMIT) {
      return NextResponse.json(
        { error: `You've reached today's free practice limit (${FREE_DAILY_LIMIT}). Upgrade to Pro for unlimited.`, limitReached: true },
        { status: 429 }
      );
    }
  }

  try {
    const parsed = await generateJson({
      system: SYSTEM,
      prompt: `Target role: ${role || "(graduate role)"}\n\nInterview question:\n${question}\n\nCandidate's answer:\n${answer}`,
      schema: SCHEMA,
      maxTokens: 4000,
    });
    await supabase.from("interview_prep_sessions").insert({
      user_id: user.id,
      target_role: role || "General practice",
      questions: [{ question, answer, ...parsed }],
      overall_score: parsed.score ?? null,
      ai_feedback_summary: parsed.feedback ?? null,
      session_type: "single",
      completed: true,
    });
    return NextResponse.json(parsed);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("interview route error", err);
    return NextResponse.json({ error: "The interview coach hit an error. Please try again." }, { status: 500 });
  }
}
