import type { Metadata } from "next";
import Link from "next/link";
import { Building2, MapPin, ShieldCheck, Search } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { createServerSupabase } from "@/lib/supabase-server";
import { SaveJobButton } from "@/components/save-job-button";
import { btnPrimary, cn, sizeMd } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Sponsorship Jobs",
  description:
    "Search UK graduate jobs tagged by Graduate Route and Skilled Worker visa sponsorship. Filter by industry, location, and salary — built for international students.",
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

const SPONSORSHIP = [
  { key: "all", label: "All sponsorship" },
  { key: "graduate", label: "Graduate Route" },
  { key: "skilled", label: "Skilled Worker" },
];

const inputCls =
  "h-10 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    industry?: string;
    location?: string;
    minSalary?: string;
    filter?: string;
  }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const industry = (sp.industry ?? "").trim();
  const location = (sp.location ?? "").trim();
  const minSalary = (sp.minSalary ?? "").trim();
  const filter = sp.filter ?? "all";

  const supabase = createServerSupabase();
  let jobs: Job[] = [];
  let industries: string[] = [];
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
    if (industry) query = query.eq("industry", industry);
    if (location) query = query.ilike("location", `%${location}%`);
    if (q) query = query.or(`title.ilike.%${q}%,company.ilike.%${q}%`);
    if (minSalary && !Number.isNaN(Number(minSalary))) {
      query = query.gte("salary_min", Number(minSalary));
    }

    const [{ data, error: qErr }, industryRes] = await Promise.all([
      query,
      supabase.from("jobs").select("industry").eq("is_active", true),
    ]);
    if (qErr) error = true;
    jobs = (data as Job[]) ?? [];
    industries = Array.from(
      new Set((industryRes.data ?? []).map((r) => r.industry).filter(Boolean) as string[])
    ).sort();
  } else {
    error = true;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Sponsorship Jobs</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            Jobs that can keep you in the UK
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every role tagged by visa sponsorship. Filter to what fits, and stop wasting your Graduate
            Route window on dead ends.
          </p>
        </div>

        {/* Filter bar */}
        <form className="mt-8 grid gap-2 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input name="q" defaultValue={q} placeholder="Role or company" className={cn(inputCls, "w-full pl-9")} />
          </div>
          <select name="industry" defaultValue={industry} className={cn(inputCls, "w-full")}>
            <option value="">All industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <input name="location" defaultValue={location} placeholder="Location" className={cn(inputCls, "w-full")} />
          <input name="minSalary" defaultValue={minSalary} placeholder="Min salary £" inputMode="numeric" className={cn(inputCls, "w-full")} />
          <select name="filter" defaultValue={filter} className={cn(inputCls, "w-full")}>
            {SPONSORSHIP.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <div className="flex gap-2 sm:col-span-2 lg:col-span-6">
            <button type="submit" className={cn(btnPrimary, sizeMd)}>Apply filters</button>
            <Link href="/jobs" className="inline-flex items-center px-3 text-sm text-muted-foreground hover:text-foreground">
              Reset
            </Link>
          </div>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          {error ? "" : `${jobs.length} role${jobs.length === 1 ? "" : "s"} found`}
        </p>

        {error ? (
          <p className="mt-12 text-center text-muted-foreground">
            Job listings are temporarily unavailable. Please check back shortly.
          </p>
        ) : jobs.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No roles match these filters. Try widening your search.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                    <a href={job.application_url} target="_blank" rel="noopener noreferrer" className={cn(btnPrimary, sizeMd)}>
                      Apply
                    </a>
                  )}
                  <SaveJobButton jobId={job.id} title={job.title} company={job.company} />
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Want CV coaching, GradScore™, and personalised matches?{" "}
          <Link href="/signup" className="text-primary underline">Create a free account</Link>.
        </p>
      </main>
      <Footer />
    </>
  );
}
