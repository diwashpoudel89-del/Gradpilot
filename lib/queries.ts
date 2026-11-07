import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import type {
  Job,
  BlogPost,
  Mentor,
  EmployerInsight,
  Testimonial,
  Faq,
  PricingPlan,
} from "@/lib/types";

// Every fetcher fails soft: on missing config or any error it returns an empty
// result instead of throwing, so a page never crashes on a bad query.

async function safe<T>(fn: (db: Awaited<ReturnType<typeof createClient>>) => Promise<T>, fallback: T): Promise<T> {
  if (!supabaseConfigured) return fallback;
  try {
    const db = await createClient();
    return await fn(db);
  } catch (e) {
    console.error("query error", e);
    return fallback;
  }
}

export function getJobs(): Promise<Job[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("deadline", { ascending: true });
    return (data ?? []) as Job[];
  }, []);
}

export const JOBS_PAGE_SIZE = 20;

export type JobsPage = { jobs: Job[]; total: number; page: number; pageCount: number };

/** Strip characters that have meaning in PostgREST filter strings. */
export function sanitizeSearch(v: string | undefined | null, max = 80): string {
  return (v ?? "").replace(/[%_,()*\\:."']/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * One page of the public jobs board.
 * Hides inactive adverts, duplicates, manual jobs past their deadline and — once
 * real vacancies are switched on — the unverified sample jobs.
 */
export function getJobsPage(opts: { q?: string; location?: string; page?: number } = {}): Promise<JobsPage> {
  const page = Math.max(1, Math.floor(opts.page ?? 1) || 1);
  const empty: JobsPage = { jobs: [], total: 0, page, pageCount: 0 };
  return safe(async (db) => {
    const today = new Date().toISOString().slice(0, 10);
    const from = (page - 1) * JOBS_PAGE_SIZE;
    let query = db
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .eq("is_duplicate", false)
      .or(`deadline.is.null,deadline.gte.${today}`);
    if (process.env.ADZUNA_ENABLED === "true") query = query.neq("source", "sample");

    const q = sanitizeSearch(opts.q);
    if (q) query = query.or(`title.ilike.*${q}*,company.ilike.*${q}*,category.ilike.*${q}*`);
    const location = sanitizeSearch(opts.location, 60);
    if (location) query = query.ilike("location", `%${location}%`);

    const { data, count, error } = await query
      .order("is_featured", { ascending: false })
      .order("posted_at", { ascending: false, nullsFirst: false })
      .range(from, from + JOBS_PAGE_SIZE - 1);
    if (error) throw error;
    const total = count ?? 0;
    return { jobs: (data ?? []) as Job[], total, page, pageCount: Math.ceil(total / JOBS_PAGE_SIZE) };
  }, empty);
}

export function getJob(id: string): Promise<Job | null> {
  return safe(async (db) => {
    const { data } = await db.from("jobs").select("*").eq("id", id).maybeSingle();
    return (data ?? null) as Job | null;
  }, null);
}

export function getBlogPosts(): Promise<BlogPost[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    return (data ?? []) as BlogPost[];
  }, []);
}

export function getBlogPost(slug: string): Promise<BlogPost | null> {
  return safe(async (db) => {
    const { data } = await db
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return (data ?? null) as BlogPost | null;
  }, null);
}

export function getMentors(): Promise<Mentor[]> {
  return safe(async (db) => {
    const { data } = await db.from("mentors").select("*").order("name");
    return (data ?? []) as Mentor[];
  }, []);
}

export function getEmployerInsights(): Promise<EmployerInsight[]> {
  return safe(async (db) => {
    const { data } = await db.from("employer_insights").select("*").order("company");
    return (data ?? []) as EmployerInsight[];
  }, []);
}

export function getTestimonials(): Promise<Testimonial[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("display_order");
    return (data ?? []) as Testimonial[];
  }, []);
}

export function getFaqs(): Promise<Faq[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("display_order");
    return (data ?? []) as Faq[];
  }, []);
}

export function getPricingPlans(): Promise<PricingPlan[]> {
  return safe(async (db) => {
    const { data } = await db.from("pricing_plans").select("*").order("display_order");
    return (data ?? []) as PricingPlan[];
  }, []);
}
