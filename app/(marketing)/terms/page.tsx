import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of GradPilot AI.",
};

const UPDATED = "21 June 2026";

export default function TermsPage() {
  return (
    <div className="container-x py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {UPDATED}</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <p>
            These Terms govern your use of gradpilotai.com, operated by GradPilot AI Ltd. By creating an account or
            using the service, you agree to these Terms.
          </p>

          <Section title="The service">
            GradPilot provides career tools and information for international students and graduates in the UK,
            including a job board, employer insights, guides, and (where available) AI-assisted features. Information
            on the platform is provided for general guidance and is <strong>not legal or immigration advice</strong>.
            Always verify visa and sponsorship details with official UK Government sources.
          </Section>

          <Section title="Your account">
            You are responsible for keeping your login details secure and for activity under your account. You must
            provide accurate information and be at least 16 years old to use GradPilot.
          </Section>

          <Section title="Acceptable use">
            You agree not to misuse the service, including scraping, attempting to breach security, uploading
            unlawful content, or using GradPilot to harass others.
          </Section>

          <Section title="Subscriptions &amp; payments">
            Paid plans are billed through Stripe. Prices and features are described on our pricing page. You can
            cancel at any time; cancellation stops future billing and takes effect at the end of the current period.
          </Section>

          <Section title="Content &amp; intellectual property">
            GradPilot and its content are owned by GradPilot AI Ltd. You retain ownership of content you upload (such
            as your CV) and grant us a licence to process it solely to provide the service to you.
          </Section>

          <Section title="Disclaimers &amp; liability">
            The service is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for indirect or
            consequential loss, or for decisions you make based on information provided through the platform.
          </Section>

          <Section title="Changes">
            We may update these Terms. We&rsquo;ll notify you of material changes, and continued use after changes means
            you accept the updated Terms.
          </Section>

          <p className="text-sm text-slate-500">
            This document is a starting template and should be reviewed by a qualified professional before public launch.
          </p>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
