import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdzunaError, fetchAdzunaPage, isAdzunaEnabled } from "@/lib/adzuna";

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });

const noSleep = async () => {};

describe("fetchAdzunaPage", () => {
  beforeEach(() => {
    vi.stubEnv("ADZUNA_APP_ID", "test-id");
    vi.stubEnv("ADZUNA_APP_KEY", "test-key");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("calls the UK endpoint with paging and filters", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request) => json({ results: [{ id: 1 }], count: 1 }));
    const page = await fetchAdzunaPage({ query: "graduate", page: 3, resultsPerPage: 50, fetchImpl, sleep: noSleep });
    expect(page.results).toHaveLength(1);
    const url = new URL(String(fetchImpl.mock.calls[0][0]));
    expect(url.origin + url.pathname).toBe("https://api.adzuna.com/v1/api/jobs/gb/search/3");
    expect(url.searchParams.get("what")).toBe("graduate");
    expect(url.searchParams.get("results_per_page")).toBe("50");
    expect(url.searchParams.get("max_days_old")).toBe("30");
    expect(url.searchParams.get("sort_by")).toBe("date");
  });

  it("retries rate limits and server errors, then succeeds", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(json({}, 429, { "retry-after": "1" }))
      .mockResolvedValueOnce(json({}, 503))
      .mockResolvedValueOnce(json({ results: [] }));
    const sleep = vi.fn(noSleep);
    await expect(fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep })).resolves.toEqual({ results: [] });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenNthCalledWith(1, 1000);
  });

  it("gives up after the maximum attempts", async () => {
    const fetchImpl = vi.fn(async () => json({}, 500));
    await expect(fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep: noSleep })).rejects.toBeInstanceOf(AdzunaError);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("treats rejected credentials as fatal and does not retry", async () => {
    const fetchImpl = vi.fn(async () => json({}, 401));
    const err = await fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep: noSleep }).catch((e) => e);
    expect(err).toBeInstanceOf(AdzunaError);
    expect(err.fatal).toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("never puts credentials in error messages", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down");
    });
    const err = await fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep: noSleep }).catch((e) => e);
    expect(String(err.message)).not.toContain("test-key");
    expect(String(err.message)).not.toContain("test-id");
  });

  it("rejects a malformed body", async () => {
    const fetchImpl = vi.fn(async () => json({ nope: true }));
    await expect(fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep: noSleep })).rejects.toThrow(/unexpected response/);
  });

  it("fails fast without credentials", async () => {
    vi.stubEnv("ADZUNA_APP_KEY", "");
    const fetchImpl = vi.fn();
    const err = await fetchAdzunaPage({ query: "x", page: 1, fetchImpl, sleep: noSleep }).catch((e) => e);
    expect(err.fatal).toBe(true);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("isAdzunaEnabled", () => {
  afterEach(() => vi.unstubAllEnvs());
  it("needs the flag and both credentials", () => {
    vi.stubEnv("ADZUNA_APP_ID", "a");
    vi.stubEnv("ADZUNA_APP_KEY", "b");
    vi.stubEnv("ADZUNA_ENABLED", "");
    expect(isAdzunaEnabled()).toBe(false);
    vi.stubEnv("ADZUNA_ENABLED", "true");
    expect(isAdzunaEnabled()).toBe(true);
  });
});
