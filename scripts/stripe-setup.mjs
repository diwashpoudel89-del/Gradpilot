// One-shot, idempotent Stripe setup for GradPilot AI.
//
//   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs [--webhook-url https://www.gradpilotai.com/api/stripe/webhook]
//
// Creates/updates: Pro + Premium products, 4 GBP prices (addressed by lookup
// key), the Customer Portal configuration, and optionally the webhook endpoint.
// Safe to re-run; to change a price, edit PLANS and re-run.
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY first.");
  process.exit(1);
}
const stripe = new Stripe(key);
const mode = key.startsWith("sk_live") || key.startsWith("rk_live") ? "LIVE" : "TEST";
if (mode === "LIVE" && !process.argv.includes("--live")) {
  console.error("Refusing to run with a LIVE key. Use a test key (sk_test_/rk_test_), or pass --live deliberately.");
  process.exit(1);
}
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.gradpilotai.com").replace(/\/$/, "");

const PLANS = [
  {
    id: "gradpilot_pro",
    name: "GradPilot AI Pro",
    description: "Unlimited AI career tools for international graduates in the UK.",
    prices: { month: 999, year: 9999 },
    lookup: { month: "gradpilot_pro_monthly", year: "gradpilot_pro_annual" },
  },
  {
    id: "gradpilot_premium",
    name: "GradPilot AI Premium",
    description: "Everything in Pro plus premium coaching and priority support.",
    prices: { month: 1999, year: 19999 },
    lookup: { month: "gradpilot_premium_monthly", year: "gradpilot_premium_annual" },
  },
];

const EVENTS = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.paused",
  "customer.subscription.resumed",
  "invoice.paid",
  "invoice.payment_failed",
];

console.log(`\nStripe setup — ${mode} mode\n`);

const portalProducts = [];
for (const plan of PLANS) {
  // Products use fixed ids so re-runs never duplicate them.
  let product;
  try {
    product = await stripe.products.retrieve(plan.id);
    product = await stripe.products.update(plan.id, {
      name: plan.name,
      description: plan.description,
      active: true,
    });
  } catch (err) {
    if (err?.code !== "resource_missing") throw err;
    product = await stripe.products.create({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      tax_code: "txcd_10103001", // SaaS — business use
    });
  }
  console.log(`✓ product ${product.id}`);

  const priceIds = [];
  for (const interval of ["month", "year"]) {
    const lookup_key = plan.lookup[interval];
    const amount = plan.prices[interval];
    const { data } = await stripe.prices.list({ lookup_keys: [lookup_key], active: true, limit: 1 });
    let price = data[0];
    if (!price || price.unit_amount !== amount || price.currency !== "gbp" || price.product !== plan.id) {
      price = await stripe.prices.create({
        product: plan.id,
        currency: "gbp",
        unit_amount: amount,
        recurring: { interval },
        lookup_key,
        transfer_lookup_key: true, // move the key off any old price
        tax_behavior: "inclusive", // UK consumer prices are VAT-inclusive
      });
      if (data[0]) await stripe.prices.update(data[0].id, { active: false });
      console.log(`✓ price ${lookup_key} created (£${(amount / 100).toFixed(2)}/${interval})`);
    } else {
      console.log(`✓ price ${lookup_key} up to date`);
    }
    priceIds.push(price.id);
  }
  portalProducts.push({ product: plan.id, prices: priceIds });
}

// Customer Portal: card updates, invoices, plan switching, cancel at period end.
const portalConfig = {
  business_profile: {
    headline: "GradPilot AI — manage your plan",
    privacy_policy_url: `${SITE}/privacy`,
    terms_of_service_url: `${SITE}/terms`,
  },
  default_return_url: `${SITE}/settings/plan`,
  features: {
    customer_update: { enabled: true, allowed_updates: ["email", "name", "address", "tax_id"] },
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
    subscription_cancel: {
      enabled: true,
      mode: "at_period_end",
      cancellation_reason: {
        enabled: true,
        options: ["too_expensive", "missing_features", "switched_service", "unused", "other"],
      },
    },
    subscription_update: {
      enabled: true,
      default_allowed_updates: ["price"],
      products: portalProducts,
      proration_behavior: "create_prorations",
    },
  },
};
const { data: defaults } = await stripe.billingPortal.configurations.list({ is_default: true, limit: 1 });
if (defaults[0]) {
  await stripe.billingPortal.configurations.update(defaults[0].id, portalConfig);
  console.log(`✓ customer portal (default config ${defaults[0].id}) updated`);
} else {
  const created = await stripe.billingPortal.configurations.create(portalConfig);
  console.log(`✓ customer portal config created: ${created.id}`);
  console.log(`  → set STRIPE_PORTAL_CONFIGURATION=${created.id} in your env`);
}

// Webhook endpoint (optional).
const flag = process.argv.indexOf("--webhook-url");
if (flag !== -1) {
  const url = process.argv[flag + 1];
  if (!url) throw new Error("--webhook-url needs a value");
  const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
  const found = endpoints.data.find((e) => e.url === url);
  if (found) {
    await stripe.webhookEndpoints.update(found.id, { enabled_events: EVENTS, disabled: false });
    console.log(`✓ webhook ${found.id} already exists — events updated.`);
    console.log("  (Its signing secret is shown in the Stripe Dashboard → Developers → Webhooks.)");
  } else {
    const created = await stripe.webhookEndpoints.create({
      url,
      enabled_events: EVENTS,
      description: "GradPilot AI billing sync",
    });
    console.log(`✓ webhook ${created.id} created for ${url}`);
    console.log(`\n  STRIPE_WEBHOOK_SECRET=${created.secret}\n`);
    console.log("  ↑ shown only once — add it to your env now.");
  }
}

console.log("\nDone.\n");
