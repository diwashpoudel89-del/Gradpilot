import type { Metadata } from "next";
import { Mail, Linkedin, Instagram, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GradPilot AI team — support, partnerships, and press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid w-full max-w-5xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">We're here to help</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions about sponsorship jobs, the AI tools, or partnerships? Send us a message and we'll
            get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a href="mailto:hello@gradpilotai.com" className="flex items-center gap-3 text-sm">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-primary">
                <Mail className="size-5" />
              </span>
              hello@gradpilotai.com
            </a>
            <a href="https://linkedin.com/company/gradpilot-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-primary">
                <Linkedin className="size-5" />
              </span>
              LinkedIn
            </a>
            <a href="https://instagram.com/gradpilotai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-primary">
                <Instagram className="size-5" />
              </span>
              Instagram
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-primary">
                <LifeBuoy className="size-5" />
              </span>
              Members can also reach support from inside the app.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h2 className="font-display text-xl font-bold">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We typically reply within 1–2 working days.</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
