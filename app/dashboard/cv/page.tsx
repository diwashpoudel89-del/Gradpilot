import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CvCoach } from "@/components/cv-coach";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "AI CV Coach" };

export default async function CvPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("cvs")
    .select("id, target_role, target_company, score, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);
  const history = (data as { id: string; target_role: string | null; target_company: string | null; score: number | null; created_at: string }[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">AI CV Coach</h1>
      <p className="mt-1 text-slate-600">
        Paste your CV for a UK-readiness score, specific fixes, a rewrite, and a tailored cover letter — powered by Claude Opus 4.8.
      </p>
      <div className="mt-8"><CvCoach /></div>

      {history.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold">Recent analyses</h2>
          <div className="mt-4 space-y-2">
            {history.map((cv) => (
              <div key={cv.id} className="card flex items-center gap-4 p-4">
                <span className="font-display text-2xl font-bold text-gradient">{cv.score ?? "—"}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{cv.target_role || "CV analysis"}{cv.target_company ? ` · ${cv.target_company}` : ""}</p>
                  <p className="text-xs text-slate-500">{new Date(cv.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
