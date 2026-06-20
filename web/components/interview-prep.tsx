"use client";

import { useState } from "react";
import { ChevronRight, Lightbulb, Loader2, Sparkles } from "lucide-react";
import { btnOutline, btnPrimary, cn, sizeLg, sizeMd } from "@/lib/ui";

export type Question = {
  id: string;
  question: string;
  category: string | null;
  difficulty: string | null;
  tips_for_international: string | null;
};

type Result = {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  model_answer: string;
};

export function InterviewPrep({ questions }: { questions: Question[] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const q = questions[index];

  function next() {
    setIndex((i) => (i + 1) % questions.length);
    setAnswer("");
    setResult(null);
    setError("");
    setShowTip(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.question, answer }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult(data as Result);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!q) return <p className="text-muted-foreground">No questions available yet.</p>;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-2">
          {q.category && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-primary">
              {q.category}
            </span>
          )}
          {q.difficulty && (
            <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground capitalize">
              {q.difficulty}
            </span>
          )}
        </div>
        <p className="mt-3 font-display text-lg font-semibold">{q.question}</p>

        {q.tips_for_international && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowTip((s) => !s)}
              className="inline-flex items-center gap-1.5 text-sm text-primary"
            >
              <Lightbulb className="size-4" /> {showTip ? "Hide" : "Show"} tip for international candidates
            </button>
            {showTip && (
              <p className="mt-2 rounded-xl bg-secondary/60 p-3 text-sm text-muted-foreground">
                {q.tips_for_international}
              </p>
            )}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <textarea
          className="min-h-[160px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
          placeholder="Type your answer here…"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={loading} className={cn(btnPrimary, sizeLg)}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Scoring…" : "Get AI feedback"}
          </button>
          <button type="button" onClick={next} className={cn(btnOutline, sizeMd)}>
            Next question <ChevronRight className="size-4" />
          </button>
        </div>
      </form>

      {result && (
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-4">
            <p className="font-display text-4xl font-extrabold text-gradient">{result.score}</p>
            <p className="flex-1 text-sm text-muted-foreground">{result.feedback}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-green-700">Strengths</h4>
              <ul className="mt-2 space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-700">To improve</h4>
              <ul className="mt-2 space-y-1">
                {result.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Model answer</h4>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {result.model_answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
