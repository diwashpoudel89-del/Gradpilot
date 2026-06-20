import { GradShield } from "@/components/gradshield";

export const dynamic = "force-dynamic";

export default function GradShieldPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">GradShield™</h1>
      <p className="mt-2 text-muted-foreground">
        International students are prime targets for rental fraud. Paste a listing, a landlord's
        messages, or a tenancy agreement and GradShield will score the scam risk and flag the
        warning signs — powered by Claude Opus 4.8.
      </p>
      <div className="mt-8">
        <GradShield />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        GradShield gives guidance, not a guarantee. Never pay a deposit before viewing, and use a
        deposit-protection scheme. If in doubt, walk away.
      </p>
    </div>
  );
}
