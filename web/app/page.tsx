import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/sections/faq";
import { FaqJsonLd, ProductJsonLd } from "@/components/structured-data";
import { btnOutline, btnPrimary, cn, sizeLg } from "@/lib/ui";
import { FAQS, FEATURES, PLANS, PROBLEMS, SEGMENTS, STEPS } from "@/lib/content";

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-semibold text-primary-foreground">
                  New
                </span>
                Pre-launch · Join the waitlist
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Your career co-pilot for the UK for international students
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Find visa-sponsoring jobs, fix your CV for UK employers, prep for interviews, and
                stay ahead of your Graduate Route deadline — all in one place, built only for
                international students.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                  Get started free
                </Link>
                <Link href="/#how-it-works" className={cn(btnOutline, sizeLg)}>
                  See how it works
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Free to join · Early members get 3 months of Pro free at launch.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur">
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-xs font-medium text-muted-foreground">Graduate Route</p>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-display text-lg font-bold text-primary">On track</span>
                  <span className="text-sm font-semibold">312 days left</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sample timeline · GradPilot tracks this automatically from your visa date.
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-medium text-muted-foreground">Job match · Sponsors</p>
                  <p className="mt-1 text-sm font-semibold">Graduate Software Engineer</p>
                  <p className="text-xs text-muted-foreground">London · £45,000</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-medium text-muted-foreground">CV score</p>
                  <p className="mt-1 font-display text-3xl font-bold text-gradient">82</p>
                  <p className="text-xs text-muted-foreground">UK-ready</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                2 years to work in the UK on the Graduate Route · 3 years for PhD graduates · any
                employer, no sponsorship needed while it's active.
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The problem"
              title="Job-hunting in the UK is a different game for international students"
              sub="You're not lacking talent — you're missing a system built for your situation. These are the three things that quietly cost graduates their best opportunities."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The platform"
              title="Everything you need, in one co-pilot"
              sub="Seven tools that work together — from finding visa-sponsoring roles to walking into the interview prepared."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold">{f.title}</h3>
                    {f.tag && (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                        {f.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium">{f.lead}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="From overwhelmed to hired, in four steps"
              sub="No lengthy forms or generic advice — a clear path built around your visa timeline."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section id="who-its-for" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Who it's for"
              title="Built for your stage of the journey"
              sub="Wherever you are on the Graduate Route, GradPilot meets you there — with guidance tuned to your situation."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SEGMENTS.map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <p className="mt-3 text-sm leading-relaxed">
                    <span className="font-semibold">The challenge: </span>
                    <span className="text-muted-foreground">{s.challenge}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple pricing that grows with you"
              sub="Start free, forever. Upgrade only when you need unlimited AI and the full toolkit. Cancel anytime."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-3xl border bg-card p-6 shadow-soft",
                    plan.highlight ? "border-primary ring-2 ring-[var(--primary)]/30" : "border-border"
                  )}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-sm text-muted-foreground">/mo</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.note}</p>
                  <Link href="/signup" className={cn(btnPrimary, sizeLg, "mt-5 w-full")}>
                    {plan.cta}
                  </Link>
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Early waitlist members get 3 months of Pro free at launch.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              sub="Everything you need to know about the Graduate Route and how GradPilot helps."
            />
            <Faq />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your Graduate Route clock is ticking. Get a head start.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the waitlist today and lock in 3 months of Pro free at launch. Built by
              international students who lived every part of this.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                Create your account
              </Link>
              <Link href="/about" className={cn(btnOutline, sizeLg)}>
                Read our story
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">— Diwash Poudel, Founder &amp; CEO</p>
          </div>
        </section>
      </main>
      <Footer />

      <FaqJsonLd faqs={FAQS} />
      <ProductJsonLd />
    </>
  );
}
