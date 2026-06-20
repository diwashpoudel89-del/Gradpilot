import type { Metadata } from "next";
import Link from "next/link";
import { Quote, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "How international students use GradPilot AI to find visa-sponsored jobs, fix their CVs, and build careers in the UK.",
  alternates: { canonical: "/success" },
};

const VALUE = [
  {
    title: "From scattered to systematic",
    body: "Students replace dozens of browser tabs and guesswork with one place that knows their visa timeline and target market.",
  },
  {
    title: "Applying where it counts",
    body: "By filtering to sponsoring employers first, members stop wasting their Graduate Route window on dead ends.",
  },
  {
    title: "Interview-ready, faster",
    body: "Scored AI practice and UK-specific CV rewrites help members walk in prepared, not hoping.",
  },
];

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Success Stories</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built for outcomes, not just advice
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              GradPilot AI is early — and growing fast. Here's the difference our members feel, and an
              invitation to be one of the first featured stories.
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
            {VALUE.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Quote className="size-6 text-primary" />
                <h2 className="mt-3 font-display text-lg font-semibold">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center">
              <Sparkles className="mx-auto size-7 text-primary" />
              <h2 className="mt-3 font-display text-2xl font-bold">Be one of our first success stories</h2>
              <p className="mt-2 text-muted-foreground">
                Land a sponsored role with GradPilot AI and we'll feature your journey here to inspire the
                next cohort of international students.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                  Start your journey free
                </Link>
                <Link href="/contact" className="text-sm font-medium text-primary underline">
                  Share your story
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
