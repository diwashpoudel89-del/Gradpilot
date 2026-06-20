import Link from "next/link";
import {
  Briefcase,
  Bookmark,
  ClipboardList,
  FileText,
  MessageSquareText,
  Users,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/auth-server";
import { btnPrimary, cn, sizeMd } from "@/lib/ui";

export const dynamic = "force-dynamic";

const TOOLS = [
  { href: "/jobs", title: "Visa-sponsoring jobs", body: "Roles tagged by sponsorship.", icon: Briefcase },
  { href: "/app/saved", title: "Saved jobs", body: "Your shortlist.", icon: Bookmark },
  { href: "/app/applications", title: "Application tracker", body: "Applied → offer.", icon: ClipboardList },
  { href: "/app/cv", title: "AI CV Coach", body: "Score, rewrite, cover letter.", icon: FileText },
  { href: "/app/interview", title: "Interview prep", body: "Scored AI practice.", icon: MessageSquareText },
  { href: "/app/mentors", title: "Mentors", body: "Alumni who made it.", icon: Users },
  { href: "/adviser", title: "AI Career Adviser", body: "Ask anything, 24/7.", icon: Sparkles },
];

function daysUntil(date: string | null): number | null {
  if (!date) return null;
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, applications, savedJobs] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, visa_expiry_date, plan")
      .eq("id", user!.id)
      .maybeSingle(),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
    supabase.from("saved_jobs").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
  ]);

  const firstName = (profile?.full_name || user?.email || "there").split(" ")[0].split("@")[0];
  const visaDays = daysUntil(profile?.visa_expiry_date ?? null);
  const appCount = applications.count ?? 0;
  const savedCount = savedJobs.count ?? 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Welcome, {firstName} 👋</h1>
      <p className="mt-2 text-muted-foreground">
        Your GradPilot dashboard — track your Graduate Route, applications, and next steps.
      </p>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="size-4" /> Graduate Route
          </p>
          {visaDays != null ? (
            <>
              <p className="mt-2 font-display text-3xl font-bold text-gradient">{visaDays}</p>
              <p className="text-xs text-muted-foreground">days left on your visa</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              <Link href="/app/profile" className="text-primary underline">
                Add your visa expiry date
              </Link>{" "}
              to start your countdown.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="size-4" /> Applications
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{appCount}</p>
          <p className="text-xs text-muted-foreground">tracked so far</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bookmark className="size-4" /> Saved jobs
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{savedCount}</p>
          <p className="text-xs text-muted-foreground">shortlisted</p>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="mt-10 font-display text-xl font-semibold">Your toolkit</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary"
          >
            <t.icon className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold">Finish your profile</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your visa timeline, degree, and target roles to unlock your Graduate Route countdown and
          sharper AI guidance.
        </p>
        <Link href="/app/profile" className={cn(btnPrimary, sizeMd, "mt-4 self-start")}>
          Complete profile
        </Link>
      </div>
    </div>
  );
}
