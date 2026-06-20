import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { planFromPriceId, stripe } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const tsToIso = (t?: number | null) => (t ? new Date(t * 1000).toISOString() : null);

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createSupabaseAdmin();
  if (!stripe || !secret || !admin) {
    return NextResponse.json({ error: "Billing not configured." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      const userId = s.client_reference_id || s.metadata?.user_id || null;
      const plan = s.metadata?.plan || "pro";
      if (userId) {
        await admin.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: typeof s.customer === "string" ? s.customer : s.customer?.id ?? null,
            stripe_subscription_id:
              typeof s.subscription === "string" ? s.subscription : s.subscription?.id ?? null,
            stripe_email: s.customer_details?.email ?? s.customer_email ?? null,
            plan_type: plan,
            payment_status: "active",
          },
          { onConflict: "user_id" }
        );
        await admin.from("profiles").update({ plan }).eq("id", userId);
      }
    } else if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;
      const periods = sub as unknown as {
        current_period_start?: number;
        current_period_end?: number;
      };
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const { data: row } = await admin
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();
      const userId = row?.user_id;
      const deleted = event.type === "customer.subscription.deleted";
      const plan = deleted ? "free" : planFromPriceId(sub.items.data[0]?.price?.id) ?? "pro";
      const status = deleted ? "canceled" : sub.status;

      if (userId) {
        await admin
          .from("subscriptions")
          .update({
            stripe_subscription_id: sub.id,
            plan_type: plan,
            payment_status: status,
            cancel_at_period_end: sub.cancel_at_period_end ?? false,
            current_period_start: tsToIso(periods.current_period_start),
            current_period_end: tsToIso(periods.current_period_end),
            renewal_date: tsToIso(periods.current_period_end),
          })
          .eq("user_id", userId);
        await admin.from("profiles").update({ plan }).eq("id", userId);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("stripe webhook handler error", err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
