import { NextRequest } from "next/server";
import { ADVISER_SYSTEM, MODEL, anthropic } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const client = anthropic;
  if (!client) {
    return new Response("The AI adviser isn't configured yet (missing ANTHROPIC_API_KEY).", {
      status: 503,
    });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  const clean = messages
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-20);
  if (clean.length === 0) return new Response("No message to respond to.", { status: 400 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Please sign in to chat with the AI adviser.", { status: 401 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const params: Record<string, unknown> = {
          model: MODEL,
          max_tokens: 4096,
          system: ADVISER_SYSTEM,
          thinking: { type: "adaptive" },
          output_config: { effort: "medium" },
          messages: clean,
        };
        const run = client.messages.stream(
          params as unknown as Parameters<typeof client.messages.stream>[0]
        );
        let full = "";
        for await (const event of run) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            full += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
        try {
          await supabase.from("ai_conversations").insert({
            user_id: user.id,
            topic: clean[0]?.content.slice(0, 80) ?? "Career chat",
            messages: [...clean, { role: "assistant", content: full }],
          });
        } catch {
          /* best-effort */
        }
      } catch (err) {
        controller.enqueue(encoder.encode("\n\n[Sorry — the adviser hit an error. Please try again.]"));
        controller.close();
        // eslint-disable-next-line no-console
        console.error("adviser error", err);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
