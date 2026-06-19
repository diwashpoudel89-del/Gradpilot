import type { Metadata } from "next";
import Link from "next/link";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { createServerSupabase } from "@/lib/supabase-server";
import { btnOutline, btnPrimary, cn, sizeMd } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Visa-sponsoring jobs",
  description:
    "Browse UK graduate jobs tagged by Graduate Route and Skilled Worker visa sponsorship — built for international students.",
  alternates: { canonical: "/jobs" },
};

export const dynamic = "force-dynamic";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  salary: string | null;
  industry: string | null;
  sponsors_graduate_route: boolean | null;
  sponsors_skilled_worker: boolean | null;
  application_url: string | null;
};

const FILTERS = [
  { key: "all", label: "All roles" },
  { key: "graduate", label: "Graduate Route" },
  { key: "skilled", label: "Skilled Worker" },
];

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "all" } = await searchParams;
  const supabase = createServerSupabase();

  let jobs: Job[] = [];
  let error = false;

  if (supabase) {
    let query = supabase
      .from("jobs")
      .select(
        "id,title,company,location,salary,industry,sponsors_graduate_route,sponsors_skilled_worker,application_url"
      )
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("posted_at", { ascending: false });

    if (filter === "graduate") query = query.eq("sponsors_graduate_route", true);
    if (filter === "skilled") query = query.eq("sponsors_skilled_worker", true);

    const { data, error: qErr } = await query;
    if (qErr) error = true;
    jobs = (data as Job[]) ?? [];
  } else {
    error = true;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight">Visa-sponsoring jobs</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every role tagged by sponsorship status, so you only apply where you actually have a
            chance. Built for international students on the Graduate Route.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={f.key === "all" ? "/jobs" : `/jobs?filter=${f.key}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {error ? (
          <p className="mt-12 text-center text-muted-foreground">
            Job listings are temporarily unavailable. Please check back shortly.
          </p>
        ) : jobs.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No roles match this filter yet.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h2 className="font-display text-lg font-semibold">{job.title}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="size-4" /> {job.company}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" /> {job.location}
                    </span>
                  )}
                  {job.salary && <span>{job.salary}</span>}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {job.sponsors_graduate_route && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-primary">
                      <ShieldCheck className="size-3.5" /> Graduate Route
                    </span>
                  )}
                  {job.sponsors_skilled_worker && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-primary">
                      <ShieldCheck className="size-3.5" /> Skilled Worker
                    </span>
                  )}
                  {job.industry && (
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                      {job.industry}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex gap-2">
                  {job.application_url && (
                    <a
                      href={job.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(btnPrimary, sizeMd)}
                    >
                      Apply
                    </a>
                  )}
                  <Link href="/signup" className={cn(btnOutline, sizeMd)}>
                    Save with GradPilot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Want CV coaching, application tracking, and personalised matches?{" "}
          <Link href="/signup" className="text-primary underline">
            Create a free account
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
