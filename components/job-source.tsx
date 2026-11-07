import type { Job } from "@/lib/types";

/**
 * Visa sponsorship is only shown as confirmed for jobs GradPilot added and
 * checked itself (source "manual"). Provider and sample jobs are "not verified".
 */
export function SponsorBadge({ job }: { job: Job }) {
  const verifiable = (job.source ?? "manual") === "manual";
  if (verifiable && (job.sponsors_graduate_route || job.sponsors_skilled_worker)) {
    return <span className="badge bg-emerald-100 text-emerald-700">Sponsors visa</span>;
  }
  if (verifiable && job.sponsors_graduate_route === false && job.sponsors_skilled_worker === false) {
    return <span className="badge bg-slate-100 text-slate-600">No sponsorship</span>;
  }
  return <span className="badge bg-slate-100 text-slate-600">Sponsorship not verified</span>;
}

/**
 * Required attribution for every Adzuna listing: an "Adzuna" label of at least
 * 116 x 23 px linking to adzuna.co.uk. Replace the text with the official logo
 * from Adzuna's press page once downloaded.
 */
export function AdzunaAttribution({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.adzuna.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[23px] min-w-[116px] items-center justify-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600 hover:border-slate-300 ${className}`}
    >
      Jobs by <span className="font-semibold text-slate-900">Adzuna</span>
    </a>
  );
}

export const isAdzuna = (job: Job) => job.source === "adzuna";

export function postedAgo(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const days = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (Number.isNaN(days) || days < 0) return null;
  if (days === 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  return `Posted ${days} days ago`;
}
