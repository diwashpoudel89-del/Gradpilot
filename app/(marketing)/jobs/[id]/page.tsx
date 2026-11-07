import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/queries";
import { AdzunaAttribution, SponsorBadge, isAdzuna, postedAgo } from "@/components/job-source";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const fromAdzuna = isAdzuna(job);
  const verified = (job.source ?? "manual") === "manual";
  const closed = job.is_active === false;
  const posted = postedAgo(job.posted_at);

  return (
    <div className="container-x py-12">
      <Link href="/jobs" className="text-sm font-medium text-brand-600 hover:underline">← All jobs</Link>

      {closed && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          This advert is no longer listed and may have closed.
        </div>
      )}

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">{job.title}</h1>
          <p className="mt-2 text-slate-600">
            {job.company}{job.location ? ` · ${job.location}` : ""}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SponsorBadge job={job} />
            {job.salary && <span className="badge bg-brand-50 text-brand-700">{job.salary}</span>}
            {job.job_type && <span className="badge bg-slate-100 text-slate-600">{job.job_type.replace(/_/g, " ")}</span>}
            {job.contract_type && <span className="badge bg-slate-100 text-slate-600">{job.contract_type.replace(/_/g, " ")}</span>}
            {posted && <span className="text-xs text-slate-500">{posted}</span>}
          </div>

          {job.description && (
            <section className="mt-8">
              <h2 className="font-semibold text-slate-900">About the role</h2>
              <p className="mt-2 whitespace-pre-line text-slate-700">{job.description}</p>
              {fromAdzuna && job.application_url && (
                <p className="mt-3 text-sm text-slate-600">
                  This is a summary.{" "}
                  <a href={job.application_url} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-brand-600 hover:underline">
                    Read the full advert on Adzuna
                  </a>
                  .
                </p>
              )}
            </section>
          )}
          {job.requirements && (
            <section className="mt-6">
              <h2 className="font-semibold text-slate-900">Requirements</h2>
              <p className="mt-2 whitespace-pre-line text-slate-700">{job.requirements}</p>
            </section>
          )}

          {verified && job.visa_info ? (
            <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="font-semibold text-emerald-900">Visa &amp; sponsorship</h2>
              <p className="mt-2 text-sm text-emerald-800">{job.visa_info}</p>
            </section>
          ) : !verified ? (
            <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-900">Visa sponsorship not verified</h2>
              <p className="mt-2 text-sm text-slate-700">
                We haven&apos;t confirmed whether this role offers visa sponsorship. Check the advert, ask the
                employer, and look the company up on the{" "}
                <a href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers" target="_blank" rel="noopener noreferrer">
                  Home Office register of licensed sponsors
                </a>{" "}
                before you apply. A sponsor licence doesn&apos;t guarantee that a specific role is sponsored.
              </p>
            </section>
          ) : null}
        </div>

        <aside className="lg:col-span-1">
          <div className="card sticky top-20 space-y-4 p-6">
            {job.deadline && (
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Deadline</div>
                <div className="text-sm font-medium text-slate-900">{job.deadline}</div>
              </div>
            )}
            {job.industry && (
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Industry</div>
                <div className="text-sm font-medium text-slate-900">{job.industry}</div>
              </div>
            )}
            {job.application_url && !closed ? (
              <a href={job.application_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary h-11 w-full px-5 text-sm">
                {fromAdzuna ? "Apply via Adzuna" : "Apply on company site"}
              </a>
            ) : !closed ? (
              <Link href="/signup" className="btn-primary h-11 w-full px-5 text-sm">Sign up to apply</Link>
            ) : null}
            <Link href="/signup" className="btn-outline h-11 w-full px-5 text-sm">Save &amp; track this job</Link>
            {fromAdzuna && (
              <div className="flex flex-col items-start gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <AdzunaAttribution />
                <p>Listing provided by Adzuna. GradPilot AI is not the employer.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
