"use client";

import { useState } from "react";

type Result = {
  score: number;
  summary: string;
  suggestions: string[];
  rewritten_cv: string;
  cover_letter: string;
};

const field =
  "w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

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
        <textarea className={`${field} min-h-[220px] font-mono text-xs`} placeholder="Paste your CV text here…" value={cvText} onChange={(e) => setCvText(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary h-12 px-7 text-sm">
          {loading ? "Analysing with Claude Opus 4.8…" : "Analyse my CV"}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="card flex items-center gap-4 p-5">
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-gradient">{result.score}</p>
              <p className="text-xs text-slate-500">/ 100 UK-ready</p>
            </div>
            <p className="flex-1 text-sm text-slate-600">{result.summary}</p>
          </div>
          <section>
            <h3 className="font-display text-lg font-semibold">Suggestions</h3>
            <ul className="mt-3 space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-slate-600">• {s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="font-display text-lg font-semibold">Rewritten CV</h3>
            <pre className="card mt-3 whitespace-pre-wrap p-5 text-sm leading-relaxed">{result.rewritten_cv}</pre>
          </section>
          <section>
            <h3 className="font-display text-lg font-semibold">Tailored cover letter</h3>
            <pre className="card mt-3 whitespace-pre-wrap p-5 text-sm leading-relaxed">{result.cover_letter}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
