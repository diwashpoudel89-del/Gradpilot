import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GradPilot AI Ltd collects, uses, and protects your personal data under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="prose-gradpilot mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Who we are</h2>
            <p className="mt-2">
              GradPilot AI Ltd ("GradPilot", "we", "us") is a company registered in England &amp;
              Wales. We are the data controller for the personal data described in this policy. For
              any privacy question, contact us at{" "}
              <a className="text-primary underline" href="mailto:hello@gradpilotai.com">
                hello@gradpilotai.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">What we collect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Waitlist details you give us: your name and email address.</li>
              <li>
                If you create an account at launch: profile details (degree, visa type, target
                roles), CV content you upload, and your application activity.
              </li>
              <li>Basic, privacy-friendly usage analytics (aggregated, cookieless).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">How we use it &amp; our lawful basis</h2>
            <p className="mt-2">
              We use your data to operate the waitlist, deliver the service you request, and improve
              the product. Our lawful bases under UK GDPR are consent (waitlist communications),
              contract (providing the service), and legitimate interests (product improvement and
              security).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Sharing &amp; storage</h2>
            <p className="mt-2">
              We never sell your data and never share it with third parties without your explicit
              consent. We use trusted processors (e.g. our hosting and database providers) under
              data-processing agreements. Data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Your rights</h2>
            <p className="mt-2">
              You can access, correct, export, or delete your data, and withdraw consent at any time
              by emailing{" "}
              <a className="text-primary underline" href="mailto:hello@gradpilotai.com">
                hello@gradpilotai.com
              </a>
              . You also have the right to complain to the UK Information Commissioner's Office (ICO).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
