import Link from "next/link";
import type { Metadata } from "next";
import { getJobs, getProfile, getSavedJobIds } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { scoreJob, canMatch, matchTier } from "@/lib/matching";
import { SaveJobButton } from "@/components/save-job-button";
import type { Job } from "@/lib/types";

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

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const [profile, savedIds] = auth.user
    ? await Promise.all([getProfile(auth.user.id), getSavedJobIds(auth.user.id)])
    : [null, [] as string[]];

  const personalised = canMatch(profile);
  const savedSet = new Set(savedIds);

  let list: (Job & { _score?: number })[] = jobs;
  if (personalised) {
    list = jobs
      .map((j) => ({ ...j, _score: scoreJob(j, profile).score }))
      .sort((a, b) => (b._score ?? 0) - (a._score ?? 0));
  }

  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Visa-sponsoring jobs</h1>
        <p className="mt-2 text-slate-600">
          {jobs.length > 0
            ? `${jobs.length} live roles, each flagged for Graduate Route and Skilled Worker sponsorship.`
            : "No jobs are live right now — check back soon."}
        </p>
        {personalised ? (
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            ✨ Sorted by match to your profile
          </p>
        ) : auth.user ? (
          <p className="mt-2 text-sm text-slate-500">
            <Link href="/dashboard/profile" className="font-medium text-brand-600 hover:underline">Complete your profile</Link> to see your best-matched roles first.
          </p>
        ) : null}
      </header>

      <div className="mt-8 grid gap-4">
        {list.map((job) => {
          const tier = personalised && job._score !== undefined ? matchTier(job._score) : null;
          return (
            <div key={job.id} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/jobs/${job.id}`} className="truncate text-lg font-semibold text-slate-900 hover:text-brand-600">
                    {job.title}
                  </Link>
                  {job.is_featured && <span className="badge bg-amber-100 text-amber-700">Featured</span>}
                  {tier && <span className={`badge ${tier.className}`}>{job._score}% · {tier.label}</span>}
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
              <div className="flex shrink-0 items-center gap-3">
                <SaveJobButton
                  jobId={job.id}
                  jobTitle={job.title}
                  company={job.company}
                  initialSaved={savedSet.has(job.id)}
                  isAuthed={!!auth.user}
                  className="btn-outline h-9 px-3 text-sm"
                />
                <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-brand-600 hover:underline">View →</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
