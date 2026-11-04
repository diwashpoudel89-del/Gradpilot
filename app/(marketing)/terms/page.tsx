import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail, Fact, LegalPage, ToConfirm } from "@/components/legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use GradPilot AI, including paid subscriptions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      current="/terms"
      summary="These terms apply when you use GradPilot AI or buy a subscription. Please read them, together with our Privacy Policy and Refunds & Cancellation Policy."
    >
      <h2>1. About us and these terms</h2>
      <p>
        GradPilot AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by{" "}
        <strong>{LEGAL.companyName}</strong>, company number{" "}
        <Fact value={LEGAL.companyNumber} label="company number" />, registered office{" "}
        <Fact value={LEGAL.registeredAddress} label="registered office address" />. You can contact
        us at <ContactEmail />.
      </p>
      <p>
        By creating an account, joining the waitlist or buying a subscription, you agree to these
        terms. If you are a consumer, nothing in these terms affects your legal rights under UK
        consumer law, including the Consumer Rights Act 2015.
      </p>

      <h2>2. Who can use GradPilot AI</h2>
      <p>
        GradPilot AI is designed for international students and graduates looking for work in the
        UK. You must be at least <ToConfirm>minimum age</ToConfirm> to create an account. You must
        give accurate information and keep your password secure, and you are responsible for
        activity on your account.
      </p>

      <h2>3. The service</h2>
      <p>The features currently available are:</p>
      <ul>
        <li>a jobs board with information on whether roles may offer visa sponsorship;</li>
        <li>employer insights, a mentors directory, a blog, guides and FAQs;</li>
        <li>an account, with plan and billing management.</li>
      </ul>
      <p>
        Other features described on our pricing page — including AI tools, mentor matching, job
        alerts and human support services — are <ToConfirm>which advertised features will be available at launch, and when</ToConfirm>.
      </p>
      <p>
        We may improve or change the service over time. If a change significantly reduces what you
        have paid for, you can cancel, and you keep your rights under consumer law{" "}
        <ToConfirm>whether you offer a refund for the unused period in this case</ToConfirm>.
      </p>

      <h2>4. Information, not professional advice</h2>
      <p>
        Content on GradPilot AI — including job and sponsorship information, guides and any AI
        output — is general information. It is <strong>not legal or immigration advice</strong>.
        GradPilot AI is not a regulated immigration adviser. Visa rules change and every situation
        is different: check official sources such as{" "}
        <a href="https://www.gov.uk/browse/visas-immigration" rel="noopener noreferrer" target="_blank">GOV.UK</a>{" "}
        and, for advice on your own circumstances, a regulated immigration adviser or solicitor. Job
        listings and sponsorship information may be incomplete or out of date — check them with the
        employer and the Home Office register of licensed sponsors before you rely on them.
      </p>

      <h2>5. Paid plans and prices</h2>
      <p>We offer a free plan and the following paid subscriptions, charged in pounds sterling:</p>
      <ul>
        <li><strong>Pro</strong> — £9.99 per month, or £99.99 per year</li>
        <li><strong>Premium</strong> — £19.99 per month, or £199.99 per year</li>
      </ul>
      <p>
        Prices include any VAT that applies <ToConfirm>VAT registration status</ToConfirm>. The price
        and what is included are shown before you pay. Payments are processed by Stripe; we do not
        store your card details.
      </p>

      <h2>6. Automatic renewal</h2>
      <p>
        <strong>Paid plans renew automatically</strong> until you cancel. You are charged at the
        start of each billing period — every month for monthly plans, or every year for annual
        plans — using the payment method saved with Stripe. The renewal date is shown under{" "}
        <em>Settings → Plan &amp; billing</em>.
      </p>
      <p>
        If a renewal payment fails, Stripe will retry it and you keep your paid features while it
        does. If payment still cannot be collected, your subscription ends and your account returns
        to the free plan.
      </p>
      <p>
        If we change the price of your plan, we will tell you before the change applies to you, and
        you can cancel before it takes effect <ToConfirm>notice period for price changes</ToConfirm>.
      </p>

      <h2>7. Changing plan</h2>
      <p>
        You can switch between Pro and Premium, or between monthly and annual billing, from{" "}
        <em>Settings → Plan &amp; billing → Manage billing</em>. When you switch, Stripe adjusts the
        charge for the time remaining in your current billing period (proration). The amount is
        shown before you confirm.
      </p>

      <h2>8. Cancelling</h2>
      <p>
        You can cancel at any time from <em>Settings → Plan &amp; billing → Manage billing</em>.{" "}
        <strong>Cancellation takes effect at the end of your current billing period</strong>: you keep
        your paid features until then, you are not charged again, and your account then returns to
        the free plan. Cancelling does not by itself give a refund for the rest of the period — see
        our <Link href="/refunds">Refunds &amp; Cancellation Policy</Link>, which also explains your
        14-day statutory right to cancel.
      </p>
      <p>
        If you delete your account while you have a paid subscription, the subscription is cancelled
        immediately and is not refunded for the remaining period.
      </p>

      <h2>9. Acceptable use</h2>
      <p>You must not:</p>
      <ul>
        <li>break the law, or use GradPilot AI to mislead, harass or harm others;</li>
        <li>try to access other people&apos;s accounts or data, or our systems without permission;</li>
        <li>copy, scrape or resell the service or its content, or interfere with how it works;</li>
        <li>upload malicious code or content you do not have the right to share.</li>
      </ul>
      <p>
        We may suspend or close an account that breaks these rules.{" "}
        <ToConfirm>whether you refund the unused period if you close a paid account for reasons other than a breach</ToConfirm>
      </p>

      <h2>10. Your content and our content</h2>
      <p>
        You keep ownership of anything you submit to us, and you give us permission to use it only
        to provide the service to you. GradPilot AI, its content, design and brand belong to us or
        our licensors.
      </p>

      <h2>11. Third-party links</h2>
      <p>
        Job listings and other content may link to employers and other websites. We are not
        responsible for third-party websites, their content or their recruitment decisions.
      </p>

      <h2>12. Our responsibility to you</h2>
      <p>
        If you are a consumer, we must provide the service with reasonable care and skill and as
        described. If we fail to, you have legal rights, including a repeat performance or a price
        reduction. We are responsible for loss you suffer that is a foreseeable result of our breaking
        these terms or failing to use reasonable care and skill.
      </p>
      <p>
        We are not responsible for decisions you make based on general information on GradPilot AI
        (including job, visa and sponsorship information), for losses that were not foreseeable, or
        for business losses. Nothing in these terms limits liability for death or personal injury
        caused by our negligence, for fraud, or any other liability that cannot be limited by law.
      </p>

      <h2>13. Complaints and disputes</h2>
      <p>
        If you are unhappy, please contact us at <ContactEmail /> so we can try to put it right.
        These terms are governed by the law of <ToConfirm>governing law, e.g. England and Wales</ToConfirm>.
        If you live in Scotland or Northern Ireland, you may also bring proceedings in your local
        courts.
      </p>

      <h2>14. Changes to these terms</h2>
      <p>
        We may update these terms, for example to reflect new features or changes in the law. We
        will show the date of the latest version at the top of this page and, where a change
        significantly affects a paid subscription, tell you before it applies so you can cancel if
        you wish.
      </p>
    </LegalPage>
  );
}
