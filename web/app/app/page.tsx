import Link from "next/link";
import { Briefcase, Bookmark, MessageSquare, CalendarClock } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/auth-server";
import { btnPrimary, btnOutline, cn, sizeMd } from "@/lib/ui";

export const dynamic = "force-dynamic";

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
              Add your visa expiry date to start your countdown (profile editor coming soon).
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
      <h2 className="mt-10 font-display text-xl font-semibold">Get started</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold">Find visa-sponsoring jobs</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            Browse roles tagged by Graduate Route and Skilled Worker sponsorship.
          </p>
          <Link href="/jobs" className={cn(btnPrimary, sizeMd, "mt-4 self-start")}>
            Browse jobs
          </Link>
        </div>
        <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold">Ask the AI career adviser</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            Get honest, UK-specific guidance on visas, CVs, and interviews — powered by Claude Opus 4.8.
          </p>
          <Link href="/adviser" className={cn(btnOutline, sizeMd, "mt-4 self-start")}>
            <MessageSquare className="size-4" /> Open adviser
          </Link>
        </div>
      </div>
    </div>
  );
}
