import { NextRequest, NextResponse } from "next/server";
import { anthropic, generateJson } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are GradPath, GradPilot AI's roadmap planner for international students in the UK. Build a personalised, realistic, step-by-step roadmap from where the student is now to a sponsored UK job and a settled life, organised around their Graduate Route timeline.

Cover where relevant: profile/CV readiness, sponsorship job search, applications and interviews, relocation logistics (bank account, NI number, GP/NHS, address), and career growth. Be concrete and encouraging with realistic timeframes. Tailor to the profile provided.`;

const SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    phases: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          timeframe: { type: "string" },
          steps: { type: "array", items: { type: "string" } },
        },
        required: ["title", "timeframe", "steps"],
        additionalProperties: false,
      },
    },
  },
  required: ["summary", "phases"],
  additionalProperties: false,
};

export async function POST(req: NextRequest) {
  if (!anthropic) {
    return NextResponse.json({ error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." }, { status: 503 });
  }
  let goal = "";
  try {
    goal = String((await req.json())?.goal ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use GradPath.", requiresAuth: true }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("degree_level, degree_subject, country_of_origin, visa_type, visa_expiry_date, target_industry, target_roles, experience_level")
    .eq("id", user.id)
    .maybeSingle();

  const context = profile ? `Student profile:\n${JSON.stringify(profile)}` : "No profile details provided.";
  const ask = goal ? `Their stated goal: ${goal}` : "Goal: land a visa-sponsored UK graduate role.";

  try {
    const parsed = await generateJson({
      system: SYSTEM,
      prompt: `${context}\n\n${ask}\n\nBuild my GradPath roadmap.`,
      schema: SCHEMA,
      maxTokens: 4000,
    });
    return NextResponse.json(parsed);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("gradpath error", err);
    return NextResponse.json({ error: "GradPath hit an error. Please try again." }, { status: 500 });
  }
}
