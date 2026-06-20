"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

type Result = {
  score: number;
  summary: string;
  suggestions: string[];
  rewritten_cv: string;
  cover_letter: string;
};

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30";

export function CvCoach() {
  const [cvText, setCvText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function analyse(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, targetRole, targetCompany }),
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
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={field} placeholder="Target role (e.g. Graduate Data Analyst)" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
          <input className={field} placeholder="Target company (optional)" value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} />
        </div>
        <textarea
          className={cn(field, "min-h-[220px] font-mono text-xs")}
          placeholder="Paste your CV text here…"
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className={cn(btnPrimary, sizeLg)}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Analysing with Claude Opus 4.8…" : "Analyse my CV"}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-gradient">{result.score}</p>
              <p className="text-xs text-muted-foreground">/ 100 UK-ready</p>
            </div>
            <p className="flex-1 text-sm text-muted-foreground">{result.summary}</p>
          </div>

          <section>
            <h3 className="font-display text-lg font-semibold">Suggestions</h3>
            <ul className="mt-3 space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-display text-lg font-semibold">Rewritten CV</h3>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed">
              {result.rewritten_cv}
            </pre>
          </section>

          <section>
            <h3 className="font-display text-lg font-semibold">Tailored cover letter</h3>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed">
              {result.cover_letter}
            </pre>
          </section>
        </div>
      )}
    </div>
  );
}
