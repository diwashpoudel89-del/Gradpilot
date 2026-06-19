import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import { Logo } from "@/components/brand";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  if (!supabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/login");

  const name =
    (user.user_metadata?.full_name as string | undefined) || user.email?.split("@")[0] || "there";

  const cards = [
    { href: "/jobs", title: "Browse jobs", body: "Find visa-sponsoring roles matched to you." },
    { href: "/employer-insights", title: "Employer insights", body: "See who sponsors before you apply." },
    { href: "/mentors", title: "Find a mentor", body: "Learn from those who made the journey." },
    { href: "/blog", title: "Guides", body: "Visas, CVs and life in the UK." },
  ];

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <form action="/auth/signout" method="post">
            <button type="submit" className="btn-outline h-9 px-4 text-sm">Sign out</button>
          </form>
        </div>
      </header>

      <main className="container-x py-10">
        <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back, {name} 👋</h1>
        <p className="mt-1 text-slate-600">Here&apos;s your GradPilot home base.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card p-5 transition hover:shadow-lift">
              <h2 className="font-semibold text-slate-900">{c.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{c.body}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 card p-6">
          <h2 className="font-semibold text-slate-900">Your applications</h2>
          <p className="mt-2 text-sm text-slate-600">
            You haven&apos;t tracked any applications yet. Browse the{" "}
            <Link href="/jobs" className="font-medium text-brand-600 hover:underline">jobs board</Link> to get started.
          </p>
        </div>
      </main>
    </div>
  );
}
