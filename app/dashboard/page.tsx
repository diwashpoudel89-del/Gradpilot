import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSavedJobs, getApplications, getProfile } from "@/lib/queries";
import { STATUS_LABELS, type ApplicationStatus } from "@/lib/types";
import { SavedJobActions } from "@/components/saved-job-actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

const VISA_DAYS_WARN = 120;

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/login");

  const [profile, savedJobs, applications] = await Promise.all([
    getProfile(user.id),
    getSavedJobs(user.id),
    getApplications(user.id),
  ]);

  const name =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "there";

  const counts = applications.reduce<Record<string, number>>((acc, a) => {
    const s = a.status ?? "saved";
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  const stats: { key: ApplicationStatus | "total"; label: string; value: number }[] = [
    { key: "total", label: "Applications", value: applications.length },
    { key: "applied", label: STATUS_LABELS.applied, value: counts.applied ?? 0 },
    { key: "interview_scheduled", label: STATUS_LABELS.interview_scheduled, value: counts.interview_scheduled ?? 0 },
    { key: "offer_received", label: STATUS_LABELS.offer_received, value: counts.offer_received ?? 0 },
  ];

  // Profile completeness
  const fields = [
    profile?.full_name,
    profile?.university,
    profile?.degree_level,
    profile?.country_of_origin,
    profile?.visa_type,
    profile?.target_industry,
    profile?.target_roles?.length ? "x" : null,
  ];
  const filled = fields.filter(Boolean).length;
  const completeness = Math.round((filled / fields.length) * 100);

  // Visa countdown
  let visaDaysLeft: number | null = null;
  if (profile?.visa_expiry_date) {
    const diff = new Date(profile.visa_expiry_date).getTime() - Date.now();
    visaDaysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back, {name} 👋</h1>
          <p className="mt-1 text-slate-600">Here&apos;s your job-hunt at a glance.</p>
        </div>
        <Link href="/jobs" className="btn-primary h-10 px-5 text-sm">Browse jobs</Link>
      </div>

      {/* Alerts */}
      {completeness < 100 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-sm text-brand-900">
            Your profile is <strong>{completeness}%</strong> complete. A fuller profile means better job matches.
          </p>
          <Link href="/dashboard/profile" className="btn-primary h-9 px-4 text-sm">Complete profile</Link>
        </div>
      )}
      {visaDaysLeft !== null && visaDaysLeft >= 0 && visaDaysLeft <= VISA_DAYS_WARN && (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⏳ Your visa expires in <strong>{visaDaysLeft} days</strong>. Prioritise sponsor-confirmed applications.
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.key} className="card p-5">
            <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
            <div className="mt-1 text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Saved jobs */}
      <section className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Saved jobs</h2>
          <Link href="/jobs" className="text-sm font-medium text-brand-600 hover:underline">Find more →</Link>
        </div>
        {savedJobs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            No saved jobs yet. On any job, tap <span className="font-medium">Save &amp; track</span> to keep it here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {savedJobs.map((j) => (
              <li key={j.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  {j.job_id ? (
                    <Link href={`/jobs/${j.job_id}`} className="font-medium text-slate-900 hover:text-brand-600">
                      {j.job_title}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-900">{j.job_title}</span>
                  )}
                  <span className="text-sm text-slate-500"> · {j.company}</span>
                </div>
                <SavedJobActions id={j.id} jobTitle={j.job_title ?? ""} company={j.company ?? ""} jobId={j.job_id} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent applications */}
      <section className="mt-6 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent applications</h2>
          <Link href="/dashboard/applications" className="text-sm font-medium text-brand-600 hover:underline">
            Manage all →
          </Link>
        </div>
        {applications.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            You haven&apos;t tracked any applications yet. Add one from the{" "}
            <Link href="/dashboard/applications" className="font-medium text-brand-600 hover:underline">applications</Link> page.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {applications.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-medium text-slate-900">{a.job_title}</div>
                  <div className="text-sm text-slate-500">{a.company}</div>
                </div>
                <span className="badge bg-slate-100 text-slate-600">{STATUS_LABELS[(a.status ?? "saved") as ApplicationStatus]}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
