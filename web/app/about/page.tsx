import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "GradPilot AI is built by international students who lived the UK Graduate Route journey — to give the next cohort the system they wish they'd had.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Built by international students, for international students</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            GradPilot AI started with a simple, frustrating truth: international students in the UK
            don't fail for lack of talent — they fail for lack of a system built for their reality.
            The Graduate Route gives you a two-year clock, UK CVs follow rules nobody explains, and
            most job boards never tell you which employers actually sponsor.
          </p>
          <p>
            We lived every part of this. GradPilot AI is the co-pilot we wish we'd had — visa-aware
            job matching, a CV coach that knows what UK employers expect, an AI adviser fluent in
            Graduate Route rules, and mentors who've already made the leap.
          </p>
          <p>
            We're a London-registered company,{" "}
            <span className="font-semibold text-foreground">GradPilot AI Ltd</span>, on a mission to
            help international graduates turn their UK degree into a UK career — before the clock runs
            out.
          </p>
          <p className="text-base">— Diwash Poudel, Founder &amp; CEO</p>
        </div>
        <div className="mt-10">
          <Link href="/waitlist" className={cn(btnPrimary, sizeLg)}>
            Join the waitlist
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
