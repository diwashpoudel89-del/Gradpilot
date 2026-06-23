import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// AI is optional: the platform runs fully without a key, and every AI surface
// degrades to a "coming soon" state when this is false. Set ANTHROPIC_API_KEY
// in the environment to switch the features on — never commit the key.
export const aiConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

// The latest Claude model per the project spec.
const MODEL = "claude-sonnet-4-6";

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

// Single-shot helper: send a system + user prompt, get back the text response.
export async function askClaude(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
}): Promise<string> {
  const res = await getClient().messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 2048,
    system: opts.system,
    messages: [{ role: "user", content: opts.prompt }],
  });
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}
