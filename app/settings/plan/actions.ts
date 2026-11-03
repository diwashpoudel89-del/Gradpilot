"use server";

import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { getOrCreateCustomer } from "@/lib/billing";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { getCurrentUser, getProfile } from "@/lib/supabase/auth";
import {
  getPriceId,
  getStripe,
  isInterval,
  isPaidPlan,
  isStripeConfigured,
  siteUrl,
} from "@/lib/stripe";

export type BillingState = { error?: string } | null;

const ACTIVE = ["active", "trialing", "past_due"];

/** Create a Stripe Checkout Session for a paid plan and send the user to it. */
export async function startCheckout(
  _prev: BillingState,
  formData: FormData
): Promise<BillingState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/settings/plan");

  if (!isStripeConfigured() || !isAdminConfigured()) {
    return { error: "Online payments aren't switched on yet. Please try again soon." };
  }

  const plan = formData.get("plan");
  const interval = formData.get("interval");
  if (!isPaidPlan(plan) || !isInterval(interval)) {
    return { error: "Please choose a plan and billing period." };
  }

  let url: string | null;
  try {
    // Existing subscribers change plan in the billing portal, never via a
    // second checkout (which would double-charge them).
    const { data: existing } = await createAdminClient()
      .from("subscriptions")
      .select("payment_status, stripe_subscription_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing?.stripe_subscription_id && ACTIVE.includes(existing.payment_status)) {
      return openPortal(user.id);
    }

    const profile = await getProfile();
    const [customer, price] = await Promise.all([
      getOrCreateCustomer(user, profile?.full_name),
      getPriceId(plan, interval),
    ]);

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      subscription_data: {
        metadata: { user_id: user.id, plan },
        description: `GradPilot AI ${plan === "pro" ? "Pro" : "Premium"} (${interval === "year" ? "annual" : "monthly"})`,
      },
      metadata: { user_id: user.id, plan, interval },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_update: { address: "auto", name: "auto" },
      locale: "en-GB",
      success_url: `${siteUrl()}/settings/plan/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/settings/plan?checkout=cancelled`,
      custom_text: {
        submit: {
          message:
            "Cancel anytime from Plan & billing. By subscribing you agree to the GradPilot AI Terms of Service.",
        },
      },
    };
    if (process.env.STRIPE_AUTOMATIC_TAX === "true") {
      params.automatic_tax = { enabled: true };
      params.tax_id_collection = { enabled: true };
    }

    const session = await getStripe().checkout.sessions.create(params);
    url = session.url;
  } catch (err) {
    console.error("[billing] checkout failed", err);
    return { error: "We couldn't start checkout. Please try again in a moment." };
  }

  if (!url) return { error: "We couldn't start checkout. Please try again." };
  redirect(url);
}

/** Open the Stripe Customer Portal (update card, invoices, switch or cancel plan). */
export async function openBillingPortal(): Promise<BillingState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/settings/plan");
  if (!isStripeConfigured() || !isAdminConfigured()) {
    return { error: "Billing management isn't available yet." };
  }
  return openPortal(user.id);
}

async function openPortal(userId: string): Promise<BillingState> {
  let url: string;
  try {
    const { data } = await createAdminClient()
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();
    if (!data?.stripe_customer_id) return { error: "No billing account found yet." };

    const session = await getStripe().billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      return_url: `${siteUrl()}/settings/plan`,
      configuration: process.env.STRIPE_PORTAL_CONFIGURATION || undefined,
      locale: "en-GB",
    });
    url = session.url;
  } catch (err) {
    console.error("[billing] portal failed", err);
    return { error: "We couldn't open billing management. Please try again." };
  }
  redirect(url);
}
