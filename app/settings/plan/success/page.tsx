import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircleIcon, ClockIcon } from "@/components/icons";
import { syncSubscription } from "@/lib/billing";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/supabase/auth";

export const metadata: Metadata = { title: "Welcome aboard", robots: { index: false } };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/settings/plan");
  if (!session_id || !isStripeConfigured()) redirect("/settings/plan");

  let plan: string | null = null;
  let confirmed = false;
  let ownedByUser = true;
  try {
    const session = await getStripe().checkout.sessions.retrieve(session_id);
    // Only the user who started this checkout may view it.
    ownedByUser = session.client_reference_id === user.id;
    plan = session.metadata?.plan ?? null;

    if (ownedByUser && session.status === "complete" && typeof session.subscription === "string") {
      // Don't wait for the webhook — apply the upgrade now so the app
      // reflects it immediately. The webhook will re-sync idempotently.
      await syncSubscription(session.subscription);
      confirmed = true;
    }
  } catch (err) {
    console.error("[billing] success page sync failed", err);
  }
  if (!ownedByUser) redirect("/settings/plan");

  const planName = plan === "premium" ? "Premium" : plan === "pro" ? "Pro" : "your new plan";

  return (
    <main className="container-x flex max-w-xl flex-col items-center py-16 text-center">
      {confirmed ? (
        <CheckCircleIcon className="size-14 text-emerald-600" />
      ) : (
        <ClockIcon className="size-14 text-slate-400" />
      )}
      <h1 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {confirmed ? `You're on ${planName} 🎉` : "Payment received — finishing up"}
      </h1>
      <p className="mt-3 text-slate-600">
        {confirmed
          ? "Your upgrade is active right now. A receipt is on its way to your inbox."
          : "We're confirming your subscription with Stripe. This usually takes a few seconds — refresh this page or check Plan & billing shortly."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/dashboard" className="btn-primary h-11 px-6 text-sm">
          Go to dashboard
        </Link>
        <Link href="/settings/plan" className="btn-outline h-11 px-6 text-sm">
          View plan &amp; billing
        </Link>
      </div>
    </main>
  );
}
