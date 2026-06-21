"use client";

import { useState } from "react";

type Result = {
  risk_score: number;
  risk_level: "Low" | "Medium" | "High";
  summary: string;
  red_flags: string[];
  green_flags: string[];
  advice: string[];
};

const LEVEL: Record<string, string> = {
  Low: "bg-emerald-100 text-emerald-700",
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
    setError(""); setResult(null); setLoading(true);
    try {
      const res = await fetch("/api/gradshield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
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
      <form onSubmit={analyse} className="space-y-3">
        <textarea
          className="min-h-[200px] w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          placeholder="Paste the accommodation listing, landlord/agent messages, or tenancy terms here…"
          value={listing} onChange={(e) => setListing(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary h-12 px-7 text-sm">
          {loading ? "Scanning with Claude Opus 4.8…" : "Scan for scam risk"}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="card flex items-center gap-4 p-5">
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-gradient">{result.risk_score}</p>
              <p className="text-xs text-slate-500">/ 100 risk</p>
            </div>
            <div className="flex-1">
              <span className={`badge ${LEVEL[result.risk_level]}`}>{result.risk_level} risk</span>
              <p className="mt-2 text-sm text-slate-600">{result.summary}</p>
            </div>
          </div>
          {result.red_flags.length > 0 && (
            <section>
              <h3 className="font-display text-lg font-semibold text-red-700">Red flags</h3>
              <ul className="mt-3 space-y-2">{result.red_flags.map((f, i) => <li key={i} className="text-sm text-slate-600">• {f}</li>)}</ul>
            </section>
          )}
          {result.green_flags.length > 0 && (
            <section>
              <h3 className="font-display text-lg font-semibold text-emerald-700">Reassuring signs</h3>
              <ul className="mt-3 space-y-2">{result.green_flags.map((f, i) => <li key={i} className="text-sm text-slate-600">• {f}</li>)}</ul>
            </section>
          )}
          <section>
            <h3 className="font-display text-lg font-semibold">What to do next</h3>
            <ul className="mt-3 space-y-2">{result.advice.map((a, i) => <li key={i} className="text-sm text-slate-600">• {a}</li>)}</ul>
          </section>
        </div>
      )}
    </div>
  );
}
