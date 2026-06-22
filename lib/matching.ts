import type { Job, Profile } from "@/lib/types";

export type JobMatch = { score: number; reasons: string[] };

// Deterministic fit score (0–100) between a job and a user's profile.
// No external AI needed — transparent, fast, and explainable.
export function scoreJob(job: Job, profile: Profile | null): JobMatch {
  if (!profile) return { score: 0, reasons: [] };

  let score = 0;
  const reasons: string[] = [];

  const sponsorsAny = !!(job.sponsors_graduate_route || job.sponsors_skilled_worker);
  if (sponsorsAny) {
    score += 40;
  } else {
    score += 5;
  }

  // Visa-route specific fit
  if (profile.visa_type === "graduate_route" && job.sponsors_graduate_route) {
    score += 25;
    reasons.push("Sponsors Graduate Route");
  } else if (profile.visa_type === "skilled_worker" && job.sponsors_skilled_worker) {
    score += 25;
    reasons.push("Sponsors Skilled Worker");
  } else if (sponsorsAny) {
    reasons.push("Offers visa sponsorship");
  }

  // Industry match
  if (profile.target_industry && job.industry) {
    const a = profile.target_industry.toLowerCase();
    const b = job.industry.toLowerCase();
    if (a.includes(b) || b.includes(a)) {
      score += 20;
      reasons.push(`Matches your target industry (${job.industry})`);
    }
  }

  // Target-role match against the job title
  const roles = (profile.target_roles ?? []).map((r) => r.toLowerCase().trim()).filter(Boolean);
  if (roles.length && job.title) {
    const title = job.title.toLowerCase();
    const hit = roles.find((r) => title.includes(r) || r.split(" ").some((w) => w.length > 3 && title.includes(w)));
    if (hit) {
      score += 15;
      reasons.push("Matches a role you're targeting");
    }
  }

  return { score: Math.min(100, score), reasons };
}

// Whether the profile has enough data for matching to be meaningful.
export function canMatch(profile: Profile | null): boolean {
  if (!profile) return false;
  return Boolean(profile.visa_type || profile.target_industry || (profile.target_roles?.length ?? 0) > 0);
}

export function matchTier(score: number): { label: string; className: string } {
  if (score >= 80) return { label: "Strong match", className: "bg-emerald-100 text-emerald-700" };
  if (score >= 55) return { label: "Good match", className: "bg-brand-50 text-brand-700" };
  if (score >= 30) return { label: "Possible match", className: "bg-amber-100 text-amber-700" };
  return { label: "Low match", className: "bg-slate-100 text-slate-500" };
}
