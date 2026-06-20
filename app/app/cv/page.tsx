import { createSupabaseServerClient } from "@/lib/auth-server";
import { CvCoach } from "@/components/cv-coach";

export const dynamic = "force-dynamic";

type CvRow = {
  id: string;
  target_role: string | null;
  target_company: string | null;
  score: number | null;
  created_at: string;
};

export default async function CvPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("cvs")
    .select("id, target_role, target_company, score, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const history = (data as CvRow[]) ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">AI CV Coach</h1>
      <p className="mt-2 text-muted-foreground">
        Paste your CV and get a UK-readiness score, specific fixes, a rewritten version, and a
        tailored cover letter — powered by Claude Opus 4.8.
      </p>

      <div className="mt-8">
        <CvCoach />
      </div>

      {history.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Recent analyses</h2>
          <div className="mt-4 space-y-2">
            {history.map((cv) => (
              <div
                key={cv.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <span className="font-display text-2xl font-bold text-gradient">
                  {cv.score ?? "—"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {cv.target_role || "CV analysis"}
                    {cv.target_company ? ` · ${cv.target_company}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(cv.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
