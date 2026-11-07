import Link from "next/link";
import type { Metadata } from "next";
import { getJobsPage } from "@/lib/queries";
import { AdzunaAttribution, SponsorBadge, isAdzuna, postedAgo } from "@/components/job-source";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "UK graduate jobs for international students",
  description:
    "Browse UK graduate and entry-level vacancies. We show visa sponsorship only where it has been verified — always check with the employer.",
  keywords: ["graduate jobs UK", "international student jobs UK", "Graduate Route jobs", "entry level jobs UK", "graduate scheme UK"],
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "UK graduate jobs for international students",
    description: "Graduate and entry-level vacancies across the UK, with honest sponsorship information.",
  },
};

type SearchParams = Promise<{ q?: string; location?: string; page?: string }>;

function pageHref(params: { q?: string; location?: string }, page: number) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.location) sp.set("location", params.location);
  if (page > 1) sp.set("page", String(page));
  const s = sp.toString();
  return s ? `/jobs?${s}` : "/jobs";
}

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").slice(0, 80);
  const location = (sp.location ?? "").slice(0, 60);
  const { jobs, total, page, pageCount } = await getJobsPage({ q, location, page: Number(sp.page) || 1 });
  const filtered = Boolean(q || location);
  const showsAdzuna = jobs.some(isAdzuna);

  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">UK graduate jobs</h1>
        <p className="mt-2 text-slate-600">
          {total > 0
            ? `${total.toLocaleString("en-GB")} ${filtered ? "matching" : "live"} ${total === 1 ? "role" : "roles"}. Visa sponsorship is only shown where it has been verified — always confirm with the employer.`
            : filtered
              ? "No roles match your search. Try a different keyword or location."
              : "No jobs are live right now — check back soon."}
        </p>
      </header>

      <form action="/jobs" method="get" className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="q">Keyword</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Role, company or field"
          className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <label className="sr-only" htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          defaultValue={location}
          placeholder="Location, e.g. London"
          className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <button type="submit" className="btn-primary h-11 px-6 text-sm">Search</button>
      </form>
      {filtered && (
        <Link href="/jobs" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          Clear search
        </Link>
      )}

      <div className="mt-8 grid gap-4">
        {jobs.map((job) => {
          const posted = postedAgo(job.posted_at);
          return (
            <div key={job.id} className="card relative flex flex-col gap-3 p-5 transition hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-lg font-semibold text-slate-900">
                    {/* Stretched link: the whole card opens the role. */}
                    <Link href={`/jobs/${job.id}`} className="after:absolute after:inset-0 after:rounded-[inherit] focus:outline-none">
                      {job.title}
                    </Link>
                  </h2>
                  {job.is_featured && <span className="badge bg-amber-100 text-amber-700">Featured</span>}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                  {job.industry ? ` · ${job.industry}` : ""}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <SponsorBadge job={job} />
                  {job.salary && <span className="badge bg-brand-50 text-brand-700">{job.salary}</span>}
                  {job.job_type && <span className="badge bg-slate-100 text-slate-600">{job.job_type.replace(/_/g, " ")}</span>}
                  {posted && <span className="text-xs text-slate-500">{posted}</span>}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {isAdzuna(job) && <AdzunaAttribution className="relative z-10" />}
                <span className="text-sm font-medium text-brand-600">View role →</span>
              </div>
            </div>
          );
        })}
      </div>

      {showsAdzuna && (
        <p className="mt-6 text-xs text-slate-500">
          Vacancies marked &ldquo;Jobs by Adzuna&rdquo; are provided by Adzuna. GradPilot AI does not employ for these roles —
          you apply on the employer&apos;s or recruiter&apos;s site.
        </p>
      )}

      {pageCount > 1 && (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4 text-sm">
          {page > 1 ? (
            <Link href={pageHref({ q, location }, page - 1)} className="btn-outline h-10 px-4">← Previous</Link>
          ) : <span />}
          <span className="text-slate-600">Page {page} of {pageCount}</span>
          {page < pageCount ? (
            <Link href={pageHref({ q, location }, page + 1)} className="btn-outline h-10 px-4">Next →</Link>
          ) : <span />}
        </nav>
      )}
    </div>
  );
}
