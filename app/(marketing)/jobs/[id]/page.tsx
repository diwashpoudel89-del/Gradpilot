import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  return (
    <div className="container-x py-12">
      <Link href="/jobs" className="text-sm font-medium text-brand-600 hover:underline">← All jobs</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">{job.title}</h1>
          <p className="mt-2 text-slate-600">
            {job.company}{job.location ? ` · ${job.location}` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(job.sponsors_graduate_route || job.sponsors_skilled_worker) && (
              <span className="badge bg-emerald-100 text-emerald-700">Sponsors visa</span>
            )}
            {job.salary && <span className="badge bg-brand-50 text-brand-700">{job.salary}</span>}
            {job.job_type && <span className="badge bg-slate-100 text-slate-600">{job.job_type.replace(/_/g, " ")}</span>}
          </div>

          {job.description && (
            <section className="mt-8">
              <h2 className="font-semibold text-slate-900">About the role</h2>
              <p className="mt-2 whitespace-pre-line text-slate-700">{job.description}</p>
            </section>
          )}
          {job.requirements && (
            <section className="mt-6">
              <h2 className="font-semibold text-slate-900">Requirements</h2>
              <p className="mt-2 whitespace-pre-line text-slate-700">{job.requirements}</p>
            </section>
          )}
          {job.visa_info && (
            <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="font-semibold text-emerald-900">Visa &amp; sponsorship</h2>
              <p className="mt-2 text-sm text-emerald-800">{job.visa_info}</p>
            </section>
          )}
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
            {job.application_url ? (
              <a href={job.application_url} target="_blank" rel="noopener noreferrer" className="btn-primary h-11 w-full px-5 text-sm">
                Apply on company site
              </a>
            ) : (
              <Link href="/signup" className="btn-primary h-11 w-full px-5 text-sm">Sign up to apply</Link>
            )}
            <Link href="/signup" className="btn-outline h-11 w-full px-5 text-sm">Save &amp; track this job</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
