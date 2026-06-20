import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Founder Story",
  description:
    "Why GradPilot AI exists — built by an international student who lived the UK job hunt, the scams, and the visa pressure, and decided to fix it with AI.",
  alternates: { canonical: "/founder" },
};

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Founder Story</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Built from the international student experience — to fix it
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            GradPilot AI started with a frustration thousands of international students share. Arriving
            in the UK, our founder faced a maze with no map: understanding how the UK system actually
            works, finding accommodation without falling for scams, navigating banking, the NHS, and
            student finance, and — hardest of all — finding a job that would sponsor a visa.
          </p>
          <p>
            The talent was never the problem. The problem was the absence of a system built for
            <em> this</em> situation: a CV in the wrong format for UK recruiters, job boards that never
            told you who actually sponsors, and a two-year Graduate Route clock ticking the whole time.
          </p>
          <p>
            GradPilot AI was created to turn that maze into a guided path — to give every international
            student the co-pilot the founder wished they'd had.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Our mission</h2>
            <p className="mt-2 text-muted-foreground">
              Give every international student an unfair advantage in building a career abroad — with
              AI that understands their visa, their CV, and their market.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Our vision</h2>
            <p className="mt-2 text-muted-foreground">
              To become the AI operating system for international students worldwide — from landing the
              first sponsored job to thriving in a new country.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">The roadmap ahead</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• Deeper GradScore™ insights and benchmarking against successful candidates</li>
              <li>• GradShield™ scam protection for accommodation and offers</li>
              <li>• GradPath™ relocation and career roadmaps for more countries</li>
              <li>• Employer partnerships that hire international talent directly</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-base font-medium">— Diwash Poudel, Founder &amp; CEO, GradPilot AI Ltd</p>
          <Link href="/signup" className={cn(btnPrimary, sizeLg, "mt-6")}>
            Join the mission — start free
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
