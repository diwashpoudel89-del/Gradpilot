import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/auth-server";
import { AppShell } from "@/components/app-shell";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/app");

  return <AppShell email={user.email}>{children}</AppShell>;
}
