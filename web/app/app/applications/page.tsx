import { createSupabaseServerClient } from "@/lib/auth-server";
import { ApplicationManager, type Application } from "@/components/application-manager";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("applications")
    .select("id, job_title, company, status, applied_at, notes")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Application tracker</h1>
      <p className="mt-2 text-muted-foreground">
        Keep every application in one place — track stages from applied to offer.
      </p>
      <div className="mt-8">
        <ApplicationManager userId={user!.id} initial={(data as Application[]) ?? []} />
      </div>
    </div>
  );
}
