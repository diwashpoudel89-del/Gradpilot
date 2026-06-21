"use client";

import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "I'm on the Graduate Route with 14 months left — how do I prioritise my job search?",
  "Which UK industries are most likely to sponsor a Skilled Worker visa after my Graduate Route ends?",
  "How should I change my CV from my home country for UK employers?",
];

export function AdviserChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }));
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next); setInput(""); setStreaming(true); scrollToBottom();
    try {
      const res = await fetch("/api/adviser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        setMessages([...next, { role: "assistant", content: errText || "Something went wrong." }]);
        return;
      }
      setMessages([...next, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
        scrollToBottom();
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Network error — please try again." }]);
    } finally {
      setStreaming(false); scrollToBottom();
    }
  }

  return (
    <div className="card flex h-[70vh] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <p className="max-w-md text-slate-600">Ask GradPilot AI anything about the Graduate Route, visa-sponsoring jobs, UK CVs, or interviews. Powered by Claude Opus 4.8.</p>
            <div className="flex flex-col gap-2">
              {STARTERS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-left text-sm text-slate-600 transition-colors hover:border-brand-400 hover:text-slate-900">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-brand-500 text-white" : "border border-slate-200 bg-white text-slate-800"}`}>
                {m.content || <span className="text-slate-400">Thinking…</span>}
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-slate-200 p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about visas, jobs, CVs, interviews…" className="h-11 flex-1 rounded-full border border-slate-300 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
        <button type="submit" disabled={streaming || !input.trim()} className="btn-primary h-11 px-5 text-sm">Send</button>
      </form>
    </div>
  );
}
