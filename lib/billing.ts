import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, planFromLookupKey } from "@/lib/stripe";

/** Statuses that keep paid access. past_due keeps access while Stripe retries the card. */
const ENTITLED = new Set<Stripe.Subscription.Status>(["active", "trialing", "past_due"]);

const DB_STATUSES = new Set(["active", "past_due", "canceled", "incomplete", "trialing", "unpaid"]);

/** Map a Stripe status onto the subscriptions.payment_status check constraint. */
export function dbStatus(status: Stripe.Subscription.Status) {
  if (DB_STATUSES.has(status)) return status;
  // incomplete_expired will never bill; paused can resume, so keep it "billable".
  return status === "incomplete_expired" ? "canceled" : "incomplete";
}

const ts = (s: number | null | undefined) => (s ? new Date(s * 1000).toISOString() : null);

function customerId(c: string | Stripe.Customer | Stripe.DeletedCustomer) {
  return typeof c === "string" ? c : c.id;
}

/** Find the Supabase user that owns a Stripe subscription. */
async function resolveUserId(sub: Stripe.Subscription): Promise<string | null> {
  if (sub.metadata?.user_id) return sub.metadata.user_id;

  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId(sub.customer))
    .maybeSingle();
  if (data?.user_id) return data.user_id;

  const customer = await getStripe().customers.retrieve(customerId(sub.customer));
  return !customer.deleted && customer.metadata?.user_id ? customer.metadata.user_id : null;
}

/**
 * Make Supabase match Stripe for one subscription: upsert the subscriptions
 * row and set profiles.plan. Safe to call repeatedly and out of order, because
 * it always re-reads the latest subscription from Stripe first.
 */
export async function syncSubscription(subscriptionId: string) {
  const sub = await getStripe().subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price"],
  });

  const userId = await resolveUserId(sub);
  if (!userId) {
    throw new Error(`No GradPilot user linked to subscription ${sub.id}`);
  }

  const admin = createAdminClient();

  // The account was deleted (e.g. the customer.subscription.deleted event that
  // follows account deletion). Nothing to sync; acknowledge so Stripe stops retrying.
  const { data: profile, error: profileErr } = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  if (profileErr) throw profileErr; // transient: let Stripe retry rather than drop the event
  if (!profile) return;

  const item = sub.items.data[0];
  const price = item?.price;
  const mapped = planFromLookupKey(price?.lookup_key) ??
    (sub.metadata?.plan === "pro" || sub.metadata?.plan === "premium"
      ? { plan: sub.metadata.plan, interval: price?.recurring?.interval === "year" ? "year" : "month" }
      : null);

  // A user may have an older, already-cancelled subscription. Never let a
  // stale event for a different subscription downgrade a live one.
  const { data: existing, error: existingErr } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, payment_status")
    .eq("user_id", userId)
    .maybeSingle();
  if (existingErr) throw existingErr;
  if (
    existing?.stripe_subscription_id &&
    existing.stripe_subscription_id !== sub.id &&
    ENTITLED.has(existing.payment_status) &&
    !ENTITLED.has(sub.status)
  ) {
    return;
  }

  const entitled = ENTITLED.has(sub.status) && mapped !== null;
  const plan = entitled ? mapped.plan : "free";
  const periodEnd = ts(item?.current_period_end);

  const { error: subErr } = await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId(sub.customer),
      stripe_subscription_id: sub.id,
      stripe_price_id: price?.id ?? null,
      billing_interval: mapped?.interval ?? null,
      plan_type: plan,
      payment_status: dbStatus(sub.status),
      cancel_at_period_end: sub.cancel_at_period_end || sub.cancel_at !== null,
      current_period_start: ts(item?.current_period_start),
      current_period_end: periodEnd,
      renewal_date: sub.cancel_at ? ts(sub.cancel_at) : periodEnd,
    },
    { onConflict: "user_id" }
  );
  if (subErr) throw subErr;

  const { error: profErr } = await admin.from("profiles").update({ plan }).eq("id", userId);
  if (profErr) throw profErr;
}

/** Get (or create once) the Stripe customer for a user, persisting the id. */
export async function getOrCreateCustomer(user: { id: string; email?: string | null }, name?: string | null) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (data?.stripe_customer_id) return data.stripe_customer_id as string;

  const customer = await getStripe().customers.create(
    {
      email: user.email ?? undefined,
      name: name || undefined,
      metadata: { user_id: user.id },
      preferred_locales: ["en-GB"],
    },
    // Double-clicks / concurrent requests reuse the same customer.
    { idempotencyKey: `gp-customer-${user.id}` }
  );

  const { error } = await admin
    .from("subscriptions")
    .upsert(
      { user_id: user.id, stripe_customer_id: customer.id, stripe_email: user.email ?? null },
      { onConflict: "user_id" }
    );
  if (error) throw error;
  return customer.id;
}

/** Statuses after which Stripe will never bill the subscription again. */
const FINISHED = new Set<Stripe.Subscription.Status>(["canceled", "incomplete_expired"]);

/** Subscription statuses the delete_own_account() guard treats as billable. */
const BILLABLE_DB = ["active", "trialing", "past_due", "unpaid", "incomplete"];

/**
 * Cancel every Stripe subscription a user still has, immediately, before their
 * account is deleted. Resolves only once Stripe confirms each one is cancelled;
 * throws otherwise, so the caller must NOT delete the account on error.
 *
 * Safe to call repeatedly: already-cancelled subscriptions are skipped and each
 * cancel uses an idempotency key, so double-submits never cancel twice.
 */
export async function cancelSubscriptionsForDeletion(userId: string) {
  const admin = createAdminClient();
  const { data: row, error } = await admin
    .from("subscriptions")
    .select("stripe_customer_id, stripe_subscription_id, payment_status")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;

  // Never had a Stripe customer: nothing can be billed.
  if (!row?.stripe_customer_id && !row?.stripe_subscription_id) return;

  const stripe = getStripe();

  // Ask Stripe, not our table, what's live: the row could be stale if a webhook was missed.
  const ids = new Set<string>();
  if (row.stripe_customer_id) {
    for await (const sub of stripe.subscriptions.list({ customer: row.stripe_customer_id, status: "all", limit: 100 })) {
      if (!FINISHED.has(sub.status)) ids.add(sub.id);
    }
  }
  if (row.stripe_subscription_id && !ids.has(row.stripe_subscription_id)) {
    try {
      const sub = await stripe.subscriptions.retrieve(row.stripe_subscription_id);
      if (!FINISHED.has(sub.status)) ids.add(sub.id);
    } catch (err) {
      if ((err as Stripe.errors.StripeError).code !== "resource_missing") throw err;
    }
  }

  for (const id of ids) {
    let status: Stripe.Subscription.Status;
    try {
      const cancelled = await stripe.subscriptions.cancel(
        id,
        {
          invoice_now: false,
          prorate: false,
          cancellation_details: { comment: "GradPilot AI account deleted by user" },
        },
        { idempotencyKey: `gp-account-delete-cancel-${id}` }
      );
      status = cancelled.status;
    } catch (err) {
      // Already cancelled elsewhere (portal, a parallel request): confirm, don't assume.
      status = (await stripe.subscriptions.retrieve(id)).status;
      if (!FINISHED.has(status)) throw err;
    }
    if (!FINISHED.has(status)) {
      throw new Error(`Subscription ${id} is still ${status} after cancellation`);
    }
  }

  // Mark the row so the delete_own_account() guard lets deletion proceed.
  if ((row.payment_status && BILLABLE_DB.includes(row.payment_status)) || ids.size > 0) {
    const { error: updErr } = await admin
      .from("subscriptions")
      .update({ payment_status: "canceled", plan_type: "free", cancel_at_period_end: false })
      .eq("user_id", userId);
    if (updErr) throw updErr;
  }
}

/** True if the user has a subscription row that may still be billing. */
export async function hasBillableSubscriptionRow(userId: string) {
  const { data, error } = await createAdminClient()
    .from("subscriptions")
    .select("payment_status, stripe_subscription_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data?.stripe_subscription_id && BILLABLE_DB.includes(data.payment_status));
}
