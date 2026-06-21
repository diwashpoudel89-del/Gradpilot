"use client";

import { useState } from "react";

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
    setAnswer(""); setResult(null); setError(""); setShowTip(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setResult(null); setLoading(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.question, answer }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data as Result);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!q) return <p className="text-slate-600">No questions available yet.</p>;

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <div className="flex flex-wrap gap-2">
          {q.category && <span className="badge bg-brand-50 text-brand-700">{q.category}</span>}
          {q.difficulty && <span className="badge border border-slate-200 text-slate-500 capitalize">{q.difficulty}</span>}
        </div>
        <p className="mt-3 font-display text-lg font-semibold">{q.question}</p>
        {q.tips_for_international && (
          <div className="mt-3">
            <button type="button" onClick={() => setShowTip((s) => !s)} className="text-sm font-medium text-brand-600 hover:underline">
              {showTip ? "Hide" : "Show"} tip for international candidates
            </button>
            {showTip && <p className="mt-2 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">{q.tips_for_international}</p>}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <textarea
          className="min-h-[160px] w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          placeholder="Type your answer here…" value={answer} onChange={(e) => setAnswer(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={loading} className="btn-primary h-12 px-7 text-sm">
            {loading ? "Scoring…" : "Get AI feedback"}
          </button>
          <button type="button" onClick={next} className="btn-outline h-12 px-5 text-sm">Next question →</button>
        </div>
      </form>

      {result && (
        <div className="card space-y-4 p-5">
          <div className="flex items-center gap-4">
            <p className="font-display text-4xl font-extrabold text-gradient">{result.score}</p>
            <p className="flex-1 text-sm text-slate-600">{result.feedback}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-emerald-700">Strengths</h4>
              <ul className="mt-2 space-y-1">{result.strengths.map((s, i) => <li key={i} className="text-sm text-slate-600">• {s}</li>)}</ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-700">To improve</h4>
              <ul className="mt-2 space-y-1">{result.improvements.map((s, i) => <li key={i} className="text-sm text-slate-600">• {s}</li>)}</ul>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Model answer</h4>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{result.model_answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
