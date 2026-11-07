import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AdzunaError, type AdzunaJob, type fetchAdzunaPage } from "@/lib/adzuna";
import { cleanText, dedupeKey, mapAdzunaJob, syncAdzunaJobs } from "@/lib/jobs-sync";

const SEEN = "2026-11-07T10:00:00.000Z";

const ad = (over: Partial<AdzunaJob> = {}): AdzunaJob => ({
  id: "4412",
  title: "Graduate <strong>Software</strong> Engineer",
  description: "Join our team &amp; build things&hellip;",
  created: "2026-11-05T09:00:00Z",
  redirect_url: "https://www.adzuna.co.uk/jobs/land/ad/4412?se=x",
  salary_min: 30000,
  salary_max: 35000,
  salary_is_predicted: "0",
  contract_time: "full_time",
  contract_type: "permanent",
  company: { display_name: "Acme Ltd" },
  location: { display_name: "London, UK" },
  category: { label: "IT Jobs", tag: "it-jobs" },
  ...over,
});

describe("mapAdzunaJob", () => {
  it("maps fields, strips HTML and never claims sponsorship", () => {
    const row = mapAdzunaJob(ad(), SEEN)!;
    expect(row).toMatchObject({
      source: "adzuna",
      external_id: "4412",
      title: "Graduate Software Engineer",
      company: "Acme Ltd",
      location: "London, UK",
      salary: "£30,000 – £35,000",
      salary_is_predicted: false,
      industry: "IT Jobs",
      job_type: "full_time",
      contract_type: "permanent",
      application_url: "https://www.adzuna.co.uk/jobs/land/ad/4412?se=x",
      source_created_at: "2026-11-05T09:00:00.000Z",
      last_seen_at: SEEN,
      sponsors_graduate_route: null,
      sponsors_skilled_worker: null,
      visa_info: null,
    });
    expect(row.description).toBe("Join our team & build things…");
  });

  it("hides estimated salaries", () => {
    const row = mapAdzunaJob(ad({ salary_is_predicted: "1" }), SEEN)!;
    expect(row.salary).toBeNull();
    expect(row.salary_is_predicted).toBe(true);
    expect(row.salary_min).toBe(30000);
  });

  it("drops adverts without a usable title or link", () => {
    expect(mapAdzunaJob(ad({ title: "  " }), SEEN)).toBeNull();
    expect(mapAdzunaJob(ad({ redirect_url: "javascript:alert(1)" }), SEEN)).toBeNull();
    expect(mapAdzunaJob(ad({ redirect_url: undefined }), SEEN)).toBeNull();
  });

  it("handles a missing company", () => {
    expect(mapAdzunaJob(ad({ company: undefined }), SEEN)!.company).toBe("Company not disclosed");
  });
});

describe("cleanText / dedupeKey", () => {
  it("decodes common entities", () => {
    expect(cleanText("A &lt;b&gt; &#39;c&#39; &#x26; d")).toBe("A <b> 'c' & d");
  });
  it("collapses reposts of the same role", () => {
    expect(dedupeKey("Graduate Engineer!", "ACME Ltd.", "London")).toBe(dedupeKey("graduate  engineer", "acme ltd", "LONDON"));
    expect(dedupeKey("Graduate Engineer", "Acme", "London")).not.toBe(dedupeKey("Graduate Engineer", "Acme", "Leeds"));
  });
});

// ---------------------------------------------------------------- sync

function fakeDb() {
  const calls = { upserts: [] as unknown[][], rpcs: [] as string[], runUpdate: null as Record<string, unknown> | null };
  const db = {
    from(table: string) {
      return {
        insert: () => ({ select: () => ({ single: async () => ({ data: { id: "run-1" }, error: null }) }) }),
        upsert: async (rows: unknown[]) => {
          calls.upserts.push(rows);
          return { error: null };
        },
        update: (v: Record<string, unknown>) => ({
          eq: async () => {
            if (table === "job_sync_runs") calls.runUpdate = v;
            return { error: null };
          },
        }),
      };
    },
    rpc: async (name: string) => {
      calls.rpcs.push(name);
      return { data: name === "deactivate_stale_jobs" ? 4 : 1, error: null };
    },
  };
  return { db: db as unknown as SupabaseClient, calls };
}

type FetchPage = typeof fetchAdzunaPage;

describe("syncAdzunaJobs", () => {
  it("paginates until a short page, de-duplicates ids, expires stale jobs", async () => {
    const fetchPage = vi.fn<FetchPage>(async ({ query, page }) => {
      if (query === "a" && page === 1) return { results: [ad({ id: 1 }), ad({ id: 2 })] };
      if (query === "a" && page === 2) return { results: [ad({ id: 3 })] }; // short page: stop
      return { results: [ad({ id: 2 })] }; // same advert from another search
    });
    const { db, calls } = fakeDb();
    const res = await syncAdzunaJobs(db, { queries: ["a", "b"], maxPagesPerQuery: 5, resultsPerPage: 2, fetchPage });

    expect(fetchPage).toHaveBeenCalledTimes(3);
    expect(res.status).toBe("success");
    expect(res.jobsUpserted).toBe(3); // ids 1,2,3 once each
    expect(calls.upserts.flat()).toHaveLength(3);
    expect(calls.rpcs).toEqual(["deactivate_stale_jobs", "mark_duplicate_jobs"]);
    expect(res.jobsDeactivated).toBe(4);
    expect(calls.runUpdate).toMatchObject({ status: "success", jobs_upserted: 3 });
  });

  it("never expires jobs after a partial failure", async () => {
    const fetchPage = vi.fn<FetchPage>(async ({ query }) => {
      if (query === "bad") throw new AdzunaError("Adzuna HTTP 500", 500);
      return { results: [ad({ id: 9 })] };
    });
    const { db, calls } = fakeDb();
    const res = await syncAdzunaJobs(db, { queries: ["good", "bad"], resultsPerPage: 50, fetchPage });

    expect(res.status).toBe("partial");
    expect(calls.rpcs).not.toContain("deactivate_stale_jobs");
    expect(calls.rpcs).toContain("mark_duplicate_jobs");
    expect(res.errors[0]).toMatch(/500/);
  });

  it("stops everything on a fatal credentials error", async () => {
    const fetchPage = vi.fn<FetchPage>(async () => {
      throw new AdzunaError("Adzuna rejected the credentials (HTTP 401).", 401, true);
    });
    const { db, calls } = fakeDb();
    const res = await syncAdzunaJobs(db, { queries: ["a", "b", "c"], fetchPage });

    expect(fetchPage).toHaveBeenCalledTimes(1);
    expect(res.status).toBe("failed");
    expect(calls.upserts).toHaveLength(0);
    expect(calls.rpcs).toHaveLength(0);
    expect(calls.runUpdate).toMatchObject({ status: "failed" });
  });
});
