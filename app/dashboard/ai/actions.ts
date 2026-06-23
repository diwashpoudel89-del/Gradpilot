"use server";

import { createClient } from "@/lib/supabase/server";
import { aiConfigured, askClaude } from "@/lib/ai";
import { getProfile } from "@/lib/queries";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated");
  return { supabase, user: data.user };
}

export type AiResult = { ok: true; text: string } | { ok: false; error: string };

const NOT_CONFIGURED =
  "AI features aren't switched on yet. They'll activate automatically once the team adds an API key — check back soon.";

// ---- CV coach: score the CV and suggest concrete UK/ATS improvements ----
export async function reviewCv(input: { cv: string; targetRole?: string }): Promise<AiResult> {
  if (!aiConfigured) return { ok: false, error: NOT_CONFIGURED };
  const cv = input.cv.trim();
  if (cv.length < 50) return { ok: false, error: "Please paste your CV (at least a few lines)." };

  try {
    const { supabase, user } = await requireUser();
    const text = await askClaude({
      system:
        "You are an expert UK careers adviser and CV coach for international students seeking visa-sponsoring roles. " +
        "Review the CV for UK employers and ATS systems. Respond in markdown with: an overall score out of 100, " +
        "3-5 specific strengths, 3-5 prioritised improvements, and ATS/keyword notes. Be concrete and concise.",
      prompt: `Target role: ${input.targetRole || "(not specified)"}\n\nCV:\n${cv}`,
      maxTokens: 1800,
    });

    await supabase.from("cvs").insert({
      user_id: user.id,
      original_content: cv,
      target_role: input.targetRole || null,
      analysis: { review: text },
    });

    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

// ---- Career adviser: plain-English answers on visas, applications, etc. ----
export async function askAdviser(input: { question: string }): Promise<AiResult> {
  if (!aiConfigured) return { ok: false, error: NOT_CONFIGURED };
  const question = input.question.trim();
  if (!question) return { ok: false, error: "Please enter a question." };

  try {
    const { supabase, user } = await requireUser();
    const profile = await getProfile(user.id);
    const context = profile
      ? `The student is from ${profile.country_of_origin ?? "abroad"}, studying ${
          profile.degree_subject ?? "a degree"
        } at ${profile.university ?? "a UK university"}, visa type ${profile.visa_type ?? "unknown"}.`
      : "";

    const text = await askClaude({
      system:
        "You are GradPilot's career adviser for international students in the UK. Give clear, accurate, plain-English " +
        "guidance on visas (Graduate Route, Skilled Worker), job applications, and switching visas. " +
        "Be practical and cite official sources where relevant. Note you are not a legal adviser for complex cases.",
      prompt: `${context}\n\nQuestion: ${question}`,
      maxTokens: 1500,
    });

    await supabase.from("ai_conversations").insert({
      user_id: user.id,
      topic: question.slice(0, 120),
      messages: [
        { role: "user", content: question },
        { role: "assistant", content: text },
      ],
    });

    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

// ---- Interview prep: generate tailored practice questions ----
export async function generateInterviewQuestions(input: {
  role: string;
  company?: string;
}): Promise<AiResult> {
  if (!aiConfigured) return { ok: false, error: NOT_CONFIGURED };
  const role = input.role.trim();
  if (!role) return { ok: false, error: "Please enter a target role." };

  try {
    const { supabase, user } = await requireUser();
    const text = await askClaude({
      system:
        "You are an interview coach for international graduates applying to UK employers. Generate 8 realistic " +
        "interview questions tailored to the role, mixing behavioural, technical, and visa/right-to-work-aware " +
        "questions. For each, add a one-line tip on what a strong answer covers. Respond in markdown.",
      prompt: `Role: ${role}\nCompany: ${input.company || "(not specified)"}`,
      maxTokens: 1800,
    });

    await supabase.from("interview_prep_sessions").insert({
      user_id: user.id,
      target_role: role,
      target_company: input.company || null,
      questions: { generated: text },
    });

    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}
