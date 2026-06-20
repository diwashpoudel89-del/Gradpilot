import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  MessagesSquare,
  Briefcase,
  Gauge,
  ShieldCheck,
  Map,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, btnOutline, cn, sizeLg, sizeMd } from "@/lib/ui";

export const metadata: Metadata = {
  title: "AI Tools",
  description:
    "GradPilot AI's toolkit for international students: AI CV Analyzer, AI Interview Coach, Sponsorship Job Finder, GradScore™, GradShield™, and GradPath™.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    icon: FileText,
    name: "AI CV Analyzer",
    tagline: "Turn a home-country CV into a UK-ready, ATS-friendly one.",
    points: [
      "ATS compatibility score out of 100",
      "Specific, prioritised improvement suggestions",
      "Skill-gap analysis against your target role",
      "Instant rewrite and tailored cover letter",
    ],
    status: "Live",
    href: "/signup",
  },
  {
    icon: MessagesSquare,
    name: "AI Interview Coach",
    tagline: "Practise real UK graduate interviews and get scored feedback.",
    points: [
      "Behavioural, technical, and visa-specific questions",
      "Instant feedback on every answer",
      "Performance scoring with strengths and fixes",
      "Model answers tailored to international candidates",
    ],
    status: "Live",
    href: "/signup",
  },
  {
    icon: Briefcase,
    name: "Sponsorship Job Finder",
    tagline: "Only spend time on roles that can keep you in the UK.",
    points: [
      "Every job tagged by Graduate Route / Skilled Worker",
      "Sponsorship-friendly employers surfaced first",
      "Filter by industry, salary, location, experience",
      "Save roles and track applications end-to-end",
    ],
    status: "Live",
    href: "/jobs",
  },
  {
    icon: Gauge,
    name: "GradScore™",
    tagline: "One readiness rating — and a clear plan to raise it.",
    points: [
      "Employability Score",
      "Sponsorship Readiness Score",
      "Career Readiness Score",
      "Personalised actions to improve each",
    ],
    status: "Live",
    href: "/signup",
  },
  {
    icon: ShieldCheck,
    name: "GradShield™",
    tagline: "Spot accommodation scams before they cost you.",
    points: [
      "Analyse listings and landlord messages",
      "Scam-risk score with red-flag explanations",
      "Rental agreement checks",
      "Guidance on deposits and your rights",
    ],
    status: "New",
    href: "/signup",
  },
  {
    icon: Map,
    name: "GradPath™",
    tagline: "Your personalised roadmap from arrival to offer.",
    points: [
      "Step-by-step student & career roadmap",
      "Relocation checklist (bank, NI, GP, address)",
      "Career development plan around your visa timeline",
      "Milestones that update as you progress",
    ],
    status: "New",
    href: "/signup",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">AI Tools</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              The complete AI toolkit for international students
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Six tools that work together as one operating system — from landing sponsorship to
              settling in safely.
            </p>
            <div className="mt-8">
              <Link href="/signup" className={cn(btnPrimary, sizeLg)}>
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:px-8">
            {TOOLS.map((t) => (
              <div key={t.name} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-primary">
                    <t.icon className="size-6" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      t.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-brand-50 text-primary"
                    )}
                  >
                    {t.status}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold">{t.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href={t.href} className={cn(btnOutline, sizeMd)}>
                    Try {t.name.replace("™", "")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
