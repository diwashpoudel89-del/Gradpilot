import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of GradPilot AI.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Agreement</h2>
            <p className="mt-2">
              These terms govern your access to and use of GradPilot AI, operated by GradPilot AI
              Ltd. By joining the waitlist or using the service you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">The service</h2>
            <p className="mt-2">
              GradPilot AI provides career tools for international students in the UK, including
              visa-aware job matching, CV coaching, interview preparation, and Graduate Route
              guidance. The product is currently in pre-launch; features and pricing may change
              before general availability.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Not legal or immigration advice</h2>
            <p className="mt-2">
              GradPilot AI provides general information and AI-assisted guidance. It is not a
              substitute for professional legal, immigration, or financial advice. Always verify
              visa-related decisions against official UK Government (GOV.UK) guidance or a qualified
              adviser.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Acceptable use</h2>
            <p className="mt-2">
              You agree to provide accurate information, to use the service lawfully, and not to
              misuse, disrupt, or attempt to gain unauthorised access to the platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Liability</h2>
            <p className="mt-2">
              The service is provided "as is" during pre-launch. To the fullest extent permitted by
              law, GradPilot AI Ltd is not liable for outcomes of job applications or visa decisions.
              Nothing in these terms limits liability that cannot be limited under UK law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Email{" "}
              <a className="text-primary underline" href="mailto:hello@gradpilotai.com">
                hello@gradpilotai.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
