import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail, Fact, LegalPage, LegalTable, ToConfirm } from "@/components/legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GradPilot AI collects, uses and protects your personal data under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      current="/privacy"
      summary="This policy explains what personal data GradPilot AI collects, why we use it, who we share it with and the rights you have under UK data protection law."
    >
      <h2>1. Who we are</h2>
      <p>
        GradPilot AI is operated by <strong>{LEGAL.companyName}</strong>, a company registered in{" "}
        <ToConfirm>country of registration</ToConfirm> with company number{" "}
        <Fact value={LEGAL.companyNumber} label="company number" />, whose registered office is at{" "}
        <Fact value={LEGAL.registeredAddress} label="registered office address" />. We are the{" "}
        <strong>controller</strong> of the personal data described in this policy, which means we
        decide how and why it is used.
      </p>
      <p>
        ICO registration number: <Fact value={LEGAL.icoRegistration} label="ICO data protection fee registration" />.
        For any privacy question or request, contact us at <ContactEmail />.
      </p>

      <h2>2. The personal data we collect</h2>
      <p>We only collect the data needed to run the features that are currently available.</p>
      <ul>
        <li>
          <strong>Account data</strong> — your name, email address and password when you create an
          account. Passwords are stored by our authentication provider in hashed form; we never see
          them.
        </li>
        <li>
          <strong>Sign-in and security data</strong> — the cookies that keep you signed in (see our{" "}
          <Link href="/cookies">Cookie Policy</Link>), and technical data such as your IP address,
          browser type and the time of sign-in requests, which our hosting and authentication
          providers record in their logs.
        </li>
        <li>
          <strong>Waitlist data</strong> — if you join the waitlist: your name, email address and,
          optionally, your university.
        </li>
        <li>
          <strong>Subscription and payment data</strong> — if you buy a paid plan, Stripe collects
          your payment card details and billing details (such as name, email and billing address).
          We do <strong>not</strong> receive or store your full card number. We store your Stripe
          customer reference, the email used at checkout, your plan, billing period (monthly or
          annual), subscription status, renewal and cancellation dates.
        </li>
        <li>
          <strong>Emails we send you</strong> — to send account emails (such as sign-up confirmation
          and password reset), our email provider processes your email address and the content of
          the message.
        </li>
        <li>
          <strong>Messages you send us</strong> — if you contact us, the content of your message and
          your contact details.
        </li>
      </ul>
      <p>
        <strong>Features in development.</strong> Our database is designed to support future
        features such as a career profile (for example university, degree, target roles, visa type
        and visa expiry date), CV and cover-letter tools, interview practice, job alerts and AI
        chat. These features are not yet available and we do not currently collect this data. We
        will update this policy before we do. See also our{" "}
        <Link href="/ai-disclaimer">AI Disclaimer</Link>.
      </p>
      <p>
        We do not intentionally collect special category data (such as health, religion or ethnic
        origin). Please do not include it in anything you send us.
      </p>

      <h2>3. How and why we use your data</h2>
      <LegalTable
        head={["Purpose", "Data used", "Lawful basis (UK GDPR)"]}
        rows={[
          ["Create and run your account, sign you in, and keep it secure", "Account data, sign-in and security data", "Contract — to provide the service you signed up for"],
          ["Send essential account emails (confirmation, password reset)", "Email address", "Contract"],
          ["Take payment, manage your subscription, renewals, plan changes and cancellations", "Subscription and payment data", "Contract"],
          ["Keep financial and tax records", "Subscription and payment data", "Legal obligation"],
          ["Manage the waitlist and tell you when GradPilot AI launches", "Waitlist data", <>Consent / legitimate interests <ToConfirm>which basis applies to the waitlist</ToConfirm></>],
          ["Prevent fraud and abuse, and protect the service", "Sign-in and security data, payment data", "Legitimate interests — keeping the service and our users safe"],
          ["Answer your questions and requests", "Messages you send us", "Legitimate interests / contract"],
        ]}
      />
      <p>
        We do not send marketing emails without your consent, we do not sell your personal data, and
        we do not use your data for advertising. We do not make decisions about you based solely on
        automated processing that have legal or similarly significant effects.
      </p>

      <h2>4. Who we share your data with</h2>
      <p>
        We use the following service providers. They process personal data on our behalf and under
        contract, except where stated.
      </p>
      <LegalTable
        head={["Provider", "What they do for us", "Data involved"]}
        rows={[
          ["Supabase", "Authentication (accounts, sign-in) and our database. Our production database is hosted in the EU (Ireland region).", "Account, waitlist and subscription data; sign-in logs"],
          ["Vercel", "Hosts and serves the website and its server code", "Technical data such as IP address and browser information in request logs"],
          ["Stripe", "Payments, subscriptions, invoices and the billing portal. Stripe also acts as an independent controller for some purposes, such as fraud prevention and meeting its own legal obligations.", "Payment and billing data"],
          ["Resend", "Delivers account emails (via our authentication provider)", "Email address and message content"],
          ["Anthropic", "Will provide AI features once they launch. Not used on the live service today.", "None at present — see our AI Disclaimer"],
        ]}
      />
      <p>
        We may also disclose data if required by law, or to protect our rights or the safety of
        others, and to a buyer or successor if our business is reorganised or sold.
      </p>

      <h2>5. International transfers</h2>
      <p>
        Some of our providers are based in, or use sub-processors in, the United States and other
        countries outside the UK. Where personal data is transferred outside the UK, we rely on UK
        adequacy regulations (including the UK Extension to the EU–US Data Privacy Framework where
        the provider is certified) or the UK International Data Transfer Agreement / Addendum, as
        offered in each provider&apos;s data processing terms.{" "}
        <ToConfirm>the transfer mechanism in each provider&apos;s signed data processing agreement</ToConfirm>
      </p>

      <h2>6. How long we keep your data</h2>
      <ul>
        <li>
          <strong>Account data</strong> is kept while your account is open. When you delete your
          account from <em>Settings</em>, we delete your profile and the data linked to your account
          in our database, and your sign-in account.
        </li>
        <li>
          <strong>Subscription and payment records</strong> are kept by Stripe and by us for as long
          as needed to meet tax and accounting obligations <ToConfirm>retention period for financial records</ToConfirm>.
        </li>
        <li>
          <strong>Waitlist entries</strong> are not removed when you delete an account. You can ask us
          to delete them at any time <ToConfirm>retention period for waitlist entries</ToConfirm>.
        </li>
        <li>
          <strong>Logs</strong> held by our hosting and authentication providers are kept for the
          periods set by those providers.
        </li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data erased;</li>
        <li>restrict or object to how we use your data (including where we rely on legitimate interests);</li>
        <li>receive your data in a portable format;</li>
        <li>withdraw consent at any time, where we rely on consent.</li>
      </ul>
      <p>
        You can delete your account yourself from <em>Settings</em>. For any other request, contact
        us at <ContactEmail />. We will respond within one month, as required by law. You also have
        the right to complain to the Information Commissioner&apos;s Office (ICO) at{" "}
        <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer" target="_blank">ico.org.uk</a>.
        We&apos;d appreciate the chance to help first.
      </p>

      <h2>8. Security</h2>
      <p>
        Data is encrypted in transit (HTTPS). Access to account data in our database is restricted
        by row-level security rules so that signed-in users can only access their own records, and
        payment card details are handled by Stripe, not by us. No system is completely secure, so
        please use a strong, unique password.
      </p>

      <h2>9. Children</h2>
      <p>
        GradPilot AI is designed for university students and graduates and is not intended for
        children. <ToConfirm>minimum age to use the service</ToConfirm>
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We will update this policy when our services or the way we use data change (for example,
        before launching AI features). We will show the date of the latest version at the top of this
        page and, where changes are significant, let account holders know before they take effect.
      </p>
    </LegalPage>
  );
}
