import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on the Graduate Route, UK CVs, visa sponsorship, and landing graduate jobs as an international student.",
  alternates: { canonical: "/blog" },
};

const TOPICS = [
  "Graduate Route",
  "Visa sponsorship",
  "UK CVs",
  "Interviews",
  "Life in the UK",
  "Salaries",
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 text-center sm:px-6 lg:px-8">
            <div className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-primary">
              <Newspaper className="size-7" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">The GradPilot blog</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Honest, practical guides on the Graduate Route, UK CVs, visa sponsorship, and landing
              your first role here. We're writing our first articles now — join the waitlist to get
              them first.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {TOPICS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/waitlist" className={cn(btnPrimary, sizeLg)}>
                Get notified
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
