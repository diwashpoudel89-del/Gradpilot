import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/sections/faq";
import { FaqJsonLd } from "@/components/structured-data";
import { FAQS } from "@/lib/content";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about GradPilot AI — sponsorship jobs, CV analysis, AI tools, GradScore™, pricing, and support for international students.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">Questions, answered</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Sponsorship jobs, AI tools, pricing, and international-student support.
          </p>
        </div>
        <Faq />
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Still have a question?</p>
          <Link href="/contact" className={cn(btnPrimary, sizeLg, "mt-4")}>
            Contact us
          </Link>
        </div>
      </main>
      <Footer />
      <FaqJsonLd faqs={FAQS} />
    </>
  );
}
