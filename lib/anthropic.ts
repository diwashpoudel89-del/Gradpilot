import Anthropic from "@anthropic-ai/sdk";

// In-app AI runs on Claude Opus 4.8 — the most capable model available.
export const MODEL = "claude-opus-4-8";

export const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export const ADVISER_SYSTEM = `You are GradPilot AI's career adviser for international students and graduates in the UK.

You give honest, specific, practical guidance on:
- The Graduate Route visa (2 years post-study work, 3 for PhDs; any employer, no sponsorship needed while active) and how it differs from the Skilled Worker visa.
- Finding visa-sponsoring jobs, and which UK employers tend to sponsor.
- Writing CVs and cover letters for UK employers (format, language, keywords).
- Interview preparation for UK graduate hiring (behavioural, competency, technical).
- The realities of the UK job market for international graduates.

Style: lead with the answer, then the supporting detail. Be concrete and warm, never generic. Tailor advice to the user's situation when they share it; ask one focused question only when it genuinely changes your answer.

Important: you provide general guidance, not legal or immigration advice. For visa decisions, tell users to verify against official UK Government (GOV.UK) guidance or a qualified immigration adviser. Never invent specific visa rules, salary thresholds, or employer policies — if unsure, say so.`;

// Helper: call Opus 4.8 with structured JSON output. Returns parsed JSON.
// Adaptive thinking + effort + output_config are valid at runtime but lag the
// installed SDK types, so params pass through a loose object.
export async function generateJson(opts: {
  system: string;
  prompt: string;
  schema: Record<string, unknown>;
  maxTokens?: number;
}): Promise<Record<string, unknown>> {
  if (!anthropic) throw new Error("ANTHROPIC_API_KEY not set");
  const params: Record<string, unknown> = {
    model: MODEL,
    max_tokens: opts.maxTokens ?? 4000,
    system: opts.system,
    output_config: { effort: "medium", format: { type: "json_schema", schema: opts.schema } },
    messages: [{ role: "user", content: opts.prompt }],
  };
  const message = (await anthropic.messages.create(
    params as unknown as Parameters<typeof anthropic.messages.create>[0]
  )) as unknown as { content: { type: string; text?: string }[] };
  const text = message.content.find((b) => b.type === "text")?.text ?? "{}";
  return JSON.parse(text);
}
