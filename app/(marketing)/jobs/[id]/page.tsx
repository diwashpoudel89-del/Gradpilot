import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJob } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { SaveJobButton } from "@/components/save-job-button";
import { AppliedButton } from "@/components/applied-button";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: "Job not found" };
  const sponsors = job.sponsors_graduate_route || job.sponsors_skilled_worker;
  return {
    title: `${job.title} at ${job.company}`,
    description: `${job.title} at ${job.company}${job.location ? ` in ${job.location}` : ""}.${sponsors ? " Visa sponsorship available." : ""} Apply via GradPilot AI.`,
    alternates: { canonical: `/jobs/${id}` },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  // Auth + saved state for the Save button (RLS scopes the lookup to this user).
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  let initialSaved = false;
  let initialApplied = false;
  if (auth.user) {
    const [{ data: saved }, { data: applied }] = await Promise.all([
      supabase
        .from("saved_jobs")
        .select("id")
        .eq("user_id", auth.user.id)
        .eq("job_id", job.id)
        .maybeSingle(),
      supabase
        .from("applications")
        .select("id")
        .eq("user_id", auth.user.id)
        .eq("job_id", job.id)
        .maybeSingle(),
    ]);
    initialSaved = !!saved;
    initialApplied = !!applied;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description ?? job.requirements ?? job.title,
    hiringOrganization: { "@type": "Organization", name: job.company },
    ...(job.location ? { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "GB" } } } : {}),
    ...(job.deadline ? { validThrough: job.deadline } : {}),
    ...(job.industry ? { industry: job.industry } : {}),
    ...(job.job_type ? { employmentType: job.job_type.toUpperCase().replace(/[\s-]/g, "_") } : {}),
    ...(job.salary_min ? { baseSalary: { "@type": "MonetaryAmount", currency: "GBP", value: { "@type": "QuantitativeValue", minValue: job.salary_min, maxValue: job.salary_max ?? job.salary_min, unitText: "YEAR" } } } : {}),
    directApply: !job.application_url,
  };

  return (
    <div className="container-x py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            <SaveJobButton
              jobId={job.id}
              jobTitle={job.title}
              company={job.company}
              initialSaved={initialSaved}
              isAuthed={!!auth.user}
            />
            <AppliedButton
              jobId={job.id}
              jobTitle={job.title}
              company={job.company}
              initialApplied={initialApplied}
              isAuthed={!!auth.user}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
