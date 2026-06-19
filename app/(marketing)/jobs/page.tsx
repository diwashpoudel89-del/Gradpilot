import Link from "next/link";
import type { Metadata } from "next";
import { getJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Visa-sponsoring jobs",
  description: "Graduate and skilled-worker jobs in the UK that sponsor international students.",
};

function SponsorBadge({ grad, skilled }: { grad: boolean | null; skilled: boolean | null }) {
  if (grad || skilled) {
    return <span className="badge bg-emerald-100 text-emerald-700">Sponsors visa</span>;
  }
  return <span className="badge bg-slate-100 text-slate-600">No sponsorship</span>;
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Visa-sponsoring jobs</h1>
        <p className="mt-2 text-slate-600">
          {jobs.length > 0
            ? `${jobs.length} live roles, each flagged for Graduate Route and Skilled Worker sponsorship.`
            : "No jobs are live right now — check back soon."}
        </p>
      </header>

      <div className="mt-8 grid gap-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="card flex flex-col gap-3 p-5 transition hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-slate-900">{job.title}</h2>
                {job.is_featured && <span className="badge bg-amber-100 text-amber-700">Featured</span>}
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {job.company}
                {job.location ? ` · ${job.location}` : ""}
                {job.industry ? ` · ${job.industry}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <SponsorBadge grad={job.sponsors_graduate_route} skilled={job.sponsors_skilled_worker} />
                {job.salary && <span className="badge bg-brand-50 text-brand-700">{job.salary}</span>}
                {job.job_type && <span className="badge bg-slate-100 text-slate-600">{job.job_type.replace(/_/g, " ")}</span>}
              </div>
            </div>
            <div className="shrink-0 text-sm font-medium text-brand-600">View role →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
