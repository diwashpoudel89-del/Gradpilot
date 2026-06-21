import type { Metadata } from "next";
import { GradShield } from "@/components/gradshield";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "GradShield" };

export default function GradShieldPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">GradShield™</h1>
      <p className="mt-1 text-slate-600">
        International students are prime targets for rental fraud. Paste a listing, a landlord's
        messages, or a tenancy agreement and GradShield scores the scam risk and flags the warning
        signs — powered by Claude Opus 4.8.
      </p>
      <div className="mt-8"><GradShield /></div>
      <p className="mt-6 text-xs text-slate-500">
        GradShield gives guidance, not a guarantee. Never pay a deposit before viewing, use a
        deposit-protection scheme, and if in doubt, walk away.
      </p>
    </div>
  );
}
