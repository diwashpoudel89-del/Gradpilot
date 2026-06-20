import type { Metadata } from "next";
import Link from "next/link";
import {
  Stamp,
  Briefcase,
  ShieldCheck,
  Home,
  Landmark,
  HeartPulse,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Resource Hub",
  description:
    "Guides for international students in the UK: student visas, sponsorship, UK jobs, accommodation, banking, NHS registration, student finance, and career development.",
  alternates: { canonical: "/resources" },
};

const CATEGORIES = [
  { icon: Stamp, title: "Student visas", body: "Graduate Route, Skilled Worker, and switching between them." },
  { icon: Briefcase, title: "UK jobs", body: "Where to look, how to apply, and what UK recruiters expect." },
  { icon: ShieldCheck, title: "Sponsorship guidance", body: "Who sponsors, how to ask, and reading the sponsor register." },
  { icon: Home, title: "Accommodation", body: "Finding a place, deposits, and avoiding rental scams." },
  { icon: Landmark, title: "Banking", body: "Opening a UK bank account as a new arrival." },
  { icon: HeartPulse, title: "NHS registration", body: "Registering with a GP and using the NHS." },
  { icon: PiggyBank, title: "Student finance", body: "Budgeting, costs, and managing money in the UK." },
  { icon: TrendingUp, title: "Career development", body: "Building employability and growing once you're hired." },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Resource Hub</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Honest, practical guides for life and work in the UK
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything an international student needs to navigate visas, jobs, money, and settling in —
              written in plain English.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {CATEGORIES.map((c) => (
              <Link
                key={c.title}
                href="/blog"
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-primary">
                  <c.icon className="size-5" />
                </span>
                <h2 className="mt-3 font-display text-base font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card/60 p-8">
              <h2 className="font-display text-2xl font-bold">New guides every week</h2>
              <p className="mt-2 text-muted-foreground">
                Create a free account and we'll point you to the right resources for your stage — and
                notify you as new guides go live.
              </p>
              <Link href="/signup" className={cn(btnPrimary, sizeLg, "mt-6")}>
                Get Started Free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
