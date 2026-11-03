import Link from "next/link";
import type { Metadata } from "next";
import { AlertIcon, CardIcon, InfoIcon } from "@/components/icons";
import { PlanPicker, type PickerPlan } from "@/components/plan-picker";
import { isStripeConfigured } from "@/lib/stripe";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { getProfile } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { ManageBillingButton } from "./manage-billing-button";

export const metadata: Metadata = { title: "Plan & billing", robots: { index: false } };

type Subscription = {
  plan_type: "free" | "pro" | "premium";
  payment_status: string | null;
  billing_interval: "month" | "year" | null;
  cancel_at_period_end: boolean | null;
  renewal_date: string | null;
  stripe_subscription_id: string | null;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;
  const profile = await getProfile();
  const supabase = await createClient();

  const [{ data: planRows }, { data: subRow }] = await Promise.all([
    supabase
      .from("pricing_plans")
      .select("plan_name, tagline, monthly_price, annual_price, features, is_featured, badge_text")
      .order("display_order"),
    supabase
      .from("subscriptions")
      .select("plan_type, payment_status, billing_interval, cancel_at_period_end, renewal_date, stripe_subscription_id")
      .eq("user_id", profile?.id ?? "")
      .maybeSingle(),
  ]);

  const plans = ((planRows as PickerPlan[]) ?? []).map((p) => ({
    ...p,
    monthly_price: Number(p.monthly_price),
    annual_price: Number(p.annual_price),
  }));
  const sub = subRow as Subscription | null;
  const current = profile?.plan ?? "free";
  const hasActiveSubscription = Boolean(
    sub?.stripe_subscription_id && ["active", "trialing", "past_due"].includes(sub.payment_status ?? "")
  );
  const checkoutEnabled = isStripeConfigured() && isAdminConfigured();

  return (
    <main className="container-x py-10">
      <Link href="/settings" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to settings
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">Plan &amp; billing</h1>
      <p className="mt-1 text-slate-600">
        You&apos;re currently on the <span className="font-medium capitalize text-slate-900">{current}</span> plan.
      </p>

      {checkout === "cancelled" ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />
          <p>Checkout was cancelled — you haven&apos;t been charged. Pick a plan whenever you&apos;re ready.</p>
        </div>
      ) : null}

      {sub?.payment_status === "past_due" ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertIcon className="mt-0.5 size-4 shrink-0" />
          <p>Your last payment failed. Update your card in billing management to keep your {current} features.</p>
        </div>
      ) : null}

      {hasActiveSubscription && sub ? (
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <CardIcon />
            </span>
            <div>
              <p className="font-medium capitalize text-slate-900">
                {sub.plan_type} · {sub.billing_interval === "year" ? "Annual" : "Monthly"}
              </p>
              <p className="text-sm text-slate-600">
                {sub.renewal_date
                  ? sub.cancel_at_period_end
                    ? `Cancels on ${fmtDate(sub.renewal_date)} — you keep access until then.`
                    : `Renews on ${fmtDate(sub.renewal_date)}.`
                  : "Active subscription."}
              </p>
            </div>
          </div>
          <ManageBillingButton />
        </div>
      ) : null}

      <PlanPicker
        plans={plans}
        currentPlan={current}
        hasActiveSubscription={hasActiveSubscription}
        checkoutEnabled={checkoutEnabled}
      />
    </main>
  );
}
