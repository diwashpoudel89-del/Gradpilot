import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import { Logo } from "@/components/brand";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/cv", label: "CV Coach" },
  { href: "/dashboard/interview", label: "Interview" },
  { href: "/dashboard/gradshield", label: "GradShield" },
  { href: "/dashboard/gradpath", label: "GradPath" },
  { href: "/dashboard/adviser", label: "Adviser" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/jobs", label: "Jobs" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate text-sm text-slate-500 sm:inline">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button type="submit" className="btn-outline h-9 px-4 text-sm">Sign out</button>
            </form>
          </div>
        </div>
        <nav className="container-x flex gap-1 overflow-x-auto pb-2">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
