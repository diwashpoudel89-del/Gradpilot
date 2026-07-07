import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTestimonials, getJobs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "GradPilot AI — Visa-aware UK jobs for international students",
  description:
    "GradPilot AI helps international students in the UK find Graduate Route and Skilled Worker visa-sponsoring jobs, get their CV ready, and beat the Graduate Route deadline.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

const FEATURES = [
  { icon: "🎯", title: "Visa-aware job board", body: "Every role flagged for Graduate Route and Skilled Worker sponsorship, so you never waste an application." },
  { icon: "🧭", title: "Employer insights", body: "Know which employers truly sponsor, their timelines, and insider tips before you apply." },
  { icon: "🤝", title: "Mentors", body: "Learn from people who made the exact journey you're on — country to career." },
  { icon: "📄", title: "AI CV coach", body: "Get your CV scored and rewritten for UK employers and ATS — in under a minute.", soon: true },
  { icon: "💬", title: "AI career adviser", body: "Plain-English answers on visas, applications, and switching to Skilled Worker.", soon: true },
  { icon: "🎤", title: "Interview prep", body: "Practice real questions with feedback tailored to international candidates.", soon: true },
];

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gradpilotai.com/#organization",
      name: "GradPilot AI",
      url: "https://gradpilotai.com",
      logo: { "@type": "ImageObject", url: "https://gradpilotai.com/logo.jpg" },
      description:
        "GradPilot AI is the career co-pilot for international students in the UK, providing visa-aware job listings, AI CV coaching, interview preparation, and Graduate Route guidance.",
      sameAs: ["https://gradpilotai.com"],
    },
    {
      "@type": "WebSite",
      "@id": "https://gradpilotai.com/#website",
      url: "https://gradpilotai.com",
      name: "GradPilot AI",
      publisher: { "@id": "https://gradpilotai.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://gradpilotai.com/jobs?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Graduate Route visa in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Graduate Route is a UK post-study work visa that lets international students who completed a degree at a UK university stay and work (or look for work) for 2 years (3 years for PhD graduates). It does not require a job offer and costs £822 as of 2024.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find UK jobs that sponsor a Skilled Worker visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Search on GradPilot AI's visa-aware job board, which flags every role for Graduate Route compatibility and Skilled Worker sponsorship. You can also check the UK government's register of licensed sponsors on the Home Office website.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from a Graduate Route visa to a Skilled Worker visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you find a job with a licensed sponsor willing to issue a Certificate of Sponsorship (CoS), you can switch to a Skilled Worker visa from inside the UK while on the Graduate Route.",
      },
    },
    {
      "@type": "Question",
      name: "What is GradPilot AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GradPilot AI is a career platform built specifically for international students in the UK. It offers visa-aware job listings, AI CV coaching, interview preparation, employer sponsorship insights, and Graduate Route guidance — all in one place at gradpilotai.com.",
      },
    },
  ],
};

export default async function HomePage() {
  const [testimonials, jobs] = await Promise.all([getTestimonials(), getJobs()]);
  const jobCount = jobs.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="container-x py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge bg-white/15 text-white">For international students in the UK 🇬🇧</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Land the right UK job — <span className="text-accent">before your visa clock runs out.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              Visa-aware job matching, AI CV coaching, interview prep and Graduate Route guidance — built for international students, all in one place.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="btn-primary h-12 px-7 text-base">Get started free</Link>
              <Link href="/jobs" className="btn h-12 border border-white/30 bg-white/10 px-7 text-base text-white hover:bg-white/20">
                Browse {jobCount > 0 ? `${jobCount} ` : ""}jobs
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">No credit card required · 3 months of Pro free for early members</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-x py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight">Everything you need to get hired in the UK</h2>
          <p className="mt-3 text-slate-600">The UK job market wasn&apos;t built for international students. GradPilot AI is.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="text-3xl">{f.icon}</div>
                {f.soon && <span className="badge bg-amber-100 text-amber-700">Coming soon</span>}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight">Loved by international graduates</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((t) => (
                <figure key={t.id} className="card flex flex-col p-6">
                  <div className="text-amber-500" aria-hidden>
                    {"★".repeat(Math.max(0, Math.min(5, t.rating ?? 5)))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-sm text-slate-700">“{t.content}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    {t.avatar_url ? (
                      <Image src={t.avatar_url} alt={t.name} width={36} height={36} className="size-9 rounded-full bg-slate-200 object-cover" />
                    ) : (
                      <span className="grid size-9 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.outcome ?? t.university ?? t.course}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Answers — GEO-friendly direct Q&A for AI citation */}
      <section className="container-x py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">Common questions about working in the UK as an international student</h2>
          <dl className="mt-8 space-y-6 divide-y divide-slate-200">
            {[
              {
                q: "What is the Graduate Route visa?",
                a: "The Graduate Route is a UK post-study work visa that allows international students who completed a degree at a UK university to stay and work for 2 years (3 years for PhD graduates). It costs £822 and does not require a job offer — giving you time to job hunt after graduation.",
              },
              {
                q: "How long do I have on the Graduate Route to find a job?",
                a: "You have 2 years (3 for PhD holders) from when your student visa expires. Once you secure a role with a licensed sponsor, you can switch to a Skilled Worker visa from inside the UK before your Graduate Route visa expires.",
              },
              {
                q: "Which UK employers sponsor international graduates?",
                a: "Thousands of employers hold a Skilled Worker sponsor licence — including large firms like Deloitte, KPMG, NHS Trusts, and many tech companies. GradPilot AI's employer insights page shows which ones actually use their licence for new graduate hires, along with timelines and insider tips.",
              },
              {
                q: "How is GradPilot AI different from other job boards?",
                a: "Every job on GradPilot AI is flagged for Graduate Route compatibility and Skilled Worker sponsorship. The platform also provides AI CV coaching tailored to UK employer expectations, interview preparation, and plain-English visa guidance — all in one place.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="pt-6">
                <dt className="font-semibold text-slate-900">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="card overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 p-10 text-center text-white sm:p-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">Ready to land your UK career?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Join GradPilot AI and get visa-aware jobs, CV coaching and interview prep from day one.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="btn-primary h-12 px-7 text-base">Create your free account</Link>
            <Link href="/pricing" className="btn h-12 border border-white/30 bg-white/10 px-7 text-base text-white hover:bg-white/20">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
