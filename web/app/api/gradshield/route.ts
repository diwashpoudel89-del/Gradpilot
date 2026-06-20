import { NextRequest, NextResponse } from "next/server";
import { MODEL, anthropic } from "@/lib/anthropic";
import { createSupabaseServerClient } from "@/lib/auth-server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are GradShield, GradPilot AI's accommodation-scam analyst for international students in the UK. International students are heavily targeted by rental fraud. Analyse the pasted listing, landlord/agent message, or rental terms and assess scam risk.

Look for classic red flags: requests to pay a deposit or "holding fee" before viewing, landlord "abroad" who can't show the property, pressure to act fast, payment by bank transfer/crypto/gift cards only, off-platform communication, prices well below market, poor grammar with urgency, no tenancy agreement, no deposit-protection scheme mention, requests for passport/visa copies up front. Also note genuine green flags. Be specific and practical, and never tell the student something is safe with certainty — frame as risk.`;

const SCHEMA = {
  type: "object",
  properties: {
    risk_score: { type: "integer" },
    risk_level: { type: "string", enum: ["Low", "Medium", "High"] },
    summary: { type: "string" },
    red_flags: { type: "array", items: { type: "string" } },
    green_flags: { type: "array", items: { type: "string" } },
    advice: { type: "array", items: { type: "string" } },
  },
  required: ["risk_score", "risk_level", "summary", "red_flags", "green_flags", "advice"],
  additionalProperties: false,
} as const;

export async function POST(req: NextRequest) {
  const client = anthropic;
  if (!client) {
    return NextResponse.json({ error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." }, { status: 503 });
  }

  let listing = "";
  try {
    const body = await req.json();
    listing = String(body?.listing ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (listing.length < 30) {
    return NextResponse.json({ error: "Paste the listing or landlord message to analyse." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to use GradShield.", requiresAuth: true }, { status: 401 });
  }

  try {
    const params: Record<string, unknown> = {
      model: MODEL,
      max_tokens: 3000,
      system: SYSTEM,
      output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
      messages: [{ role: "user", content: `Analyse this for scam risk:\n\n${listing}` }],
    };
    const message = (await client.messages.create(
      params as unknown as Parameters<typeof client.messages.create>[0]
    )) as unknown as { content: { type: string; text?: string }[] };
    const textBlock = message.content.find((b) => b.type === "text");
    return NextResponse.json(JSON.parse(textBlock?.text ?? "{}"));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("gradshield error", err);
    return NextResponse.json({ error: "GradShield hit an error. Please try again." }, { status: 500 });
  }
}
