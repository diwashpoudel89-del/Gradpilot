/**
 * Server-only Adzuna Jobs API client.
 * Credentials come from ADZUNA_APP_ID / ADZUNA_APP_KEY and must never reach the
 * browser: only import this from route handlers or other server code.
 */
if (typeof window !== "undefined") {
  throw new Error("lib/adzuna must only be used on the server.");
}

const API_BASE = "https://api.adzuna.com/v1/api/jobs/gb/search";

export const ADZUNA_DEFAULTS = {
  resultsPerPage: 50,
  maxDaysOld: 30,
  maxPagesPerQuery: 2,
  timeoutMs: 10_000,
  maxAttempts: 3,
};

/** The subset of an Adzuna search result we use. */
export type AdzunaJob = {
  id: string | number;
  title?: string;
  description?: string;
  created?: string;
  redirect_url?: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string | number | boolean;
  contract_time?: string;
  contract_type?: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  category?: { label?: string; tag?: string };
};

export type AdzunaPage = { results: AdzunaJob[]; count?: number };

export class AdzunaError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    /** Auth/config problems: retrying or continuing with other queries is pointless. */
    readonly fatal = false
  ) {
    super(message);
    this.name = "AdzunaError";
  }
}

export function adzunaCredentials() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  return appId && appKey ? { appId, appKey } : null;
}

export function isAdzunaEnabled() {
  return process.env.ADZUNA_ENABLED === "true" && adzunaCredentials() !== null;
}

type FetchOptions = {
  query: string;
  page: number;
  resultsPerPage?: number;
  maxDaysOld?: number;
  fetchImpl?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
};

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Fetch one page of UK results. Retries timeouts, 429 and 5xx with backoff;
 * 401/403 are fatal. Never includes credentials in thrown messages.
 */
export async function fetchAdzunaPage({
  query,
  page,
  resultsPerPage = ADZUNA_DEFAULTS.resultsPerPage,
  maxDaysOld = ADZUNA_DEFAULTS.maxDaysOld,
  fetchImpl = fetch,
  sleep = defaultSleep,
}: FetchOptions): Promise<AdzunaPage> {
  const creds = adzunaCredentials();
  if (!creds) throw new AdzunaError("Adzuna credentials are not configured.", null, true);

  const params = new URLSearchParams({
    app_id: creds.appId,
    app_key: creds.appKey,
    results_per_page: String(resultsPerPage),
    what: query,
    max_days_old: String(maxDaysOld),
    sort_by: "date",
    "content-type": "application/json",
  });
  const url = `${API_BASE}/${page}?${params}`;

  let lastError: AdzunaError | null = null;
  for (let attempt = 1; attempt <= ADZUNA_DEFAULTS.maxAttempts; attempt++) {
    let res: Response;
    try {
      res = await fetchImpl(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(ADZUNA_DEFAULTS.timeoutMs),
        cache: "no-store",
      });
    } catch {
      lastError = new AdzunaError(`Adzuna request failed or timed out (query "${query}", page ${page}).`, null);
      await sleep(backoff(attempt));
      continue;
    }

    if (res.ok) {
      const body = (await res.json().catch(() => null)) as AdzunaPage | null;
      if (!body || !Array.isArray(body.results)) {
        throw new AdzunaError(`Adzuna returned an unexpected response (query "${query}", page ${page}).`, res.status);
      }
      return body;
    }

    if (res.status === 401 || res.status === 403) {
      throw new AdzunaError(`Adzuna rejected the credentials (HTTP ${res.status}).`, res.status, true);
    }
    lastError = new AdzunaError(`Adzuna HTTP ${res.status} (query "${query}", page ${page}).`, res.status);
    if (res.status !== 429 && res.status < 500) throw lastError; // other 4xx: not retryable
    const retryAfter = Number(res.headers.get("retry-after"));
    await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 30) * 1000 : backoff(attempt));
  }
  throw lastError ?? new AdzunaError("Adzuna request failed.", null);
}

function backoff(attempt: number) {
  return 1000 * 2 ** (attempt - 1); // 1s, 2s, 4s
}
