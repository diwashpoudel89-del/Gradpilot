import Link from "next/link";
import {
  Check,
  FileText,
  MessagesSquare,
  Briefcase,
  Gauge,
  ShieldCheck,
  Map,
  PlayCircle,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/sections/faq";
import { FaqJsonLd, ProductJsonLd } from "@/components/structured-data";
import { btnOutline, btnPrimary, cn, sizeLg } from "@/lib/ui";
import { BRAND, FAQS, FEATURES, PLANS, PROBLEMS, SEGMENTS, STEPS } from "@/lib/content";

const FEATURE_ICONS = [FileText, MessagesSquare, Briefcase, Gauge, ShieldCheck, Map];

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-700"
          style={{ width: `${value}%` }}
        />
      </div>
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
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[480px] max-w-5xl rounded-full bg-brand-50 blur-3xl opacity-60"
          />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-semibold text-primary-foreground">
                  New
                </span>
                {BRAND.tagline}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                {BRAND.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{BRAND.heroSubtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                  Get Started Free
                </Link>
                <Link href="/#how-it-works" className={cn(btnOutline, sizeLg)}>
                  <PlayCircle className="size-5" /> Watch Demo
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" /> Free to start
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" /> No card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 text-primary" /> Built for international students
                </span>
              </div>
            </div>

            {/* GradScore dashboard mockup */}
            <div className="relative">
              <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-lift backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Your GradScore™</p>
                    <p className="font-display text-4xl font-extrabold text-gradient">78</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    On track
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <ScoreBar label="Employability" value={82} />
                  <ScoreBar label="Sponsorship readiness" value={71} />
                  <ScoreBar label="Career readiness" value={80} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs text-muted-foreground">Top job match · Sponsors</p>
                    <p className="mt-1 text-sm font-semibold">Graduate Software Engineer</p>
                    <p className="text-xs text-muted-foreground">London · £45,000</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs text-muted-foreground">CV (ATS)</p>
                    <p className="mt-1 font-display text-3xl font-bold text-gradient">A−</p>
                    <p className="text-xs text-muted-foreground">2 fixes suggested</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">GradPath™ next step:</span> Apply to 3
                  sponsoring employers this week and practise 2 interview questions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The problem"
              title="The UK job hunt is a different game for international students"
              sub="You're not lacking talent — you're missing a system built for your situation."
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

        {/* How it works — 6 steps */}
        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="From overwhelmed to hired, in six steps"
              sub="A clear path built around your visa timeline — no lengthy forms, no generic advice."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Core features — 6 cards */}
        <section id="features" className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The platform"
              title="One operating system for your whole journey"
              sub="Six AI-powered tools that work together — from finding sponsorship to staying safe while you relocate."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? FileText;
                return (
                  <div key={f.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">
                      {f.name}
                      {f.trademark && <span className="align-super text-xs">{f.trademark}</span>}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.tagline}</p>
                    <ul className="mt-4 space-y-2">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link href="/tools" className={cn(btnOutline, sizeLg)}>
                Explore all AI tools
              </Link>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section id="who-its-for" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Who it's for"
              title="Built for your stage of the journey"
              sub="Wherever you are on the Graduate Route, GradPilot meets you there."
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
              sub="Start free, forever. Upgrade only when you need unlimited AI and the full toolkit."
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
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              sub="Everything you need to know about GradPilot AI and the Graduate Route."
            />
            <Faq />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your career, on autopilot. Start free today.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join international students using GradPilot AI to find sponsorship, fix their CV, and land
              the offer — built by people who lived every part of this.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                Get Started Free
              </Link>
              <Link href="/founder" className={cn(btnOutline, sizeLg)}>
                Read our story
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <FaqJsonLd faqs={FAQS} />
      <ProductJsonLd />
    </>
  );
}
