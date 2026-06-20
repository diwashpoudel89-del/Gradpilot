import { NextRequest, NextResponse } from "next/server";
import { MODEL, anthropic } from "@/lib/anthropic";
import { createSupabaseServerClient } from "@/lib/auth-server";

export const runtime = "nodejs";
export const maxDuration = 60;

const FREE_DAILY_LIMIT = 15;

const SYSTEM = `You are GradPilot AI's interview coach for international students interviewing with UK graduate employers. Score the candidate's answer honestly against what UK graduate recruiters look for (structure, specificity, evidence, the STAR method where relevant, and commercial awareness). Give warm, concrete feedback and a strong model answer. Where relevant, add a tip specific to international candidates (e.g. handling visa/right-to-work questions confidently).`;

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
} as const;

function startOfDayISO() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();
}

export async function POST(req: NextRequest) {
  const client = anthropic;
  if (!client) {
    return NextResponse.json(
      { error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 }
    );
  }

  let question = "";
  let answer = "";
  let role = "";
  try {
    const body = await req.json();
    question = String(body?.question ?? "").trim();
    answer = String(body?.answer ?? "").trim();
    role = String(body?.role ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!question || answer.length < 10) {
    return NextResponse.json(
      { error: "Write a fuller answer before submitting." },
      { status: 400 }
    );
  }

  // Require sign-in.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "Please sign in to use interview prep.", requiresAuth: true },
      { status: 401 }
    );
  }

  // Free-tier daily limit.
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle();
  if ((profile?.plan ?? "free") === "free") {
    const { count } = await supabase
      .from("interview_prep_sessions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfDayISO());
    if ((count ?? 0) >= FREE_DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: `You've reached today's free practice limit (${FREE_DAILY_LIMIT}). Upgrade to Pro for unlimited.`,
          limitReached: true,
        },
        { status: 429 }
      );
    }
  }

  try {
    const params: Record<string, unknown> = {
      model: MODEL,
      max_tokens: 4000,
      system: SYSTEM,
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: SCHEMA },
      },
      messages: [
        {
          role: "user",
          content: `Target role: ${role || "(graduate role)"}\n\nInterview question:\n${question}\n\nCandidate's answer:\n${answer}`,
        },
      ],
    };

    const message = (await client.messages.create(
      params as unknown as Parameters<typeof client.messages.create>[0]
    )) as unknown as { content: { type: string; text?: string }[] };
    const textBlock = message.content.find((b) => b.type === "text");
    const parsed = JSON.parse(textBlock?.text ?? "{}");

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
    return NextResponse.json(
      { error: "The interview coach hit an error. Please try again." },
      { status: 500 }
    );
  }
}
