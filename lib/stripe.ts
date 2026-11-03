import Stripe from "stripe";

export type PaidPlan = "pro" | "premium";
export type BillingInterval = "month" | "year";

/**
 * Stripe prices are addressed by lookup key so no price IDs live in env or
 * code. `npm run stripe:setup` creates them (see scripts/stripe-setup.mjs).
 */
export const PRICE_LOOKUP_KEYS: Record<PaidPlan, Record<BillingInterval, string>> = {
  pro: { month: "gradpilot_pro_monthly", year: "gradpilot_pro_annual" },
  premium: { month: "gradpilot_premium_monthly", year: "gradpilot_premium_annual" },
};

export function isPaidPlan(v: unknown): v is PaidPlan {
  return v === "pro" || v === "premium";
}

export function isInterval(v: unknown): v is BillingInterval {
  return v === "month" || v === "year";
}

/** Reverse lookup: which plan/interval does this Stripe price represent? */
export function planFromLookupKey(
  key: string | null | undefined
): { plan: PaidPlan; interval: BillingInterval } | null {
  if (!key) return null;
  for (const plan of ["pro", "premium"] as const) {
    for (const interval of ["month", "year"] as const) {
      if (PRICE_LOOKUP_KEYS[plan][interval] === key) return { plan, interval };
    }
  }
  return null;
}

/** Live keys are refused unless live billing is explicitly switched on. */
function isLiveKey(key: string) {
  return key.startsWith("sk_live_") || key.startsWith("rk_live_");
}

function liveAllowed() {
  return process.env.STRIPE_ALLOW_LIVE_MODE === "true";
}

export function isStripeConfigured() {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key) && (!isLiveKey(key!) || liveAllowed());
}

let _stripe: Stripe | null = null;

/** Lazily-created Stripe client (never instantiated at build time). */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe is not configured.");
  }
  if (isLiveKey(process.env.STRIPE_SECRET_KEY) && !liveAllowed()) {
    throw new Error("Live Stripe key refused: set STRIPE_ALLOW_LIVE_MODE=true to take real payments.");
  }
  _stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY, {
    appInfo: { name: "GradPilot AI", url: "https://www.gradpilotai.com" },
    maxNetworkRetries: 2,
  });
  return _stripe;
}

const priceCache = new Map<string, string>();

/** Resolve a lookup key to an active Stripe price id. */
export async function getPriceId(plan: PaidPlan, interval: BillingInterval) {
  const key = PRICE_LOOKUP_KEYS[plan][interval];
  const cached = priceCache.get(key);
  if (cached) return cached;

  const { data } = await getStripe().prices.list({
    lookup_keys: [key],
    active: true,
    limit: 1,
  });
  if (!data[0]) {
    throw new Error(
      `No active Stripe price with lookup key "${key}". Run \`npm run stripe:setup\`.`
    );
  }
  priceCache.set(key, data[0].id);
  return data[0].id;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
