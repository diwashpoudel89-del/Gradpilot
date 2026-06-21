"use client";

import { useState } from "react";

type Phase = { title: string; timeframe: string; steps: string[] };
type Result = { summary: string; phases: Phase[] };

export function GradPath() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setResult(null); setLoading(true);
    try {
      const res = await fetch("/api/gradpath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
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

  return (
    <div className="space-y-8">
      <form onSubmit={generate} className="space-y-3">
        <input
          className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          placeholder="Optional: your goal (e.g. 'land a sponsored data role in London by July')"
          value={goal} onChange={(e) => setGoal(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary h-12 px-7 text-sm">
          {loading ? "Building your roadmap…" : "Generate my GradPath"}
        </button>
        <p className="text-xs text-slate-500">We use your profile (degree, visa timeline, target roles) to personalise the plan.</p>
      </form>

      {result && (
        <div className="space-y-6">
          <p className="card p-5 text-sm text-slate-600">{result.summary}</p>
          <ol className="space-y-5">
            {result.phases.map((phase, i) => (
              <li key={i} className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{phase.title}</h3>
                    <p className="text-xs text-slate-500">{phase.timeframe}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">{phase.steps.map((s, j) => <li key={j} className="text-sm text-slate-600">• {s}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
