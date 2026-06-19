import Link from "next/link";
import { Logo } from "@/components/brand";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";

const NAV = [
  { href: "/jobs", label: "Jobs" },
  { href: "/employer-insights", label: "Employers" },
  { href: "/mentors", label: "Mentors" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

export async function SiteHeader() {
  let signedIn = false;
  if (supabaseConfigured) {
    try {
      const db = await createClient();
      const { data } = await db.auth.getUser();
      signedIn = Boolean(data.user);
    } catch {
      signedIn = false;
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary h-10 px-5 text-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 sm:inline">
                Sign in
              </Link>
              <Link href="/signup" className="btn-primary h-10 px-5 text-sm">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
