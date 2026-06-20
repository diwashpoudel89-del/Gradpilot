"use client";

import { useState } from "react";
import { Loader2, Map, Check } from "lucide-react";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

type Phase = { title: string; timeframe: string; steps: string[] };
type Result = { summary: string; phases: Phase[] };

export function GradPath() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/gradpath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
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

  return (
    <div className="space-y-8">
      <form onSubmit={generate} className="space-y-3">
        <input
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
          placeholder="Optional: your specific goal (e.g. 'land a sponsored data role in London by July')"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button type="submit" disabled={loading} className={cn(btnPrimary, sizeLg)}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Map className="size-4" />}
          {loading ? "Building your roadmap…" : "Generate my GradPath"}
        </button>
        <p className="text-xs text-muted-foreground">
          We use your profile (degree, visa timeline, target roles) to personalise the plan.
        </p>
      </form>

      {result && (
        <div className="space-y-6">
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            {result.summary}
          </p>
          <ol className="space-y-5">
            {result.phases.map((phase, i) => (
              <li key={i} className="relative rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{phase.title}</h3>
                    <p className="text-xs text-muted-foreground">{phase.timeframe}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 pl-1">
                  {phase.steps.map((s, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
