import Link from "next/link";
import {
  Briefcase,
  FileText,
  MessageSquareText,
  CalendarClock,
  ShieldCheck,
  Map as MapIcon,
  Check,
  ArrowRight,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/auth-server";
import { computeGradScore } from "@/lib/gradscore";
import { btnPrimary, cn, sizeMd } from "@/lib/ui";

export const dynamic = "force-dynamic";

function daysUntil(date: string | null): number | null {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

type JobRec = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  salary: string | null;
  application_url: string | null;
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uid = user!.id;

  const [profileRes, cvRes, appsCountRes, appsRecentRes, savedCountRes, interviewRes, jobsRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select(
          "full_name, university, degree_level, degree_subject, country_of_origin, visa_type, visa_expiry_date, target_industry, target_roles, experience_level, linkedin_url, plan"
        )
        .eq("id", uid)
        .maybeSingle(),
      supabase.from("cvs").select("score").eq("user_id", uid).order("score", { ascending: false }).limit(1),
      supabase.from("applications").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("applications").select("job_title, company, status").eq("user_id", uid).order("created_at", { ascending: false }).limit(3),
      supabase.from("saved_jobs").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("interview_prep_sessions").select("overall_score").eq("user_id", uid).limit(100),
      supabase
        .from("jobs")
        .select("id, title, company, location, salary, application_url")
        .eq("is_active", true)
        .eq("sponsors_graduate_route", true)
        .order("is_featured", { ascending: false })
        .limit(3),
    ]);

  const profile = profileRes.data;
  const bestCvScore = cvRes.data?.[0]?.score != null ? Number(cvRes.data[0].score) : null;
  const applicationsCount = appsCountRes.count ?? 0;
  const savedCount = savedCountRes.count ?? 0;
  const interviewScores = (interviewRes.data ?? [])
    .map((r) => (r.overall_score == null ? null : Number(r.overall_score)))
    .filter((n): n is number => n != null);
  const interviewCount = interviewRes.data?.length ?? 0;
  const interviewAvg =
    interviewScores.length > 0
      ? Math.round(interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length)
      : null;

  const score = computeGradScore({
    profile,
    bestCvScore,
    applicationsCount,
    savedCount,
    interviewCount,
    interviewAvg,
  });

  const firstName = (profile?.full_name || user?.email || "there").split(" ")[0].split("@")[0];
  const visaDays = daysUntil(profile?.visa_expiry_date ?? null);
  const jobs = (jobsRes.data as JobRec[]) ?? [];

  const milestones = [
    { label: "Complete your profile", done: score.completeness >= 80, href: "/app/profile" },
    { label: "Analyse your CV", done: bestCvScore != null, href: "/app/cv" },
    { label: "Track your first application", done: applicationsCount > 0, href: "/app/applications" },
    { label: "Practise an interview", done: interviewCount > 0, href: "/app/interview" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Welcome, {firstName} 👋</h1>
      <p className="mt-2 text-muted-foreground">Your career overview at a glance.</p>

      {/* GradScore + countdown */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your GradScore™</p>
              <p className="font-display text-5xl font-extrabold text-gradient">{score.overall}</p>
            </div>
            <Link href="/app/profile" className={cn(btnPrimary, sizeMd)}>
              Improve score
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ScoreBar label="Employability" value={score.employability} />
            <ScoreBar label="Sponsorship readiness" value={score.sponsorship} />
            <ScoreBar label="Career readiness" value={score.career} />
          </div>
          {score.tips.length > 0 && (
            <ul className="mt-5 space-y-1.5">
              {score.tips.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="size-4" /> Graduate Route
          </p>
          {visaDays != null ? (
            <>
              <p className="mt-2 font-display text-4xl font-extrabold text-gradient">{visaDays}</p>
              <p className="text-xs text-muted-foreground">days left on your visa</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              <Link href="/app/profile" className="text-primary underline">Add your visa expiry date</Link> to start the countdown.
            </p>
          )}
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <p className="flex justify-between"><span className="text-muted-foreground">CV (best)</span><span className="font-semibold">{bestCvScore ?? "—"}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Interview avg</span><span className="font-semibold">{interviewAvg ?? "—"}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Applications</span><span className="font-semibold">{applicationsCount}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Saved jobs</span><span className="font-semibold">{savedCount}</span></p>
          </div>
        </div>
      </div>

      {/* Job recommendations */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Recommended sponsoring jobs</h2>
        <Link href="/jobs" className="text-sm font-medium text-primary">View all →</Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {jobs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recommendations yet — browse the jobs board.</p>
        ) : (
          jobs.map((j) => (
            <div key={j.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="font-medium">{j.title}</p>
              <p className="text-sm text-muted-foreground">{j.company}</p>
              <p className="mt-1 text-xs text-muted-foreground">{[j.location, j.salary].filter(Boolean).join(" · ")}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-primary">
                <ShieldCheck className="size-3.5" /> Graduate Route
              </span>
            </div>
          ))
        )}
      </div>

      {/* Progress tracker */}
      <h2 className="mt-10 font-display text-xl font-semibold">Your progress</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <Link key={m.label} href={m.href} className={cn("flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft", m.done ? "border-primary/40" : "border-border")}>
            <span className={cn("inline-flex size-7 items-center justify-center rounded-full", m.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
              <Check className="size-4" />
            </span>
            <span className={cn("text-sm font-medium", m.done && "text-muted-foreground line-through")}>{m.label}</span>
          </Link>
        ))}
      </div>

      {/* Toolkit */}
      <h2 className="mt-10 font-display text-xl font-semibold">Your toolkit</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/app/cv", title: "AI CV Coach", body: "Score, rewrite, cover letter.", icon: FileText },
          { href: "/app/interview", title: "Interview prep", body: "Scored AI practice.", icon: MessageSquareText },
          { href: "/jobs", title: "Sponsorship jobs", body: "Roles that sponsor.", icon: Briefcase },
          { href: "/app/gradshield", title: "GradShield™", body: "Scan an accommodation listing.", icon: ShieldCheck },
          { href: "/app/gradpath", title: "GradPath™", body: "Your personalised roadmap.", icon: MapIcon },
          { href: "/app/applications", title: "Applications", body: "Track applied → offer.", icon: Briefcase },
        ].map((t) => (
          <Link key={t.href} href={t.href} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary">
            <t.icon className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
