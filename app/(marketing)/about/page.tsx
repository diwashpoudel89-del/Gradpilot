import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GradPilot AI — Built by international students, for international students",
  description:
    "GradPilot AI was founded by an international student who faced every UK visa and job-search challenge the platform solves. Learn our mission to help every international graduate in the UK land the right job.",
  alternates: { canonical: "/about" },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://gradpilotai.com/#organization",
  name: "GradPilot AI",
  url: "https://gradpilotai.com",
  logo: { "@type": "ImageObject", url: "https://gradpilotai.com/logo.jpg" },
  foundingDate: "2024",
  description:
    "GradPilot AI is a career platform built for international students and graduates in the UK. It provides visa-aware job listings, AI CV coaching, interview preparation, and Graduate Route guidance.",
  knowsAbout: [
    "Graduate Route visa UK",
    "Skilled Worker visa sponsorship",
    "UK job search for international students",
    "CV coaching for UK employers",
    "Graduate jobs UK",
  ],
  areaServed: { "@type": "Country", name: "United Kingdom" },
  audience: {
    "@type": "Audience",
    audienceType: "International students and graduates in the UK",
  },
};

const STATS = [
  { label: "Visa-aware jobs listed", value: "100+" },
  { label: "UK employers tracked", value: "50+" },
  { label: "Mentors from your journey", value: "Growing" },
  { label: "Countries represented", value: "30+" },
];

const VALUES = [
  {
    title: "Visa-first, always",
    body: "Every job, every piece of advice, every feature is designed with your visa status in mind. We never show you roles that ignore your right to work.",
  },
  {
    title: "Built on real experience",
    body: "Our founder navigated the exact maze you're in — confused by Graduate Route rules, rejected by ATS systems that don't account for international CVs, and racing against a visa deadline.",
  },
  {
    title: "Plain English, not legal jargon",
    body: "UK immigration law is complex. We translate it into actionable steps. When the rules change, we update our guidance — no outdated forum posts.",
  },
  {
    title: "Honest about what we don't know",
    body: "We're a career platform, not immigration lawyers. When a question needs professional legal advice, we say so — and point you to the right resources.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-x py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />

      <div className="mx-auto max-w-3xl">
        {/* Mission */}
        <header>
          <span className="badge bg-brand-50 text-brand-700">Our mission</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
            We&apos;re not just building for international students.{" "}
            <span className="text-brand-600">We are international students.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            GradPilot AI was founded by an international student who faced every challenge this platform solves —
            confusing visa rules, rejected CVs, missed deadlines, and a job market that wasn&apos;t built for them.
          </p>
        </header>

        {/* Story */}
        <div className="mt-10 space-y-5 text-slate-700">
          <p>
            After graduating from a UK university, our founder discovered the hard way that the UK graduate job market
            has an invisible barrier for international students: most job boards don&apos;t flag visa sponsorship, most
            CV advice ignores how UK employers read international applications, and the Graduate Route deadline is
            always ticking in the background.
          </p>
          <p>
            The tools that existed were either built for domestic students or too generic to be useful under a
            visa deadline. So we built GradPilot AI — a platform where every feature is designed with your right to
            work in mind.
          </p>
          <p>
            Our mission is simple:{" "}
            <strong className="text-slate-900">
              help every international graduate in the UK land the right job, faster — regardless of their background,
              university, or visa status.
            </strong>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <div className="font-display text-2xl font-extrabold text-brand-600">{s.value}</div>
              <div className="mt-1 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">What we stand for</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What GradPilot AI does — GEO entity clarity */}
        <section className="mt-14 rounded-2xl bg-brand-50 p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">What GradPilot AI does</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="mt-0.5 text-brand-600">✓</span>
              <span><strong>Visa-aware job board</strong> — every role flagged for Graduate Route and Skilled Worker sponsorship eligibility</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-brand-600">✓</span>
              <span><strong>Employer insights</strong> — which UK companies actually use their sponsor licence for new graduates, with timelines and tips</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-brand-600">✓</span>
              <span><strong>Mentors</strong> — connect with people who made the same journey and are now working in the UK</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-brand-600">✓</span>
              <span><strong>AI CV coaching</strong> — get your CV scored and rewritten for UK employers and ATS systems <em>(coming soon)</em></span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-brand-600">✓</span>
              <span><strong>Interview prep</strong> — practice with real questions tailored to international candidates <em>(coming soon)</em></span>
            </li>
          </ul>
        </section>

        <div className="mt-10 flex gap-4">
          <Link href="/signup" className="btn-primary h-11 px-6 text-sm">Join GradPilot AI free</Link>
          <Link href="/jobs" className="btn-outline h-11 px-6 text-sm">Browse jobs</Link>
        </div>
      </div>
    </div>
  );
}
