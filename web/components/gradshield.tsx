"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

type Result = {
  risk_score: number;
  risk_level: "Low" | "Medium" | "High";
  summary: string;
  red_flags: string[];
  green_flags: string[];
  advice: string[];
};

const LEVEL_STYLE: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

export function GradShield() {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function analyse(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/gradshield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
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
      <form onSubmit={analyse} className="space-y-3">
        <textarea
          className="min-h-[200px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
          placeholder="Paste the accommodation listing, the landlord/agent's messages, or the tenancy terms here…"
          value={listing}
          onChange={(e) => setListing(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className={cn(btnPrimary, sizeLg)}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
          {loading ? "Scanning with Claude Opus 4.8…" : "Scan for scam risk"}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-gradient">{result.risk_score}</p>
              <p className="text-xs text-muted-foreground">/ 100 risk</p>
            </div>
            <div className="flex-1">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", LEVEL_STYLE[result.risk_level])}>
                {result.risk_level} risk
              </span>
              <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
            </div>
          </div>

          {result.red_flags.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-red-700">
                <AlertTriangle className="size-5" /> Red flags
              </h3>
              <ul className="mt-3 space-y-2">
                {result.red_flags.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {f}</li>
                ))}
              </ul>
            </section>
          )}

          {result.green_flags.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-green-700">
                <CheckCircle2 className="size-5" /> Reassuring signs
              </h3>
              <ul className="mt-3 space-y-2">
                {result.green_flags.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {f}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="font-display text-lg font-semibold">What to do next</h3>
            <ul className="mt-3 space-y-2">
              {result.advice.map((a, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {a}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
