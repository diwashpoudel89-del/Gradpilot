import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { computeGradScore } from "@/lib/gradscore";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

function daysUntil(date: string | null): number | null {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const TOOLS = [
  { href: "/dashboard/cv", title: "AI CV Coach", body: "ATS score, rewrite & cover letter." },
  { href: "/dashboard/interview", title: "Interview prep", body: "Scored AI practice." },
  { href: "/dashboard/gradshield", title: "GradShield™", body: "Scan a listing for scam risk." },
  { href: "/dashboard/gradpath", title: "GradPath™", body: "Your personalised roadmap." },
  { href: "/dashboard/adviser", title: "AI Adviser", body: "Ask anything, 24/7." },
  { href: "/jobs", title: "Sponsorship jobs", body: "Roles that sponsor visas." },
];

export default async function DashboardHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uid = user!.id;

  const [profileRes, cvRes, appsCount, savedCount, interviewRes, jobsRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, university, degree_level, degree_subject, country_of_origin, visa_type, visa_expiry_date, target_industry, target_roles, experience_level, linkedin_url")
      .eq("id", uid).maybeSingle(),
    supabase.from("cvs").select("score").eq("user_id", uid).order("score", { ascending: false }).limit(1),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase.from("saved_jobs").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase.from("interview_prep_sessions").select("overall_score").eq("user_id", uid).limit(100),
    supabase.from("jobs").select("id, title, company, location, salary").eq("is_active", true).eq("sponsors_graduate_route", true).order("is_featured", { ascending: false }).limit(3),
  ]);

  const profile = profileRes.data;
  const bestCvScore = cvRes.data?.[0]?.score != null ? Number(cvRes.data[0].score) : null;
  const interviewScores = (interviewRes.data ?? [])
    .map((r) => (r.overall_score == null ? null : Number(r.overall_score)))
    .filter((n): n is number => n != null);
  const interviewAvg = interviewScores.length
    ? Math.round(interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length)
    : null;

  const score = computeGradScore({
    profile,
    bestCvScore,
    applicationsCount: appsCount.count ?? 0,
    savedCount: savedCount.count ?? 0,
    interviewCount: interviewRes.data?.length ?? 0,
    interviewAvg,
  });

  const name = (profile?.full_name || user?.email?.split("@")[0] || "there").split(" ")[0];
  const visaDays = daysUntil(profile?.visa_expiry_date ?? null);
  const jobs = (jobsRes.data as { id: string; title: string; company: string; location: string | null; salary: string | null }[]) ?? [];

  return (
    <>
      <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back, {name} 👋</h1>
      <p className="mt-1 text-slate-600">Your career overview at a glance.</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Your GradScore™</p>
              <p className="font-display text-5xl font-extrabold text-gradient">{score.overall}</p>
            </div>
            <Link href="/dashboard/profile" className="btn-primary h-9 px-4 text-sm">Improve score</Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Bar label="Employability" value={score.employability} />
            <Bar label="Sponsorship readiness" value={score.sponsorship} />
            <Bar label="Career readiness" value={score.career} />
          </div>
          {score.tips.length > 0 && (
            <ul className="mt-5 space-y-1.5">
              {score.tips.map((t) => (
                <li key={t} className="text-sm text-slate-600">→ {t}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <p className="text-sm text-slate-500">Graduate Route</p>
          {visaDays != null ? (
            <>
              <p className="mt-2 font-display text-4xl font-extrabold text-gradient">{visaDays}</p>
              <p className="text-xs text-slate-500">days left on your visa</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              <Link href="/dashboard/profile" className="font-medium text-brand-600 hover:underline">Add your visa expiry date</Link> to start the countdown.
            </p>
          )}
          <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <p className="flex justify-between"><span className="text-slate-500">CV (best)</span><span className="font-semibold">{bestCvScore ?? "—"}</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Interview avg</span><span className="font-semibold">{interviewAvg ?? "—"}</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Applications</span><span className="font-semibold">{appsCount.count ?? 0}</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Saved jobs</span><span className="font-semibold">{savedCount.count ?? 0}</span></p>
          </div>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Your toolkit</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="card p-5 transition hover:shadow-lift">
            <h3 className="font-semibold text-slate-900">{t.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{t.body}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Recommended sponsoring jobs</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-600">No recommendations yet — browse the jobs board.</p>
        ) : (
          jobs.map((j) => (
            <div key={j.id} className="card p-5">
              <p className="font-medium text-slate-900">{j.title}</p>
              <p className="text-sm text-slate-600">{j.company}</p>
              <p className="mt-1 text-xs text-slate-500">{[j.location, j.salary].filter(Boolean).join(" · ")}</p>
              <span className="badge mt-3 bg-brand-50 text-brand-700">Graduate Route</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}
