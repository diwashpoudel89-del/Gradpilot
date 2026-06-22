import Link from "next/link";
import type { Metadata } from "next";
import { getPricingPlans } from "@/lib/queries";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Pricing", description: "Simple, transparent pricing. Start free." };

const FALLBACK = [
  { id: "free", plan_name: "Free", monthly_price: 0, annual_price: 0, tagline: "Everything you need to get started", features: ["Visa-aware job board", "Save & track jobs", "Blog & guides"], is_featured: false, badge_text: null, cta_text: "Get started" },
  { id: "pro", plan_name: "Pro", monthly_price: 9.99, annual_price: 99.99, tagline: "For serious job seekers on a deadline", features: ["Everything in Free", "AI CV coach", "Interview prep", "Employer insights"], is_featured: true, badge_text: "Most popular", cta_text: "Upgrade to Pro" },
];

export default async function PricingPage() {
  const fromDb = await getPricingPlans();
  const plans = fromDb.length ? fromDb : FALLBACK;

  return (
    <div className="container-x py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-2 text-slate-600">Start free. Upgrade when you&apos;re ready. Early members get 3 months of Pro free.</p>
      </header>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`card flex flex-col p-6 ${p.is_featured ? "ring-2 ring-brand-500" : ""}`}>
            {(p.badge_text || p.is_featured) && (
              <span className="badge w-fit bg-brand-50 text-brand-700">{p.badge_text ?? "Most popular"}</span>
            )}
            <h2 className="mt-3 font-display text-xl font-bold text-slate-900">{p.plan_name}</h2>
            {p.tagline && <p className="mt-1 text-sm text-slate-600">{p.tagline}</p>}
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-slate-900">£{p.monthly_price ?? 0}</span>
              <span className="text-sm text-slate-500">/mo</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-700">
              {(p.features ?? []).map((f, i) => (
                <li key={i} className="flex gap-2"><span className="text-emerald-600">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/signup" className={`mt-6 h-11 px-5 text-sm ${p.is_featured ? "btn-primary" : "btn-outline"}`}>
              {p.cta_text ?? "Get started"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
