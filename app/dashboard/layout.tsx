import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import { Logo } from "@/components/brand";
import { DashboardNav } from "@/components/dashboard-nav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/dashboard"><Logo /></Link>
          <div className="flex items-center gap-4">
            <DashboardNav />
            <form action="/auth/signout" method="post">
              <button type="submit" className="btn-outline h-9 px-4 text-sm">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
