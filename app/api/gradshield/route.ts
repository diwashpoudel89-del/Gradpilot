import { NextRequest, NextResponse } from "next/server";
import { anthropic, generateJson } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are GradShield, GradPilot AI's accommodation-scam analyst for international students in the UK, who are heavily targeted by rental fraud. Analyse the pasted listing, landlord/agent message, or tenancy terms and assess scam risk.

Red flags include: pay a deposit/holding fee before viewing, landlord "abroad" who can't show the property, pressure to act fast, payment by bank transfer/crypto/gift cards only, off-platform contact, prices well below market, urgency with poor grammar, no tenancy agreement, no deposit-protection scheme, passport/visa requested up front. Note genuine green flags too. Never declare something safe with certainty — frame as risk.`;

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
};

export async function POST(req: NextRequest) {
  if (!anthropic) {
    return NextResponse.json({ error: "AI isn't configured yet (missing ANTHROPIC_API_KEY)." }, { status: 503 });
  }
  let listing = "";
  try {
    listing = String((await req.json())?.listing ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (listing.length < 30) {
    return NextResponse.json({ error: "Paste the listing or landlord message to analyse." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use GradShield.", requiresAuth: true }, { status: 401 });

  try {
    const parsed = await generateJson({
      system: SYSTEM,
      prompt: `Analyse this for scam risk:\n\n${listing}`,
      schema: SCHEMA,
      maxTokens: 3000,
    });
    return NextResponse.json(parsed);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("gradshield error", err);
    return NextResponse.json({ error: "GradShield hit an error. Please try again." }, { status: 500 });
  }
}
