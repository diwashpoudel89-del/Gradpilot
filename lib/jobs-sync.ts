/**
 * Pulls UK vacancies from Adzuna into public.jobs (server-only).
 *
 * - Duplicates: the same Adzuna id is upserted in place via the unique
 *   (source, external_id) constraint; the same role reposted under different ids
 *   shares a dedupe_key and only the newest stays visible (mark_duplicate_jobs).
 * - Expiry: every advert returned gets last_seen_at = now. Only after a sync in
 *   which EVERY query succeeded are adverts not seen recently, or posted too long
 *   ago, deactivated (never deleted). A failed or partial sync never hides jobs.
 * - Sponsorship: Adzuna says nothing about visas, so sponsorship stays unknown
 *   (null). Never set it from provider data.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { ADZUNA_DEFAULTS, AdzunaError, fetchAdzunaPage, type AdzunaJob } from "@/lib/adzuna";

export const SYNC_SOURCE = "adzuna";

/** Graduate-relevant searches. Override with ADZUNA_QUERIES="a,b,c". */
export const DEFAULT_QUERIES = [
  "graduate",
  "graduate scheme",
  "graduate software engineer",
  "graduate data analyst",
  "graduate engineer",
  "graduate finance",
  "graduate marketing",
  "entry level",
];

/** An advert not returned for this long (by successful syncs) is treated as closed. */
export const STALE_AFTER_DAYS = 3;
/** Hide adverts older than this, whatever Adzuna returns. */
export const MAX_AGE_DAYS = 45;

export function syncQueries(): string[] {
  const fromEnv = process.env.ADZUNA_QUERIES?.split(",").map((q) => q.trim()).filter(Boolean);
  return fromEnv?.length ? fromEnv.slice(0, 20) : DEFAULT_QUERIES;
}

// ---------------------------------------------------------------- mapping

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", ndash: "–", mdash: "—", pound: "£", euro: "€",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", bull: "•",
};

/** Adzuna snippets contain <strong> highlights and HTML entities. */
export function cleanText(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      const key = e.toLowerCase();
      if (ENTITIES[key]) return ENTITIES[key];
      if (key.startsWith("#x")) return String.fromCodePoint(parseInt(key.slice(2), 16));
      if (key.startsWith("#")) return String.fromCodePoint(parseInt(key.slice(1), 10));
      return m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalised "title|company|location" so reposts of one role collapse together. */
export function dedupeKey(title: string, company: string, location: string | null): string {
  const norm = (v: string | null) =>
    (v ?? "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
  return [norm(title), norm(company), norm(location)].join("|");
}

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

function salaryText(min?: number, max?: number): string | null {
  const lo = Number.isFinite(min) && min! > 0 ? min! : null;
  const hi = Number.isFinite(max) && max! > 0 ? max! : null;
  if (lo && hi) return Math.round(lo) === Math.round(hi) ? gbp(lo) : `${gbp(lo)} – ${gbp(hi)}`;
  if (lo) return `From ${gbp(lo)}`;
  if (hi) return `Up to ${gbp(hi)}`;
  return null;
}

function safeUrl(u: string | undefined): string | null {
  if (!u) return null;
  try {
    const url = new URL(u);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function isPredicted(v: AdzunaJob["salary_is_predicted"]) {
  return v === true || v === 1 || v === "1";
}

export type JobRow = {
  source: string;
  external_id: string;
  title: string;
  company: string;
  location: string | null;
  salary: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_is_predicted: boolean;
  description: string | null;
  category: string | null;
  industry: string | null;
  job_type: string | null;
  contract_type: string | null;
  application_url: string;
  source_url: string;
  posted_at: string | null;
  source_created_at: string | null;
  last_seen_at: string;
  dedupe_key: string;
  is_active: true;
  sponsors_graduate_route: null;
  sponsors_skilled_worker: null;
  visa_info: null;
};

/** Map one Adzuna result to a jobs row, or null if it can't be shown safely. */
export function mapAdzunaJob(job: AdzunaJob, seenAt: string): JobRow | null {
  const title = cleanText(job.title);
  const url = safeUrl(job.redirect_url);
  if (job.id === undefined || job.id === null || !title || !url) return null;

  const company = cleanText(job.company?.display_name) || "Company not disclosed";
  const location = cleanText(job.location?.display_name) || null;
  const predicted = isPredicted(job.salary_is_predicted);
  const created = job.created && !Number.isNaN(Date.parse(job.created)) ? new Date(job.created).toISOString() : null;
  const category = cleanText(job.category?.label) || null;

  return {
    source: SYNC_SOURCE,
    external_id: String(job.id),
    title,
    company,
    location,
    // Estimated salaries are stored but never displayed as if advertised.
    salary: predicted ? null : salaryText(job.salary_min, job.salary_max),
    salary_min: job.salary_min ?? null,
    salary_max: job.salary_max ?? null,
    salary_is_predicted: predicted,
    description: cleanText(job.description) || null,
    category,
    industry: category,
    job_type: job.contract_time ?? null,
    contract_type: job.contract_type ?? null,
    application_url: url,
    source_url: url,
    posted_at: created,
    source_created_at: created,
    last_seen_at: seenAt,
    dedupe_key: dedupeKey(title, company, location),
    is_active: true,
    sponsors_graduate_route: null,
    sponsors_skilled_worker: null,
    visa_info: null,
  };
}

// ---------------------------------------------------------------- sync

export type SyncResult = {
  status: "success" | "partial" | "failed";
  requestsMade: number;
  jobsReceived: number;
  jobsUpserted: number;
  jobsDeactivated: number;
  duplicatesChanged: number;
  errors: string[];
};

type SyncOptions = {
  queries?: string[];
  maxPagesPerQuery?: number;
  resultsPerPage?: number;
  now?: Date;
  fetchPage?: typeof fetchAdzunaPage;
};

export async function syncAdzunaJobs(db: SupabaseClient, opts: SyncOptions = {}): Promise<SyncResult> {
  const queries = opts.queries ?? syncQueries();
  const maxPages = opts.maxPagesPerQuery ?? ADZUNA_DEFAULTS.maxPagesPerQuery;
  const perPage = opts.resultsPerPage ?? ADZUNA_DEFAULTS.resultsPerPage;
  const now = opts.now ?? new Date();
  const seenAt = now.toISOString();
  const fetchPage = opts.fetchPage ?? fetchAdzunaPage;

  const result: SyncResult = {
    status: "success",
    requestsMade: 0,
    jobsReceived: 0,
    jobsUpserted: 0,
    jobsDeactivated: 0,
    duplicatesChanged: 0,
    errors: [],
  };

  const { data: run } = await db
    .from("job_sync_runs")
    .insert({ source: SYNC_SOURCE })
    .select("id")
    .single();

  const rows = new Map<string, JobRow>(); // by external_id: one row per advert per sync
  let failedQueries = 0;

  outer: for (const query of queries) {
    for (let page = 1; page <= maxPages; page++) {
      try {
        result.requestsMade++;
        const { results } = await fetchPage({ query, page, resultsPerPage: perPage });
        result.jobsReceived += results.length;
        for (const job of results) {
          const row = mapAdzunaJob(job, seenAt);
          if (row) rows.set(row.external_id, row);
        }
        if (results.length < perPage) break; // last page for this query
      } catch (err) {
        failedQueries++;
        const msg = err instanceof Error ? err.message : String(err);
        result.errors.push(msg);
        if (err instanceof AdzunaError && err.fatal) {
          failedQueries = queries.length;
          break outer;
        }
        break; // move on to the next query
      }
    }
  }

  // Upsert in chunks. Columns not sent (is_featured, is_duplicate) keep their values.
  const all = [...rows.values()];
  for (let i = 0; i < all.length; i += 100) {
    const chunk = all.slice(i, i + 100);
    const { error } = await db.from("jobs").upsert(chunk, { onConflict: "source,external_id" });
    if (error) {
      result.errors.push(`Saving jobs failed: ${error.message}`);
      failedQueries = Math.max(failedQueries, 1);
    } else {
      result.jobsUpserted += chunk.length;
    }
  }

  if (failedQueries === 0) {
    const day = 24 * 60 * 60 * 1000;
    const { data, error } = await db.rpc("deactivate_stale_jobs", {
      p_source: SYNC_SOURCE,
      p_seen_before: new Date(now.getTime() - STALE_AFTER_DAYS * day).toISOString(),
      p_posted_before: new Date(now.getTime() - MAX_AGE_DAYS * day).toISOString(),
    });
    if (error) result.errors.push(`Expiring old jobs failed: ${error.message}`);
    else result.jobsDeactivated = Number(data ?? 0);
  }

  if (result.jobsUpserted > 0 || result.jobsDeactivated > 0) {
    const { data, error } = await db.rpc("mark_duplicate_jobs");
    if (error) result.errors.push(`Duplicate check failed: ${error.message}`);
    else result.duplicatesChanged = Number(data ?? 0);
  }

  result.status =
    failedQueries === 0 && result.errors.length === 0
      ? "success"
      : result.jobsUpserted > 0
        ? "partial"
        : "failed";

  if (run?.id) {
    await db
      .from("job_sync_runs")
      .update({
        status: result.status,
        finished_at: new Date().toISOString(),
        requests_made: result.requestsMade,
        jobs_received: result.jobsReceived,
        jobs_upserted: result.jobsUpserted,
        jobs_deactivated: result.jobsDeactivated,
        error: result.errors.length ? result.errors.join("\n").slice(0, 2000) : null,
      })
      .eq("id", run.id);
  }

  return result;
}
