import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GradPilot AI collects, uses, and protects your personal data.",
};

const UPDATED = "21 June 2026";

export default function PrivacyPage() {
  return (
    <div className="container-x py-16">
      <article className="prose-gradpilot mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {UPDATED}</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <p>
            This Privacy Policy explains how GradPilot AI Ltd (&ldquo;GradPilot&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and
            protects your personal data when you use gradpilotai.com. We are committed to handling your data in
            line with the UK GDPR and the Data Protection Act 2018.
          </p>

          <Section title="Who we are">
            GradPilot AI Ltd is the data controller for the personal data described in this policy. For any
            privacy questions or to exercise your rights, contact us at{" "}
            <a href="mailto:privacy@gradpilotai.com" className="text-brand-600 hover:underline">privacy@gradpilotai.com</a>.
          </Section>

          <Section title="What we collect">
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Account data:</strong> your name, email address and password (stored securely, hashed).</li>
              <li><strong>Profile data:</strong> information you choose to add such as university, course, and visa status.</li>
              <li><strong>Usage data:</strong> jobs you save, applications you track, and pages you visit.</li>
              <li><strong>Technical data:</strong> IP address, device and browser information, collected via cookies and analytics.</li>
            </ul>
          </Section>

          <Section title="How we use your data">
            <ul className="list-disc space-y-1 pl-5">
              <li>To provide and personalise the GradPilot service.</li>
              <li>To match you with relevant visa-sponsoring jobs and content.</li>
              <li>To send you service updates and, with your consent, marketing communications.</li>
              <li>To improve our product and keep it secure.</li>
            </ul>
          </Section>

          <Section title="Legal bases">
            We process your data on the bases of <strong>contract</strong> (to deliver the service you sign up for),
            <strong> legitimate interests</strong> (to improve and secure the platform), and <strong>consent</strong>
            (for marketing and non-essential cookies, which you can withdraw at any time).
          </Section>

          <Section title="Sharing">
            We use trusted processors to run GradPilot, including Supabase (database &amp; authentication), Vercel
            (hosting), and Stripe (payments). They process data on our instructions under data-processing
            agreements. We never sell your personal data.
          </Section>

          <Section title="Your rights">
            You have the right to access, correct, delete, or export your data, to object to or restrict processing,
            and to withdraw consent. To exercise any of these, email{" "}
            <a href="mailto:privacy@gradpilotai.com" className="text-brand-600 hover:underline">privacy@gradpilotai.com</a>.
            You may also complain to the UK Information Commissioner&rsquo;s Office (ICO).
          </Section>

          <Section title="Retention">
            We keep your data for as long as your account is active and as needed to provide the service. You can
            ask us to delete your account and associated data at any time.
          </Section>

          <p className="text-sm text-slate-500">
            This policy is a starting template and should be reviewed by a qualified professional before public launch.
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
