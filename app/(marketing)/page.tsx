import Link from "next/link";
import { getTestimonials, getJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";

const FEATURES = [
  { icon: "🎯", title: "Visa-aware job board", body: "Every role flagged for Graduate Route and Skilled Worker sponsorship, so you never waste an application." },
  { icon: "🧭", title: "Employer insights", body: "Know which employers truly sponsor, their timelines, and insider tips before you apply." },
  { icon: "🤝", title: "Mentors", body: "Learn from people who made the exact journey you're on — country to career." },
  { icon: "📄", title: "AI CV coach", body: "Get your CV scored and rewritten for UK employers and ATS — in under a minute.", soon: true },
  { icon: "💬", title: "AI career adviser", body: "Plain-English answers on visas, applications, and switching to Skilled Worker.", soon: true },
  { icon: "🎤", title: "Interview prep", body: "Practice real questions with feedback tailored to international candidates.", soon: true },
];

export default async function HomePage() {
  const [testimonials, jobs] = await Promise.all([getTestimonials(), getJobs()]);
  const jobCount = jobs.length;

  return (
    <>
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar_url} alt="" className="size-9 rounded-full bg-slate-200" />
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
