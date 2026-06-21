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
  SavedJob,
  Application,
  Profile,
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

// ---- User-scoped data (RLS restricts every row to the signed-in user) ----

export function getSavedJobs(userId: string): Promise<SavedJob[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("saved_jobs")
      .select("*")
      .eq("user_id", userId)
      .order("saved_at", { ascending: false });
    return (data ?? []) as SavedJob[];
  }, []);
}

export function getApplications(userId: string): Promise<Application[]> {
  return safe(async (db) => {
    const { data } = await db
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    return (data ?? []) as Application[];
  }, []);
}

export function getProfile(userId: string): Promise<Profile | null> {
  return safe(async (db) => {
    const { data } = await db.from("profiles").select("*").eq("id", userId).maybeSingle();
    return (data ?? null) as Profile | null;
  }, null);
}

export function getSavedJobIds(userId: string): Promise<string[]> {
  return safe(async (db) => {
    const { data } = await db.from("saved_jobs").select("job_id").eq("user_id", userId);
    return (data ?? []).map((r: { job_id: string | null }) => r.job_id).filter((x): x is string => !!x);
  }, []);
}
