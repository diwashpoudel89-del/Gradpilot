import type Stripe from "stripe";
import { syncSubscription } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe webhook — the source of truth for who has a paid plan.
 * Endpoint: /api/stripe/webhook
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  if (!signature) return Response.json({ error: "missing_signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    // Signature is computed over the exact raw body.
    event = await getStripe().webhooks.constructEventAsync(await request.text(), signature, secret);
  } catch {
    return Response.json({ error: "invalid_signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Idempotency: Stripe may deliver an event more than once.
  const { error: dupErr } = await admin
    .from("stripe_events")
    .insert({ id: event.id, type: event.type });
  if (dupErr) {
    if (dupErr.code === "23505") return Response.json({ received: true, duplicate: true });
    console.error("[stripe] event log failed", dupErr);
    return Response.json({ error: "storage" }, { status: 500 });
  }

  try {
    const subscriptionId = subscriptionIdFor(event);
    if (subscriptionId) await syncSubscription(subscriptionId);
  } catch (err) {
    console.error(`[stripe] ${event.type} ${event.id} failed`, err);
    // Forget the event so Stripe's retry gets processed.
    await admin.from("stripe_events").delete().eq("id", event.id);
    return Response.json({ error: "handler_failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}

const ref = (v: string | { id: string } | null | undefined) =>
  !v ? null : typeof v === "string" ? v : v.id;

/** Every event we care about boils down to "re-sync this subscription". */
function subscriptionIdFor(event: Stripe.Event): string | null {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return event.data.object.mode === "subscription" ? ref(event.data.object.subscription) : null;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "customer.subscription.paused":
    case "customer.subscription.resumed":
      return event.data.object.id;
    case "invoice.paid":
    case "invoice.payment_failed":
      return ref(event.data.object.parent?.subscription_details?.subscription);
    default:
      return null;
  }
}
