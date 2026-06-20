import { createSupabaseServerClient } from "@/lib/auth-server";
import { SavedJobsList, type SavedJob } from "@/components/saved-jobs-list";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("saved_jobs")
    .select("id, job_title, company")
    .eq("user_id", user!.id)
    .order("saved_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Saved jobs</h1>
      <p className="mt-2 text-muted-foreground">Your shortlist of roles to come back to.</p>
      <div className="mt-8">
        <SavedJobsList initial={(data as SavedJob[]) ?? []} />
      </div>
    </div>
  );
}
