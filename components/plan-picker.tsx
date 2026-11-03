"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckIcon, LockIcon, SpinnerIcon } from "@/components/icons";
import { openBillingPortal, startCheckout, type BillingState } from "@/app/settings/plan/actions";

export type PickerPlan = {
  plan_name: string;
  tagline: string | null;
  monthly_price: number;
  annual_price: number;
  features: string[] | null;
  is_featured: boolean | null;
  badge_text: string | null;
};

type Props = {
  plans: PickerPlan[];
  currentPlan: "free" | "pro" | "premium";
  hasActiveSubscription: boolean;
  checkoutEnabled: boolean;
};

function gbp(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(Math.round(value * 100) / 100);
}

export function PlanPicker({ plans, currentPlan, hasActiveSubscription, checkoutEnabled }: Props) {
  const [interval, setInterval] = useState<"month" | "year">("year");
  const [checkoutState, checkoutAction] = useActionState<BillingState, FormData>(startCheckout, null);
  const [portalState, portalAction] = useActionState<BillingState, FormData>(openBillingPortal, null);
  const error = checkoutState?.error ?? portalState?.error;

  const maxSaving = Math.max(
    0,
    ...plans
      .filter((p) => p.monthly_price > 0)
      .map((p) => Math.round((1 - p.annual_price / (p.monthly_price * 12)) * 100))
  );

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-soft">
          {(["month", "year"] as const).map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={interval === i}
              onClick={() => setInterval(i)}
              className={`flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                interval === i ? "bg-brand-500 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {i === "month" ? "Monthly" : "Annual"}
              {i === "year" && maxSaving > 0 ? (
                <span className={`rounded-full px-2 py-0.5 text-xs ${interval === "year" ? "bg-white/20" : "bg-emerald-50 text-emerald-700"}`}>
                  Save up to {maxSaving}%
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p role="alert" className="mx-auto mt-5 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const key = plan.plan_name.toLowerCase();
          const isFree = plan.monthly_price === 0;
          const isCurrent = key === currentPlan;
          const perMonth = interval === "year" ? plan.annual_price / 12 : plan.monthly_price;
          const saving = isFree ? 0 : plan.monthly_price * 12 - plan.annual_price;

          return (
            <div key={plan.plan_name} className={`card relative flex flex-col p-6 ${plan.is_featured ? "ring-2 ring-brand-500" : ""}`}>
              {plan.badge_text ? (
                <span className="badge absolute -top-3 left-6 bg-brand-50 text-brand-700">{plan.badge_text}</span>
              ) : null}
              <h3 className="font-display text-xl font-bold text-slate-900">{plan.plan_name}</h3>
              <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>

              <div className="mt-4 flex items-end gap-1.5">
                <span className="text-3xl font-extrabold text-slate-900">{isFree ? "Free" : gbp(perMonth)}</span>
                {!isFree ? <span className="pb-1 text-sm text-slate-500">/mo</span> : null}
              </div>
              <p className="mt-1 h-5 text-xs text-slate-500">
                {isFree
                  ? "No card needed"
                  : interval === "year"
                    ? `${gbp(plan.annual_price)} billed yearly · save ${gbp(saving)}`
                    : "Billed monthly · cancel anytime"}
              </p>

              <div className="mt-5">
                {isCurrent ? (
                  <span className="flex h-11 w-full items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-500">
                    Current plan
                  </span>
                ) : isFree ? (
                  hasActiveSubscription ? (
                    <form action={portalAction}>
                      <SubmitButton featured={false}>Downgrade in billing portal</SubmitButton>
                    </form>
                  ) : (
                    <span className="flex h-11 w-full items-center justify-center rounded-full border border-slate-200 text-sm text-slate-500">
                      Included
                    </span>
                  )
                ) : !checkoutEnabled ? (
                  <button type="button" disabled className="btn-primary h-11 w-full text-sm">
                    Available at launch
                  </button>
                ) : hasActiveSubscription ? (
                  <form action={portalAction}>
                    <SubmitButton featured={Boolean(plan.is_featured)}>Switch to {plan.plan_name}</SubmitButton>
                  </form>
                ) : (
                  <form action={checkoutAction}>
                    <input type="hidden" name="plan" value={key} />
                    <input type="hidden" name="interval" value={interval} />
                    <SubmitButton featured={Boolean(plan.is_featured)}>Upgrade to {plan.plan_name}</SubmitButton>
                  </form>
                )}
              </div>

              <ul className="mt-6 space-y-2.5">
                {(plan.features ?? []).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-sm text-slate-500">
        <LockIcon />
        {checkoutEnabled
          ? "Secure payment by Stripe. Prices in GBP. Cancel anytime — you keep access until the end of your billing period."
          : "Secure card payments (Stripe) arrive with launch."}
      </p>
    </div>
  );
}

function SubmitButton({ children, featured }: { children: React.ReactNode; featured: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${featured ? "btn-primary" : "btn-outline"} h-11 w-full text-sm`}>
      {pending ? <SpinnerIcon /> : null}
      {pending ? "Redirecting to Stripe…" : children}
    </button>
  );
}
