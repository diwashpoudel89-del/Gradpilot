import { timingSafeEqual } from "node:crypto";
import { isAdzunaEnabled } from "@/lib/adzuna";
import { syncAdzunaJobs } from "@/lib/jobs-sync";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

// Runs on the server only; Adzuna credentials never leave this process.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Sync Adzuna vacancies into public.jobs.
 * Called by Vercel Cron (production deployments only) or manually with
 * `Authorization: Bearer <CRON_SECRET>`. Does nothing unless ADZUNA_ENABLED=true.
 */
export async function GET(request: Request) {
  if (!authorised(request.headers.get("authorization"))) {
    return Response.json({ error: "unauthorised" }, { status: 401 });
  }
  if (!isAdzunaEnabled()) {
    return Response.json({ status: "disabled" }, { status: 200 });
  }
  if (!isAdminConfigured()) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const result = await syncAdzunaJobs(createAdminClient());
    console.log("[jobs-sync]", JSON.stringify(result));
    return Response.json(result, { status: result.status === "failed" ? 502 : 200 });
  } catch (err) {
    console.error("[jobs-sync] crashed", err);
    return Response.json({ status: "failed", error: "sync_crashed" }, { status: 500 });
  }
}

function authorised(header: string | null) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
