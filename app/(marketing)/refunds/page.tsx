import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail, LegalPage, ToConfirm } from "@/components/legal";

export const metadata: Metadata = {
  title: "Refunds & Cancellation Policy",
  description: "How to cancel a GradPilot AI subscription, when cancellation takes effect, and your refund rights.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refunds & Cancellation Policy"
      current="/refunds"
      summary="How to cancel a paid plan, what happens when you do, and when you are entitled to a refund."
    >
      <h2>1. Cancelling your subscription</h2>
      <ol>
        <li>Sign in and go to <em>Settings → Plan &amp; billing</em>.</li>
        <li>Choose <strong>Manage billing</strong>. This opens our secure billing portal, run by Stripe.</li>
        <li>Choose <strong>Cancel subscription</strong> and confirm.</li>
      </ol>
      <p>
        You can cancel at any time. <strong>Cancellation takes effect at the end of the billing
        period you have already paid for.</strong> Until then you keep your paid features, and{" "}
        <em>Plan &amp; billing</em> shows the date your plan ends. You will not be charged again.
        After that date your account moves to the free plan and your account itself stays open.
      </p>
      <p>
        If you change your mind before the end of the period, you can renew from the same billing
        portal and your subscription continues as before.
      </p>

      <h2>2. Your 14-day right to cancel</h2>
      <p>
        If you are a consumer, UK law (the Consumer Contracts Regulations 2013) gives you the right
        to cancel a new subscription within <strong>14 days</strong> of buying it, without giving a
        reason. To use this right, contact us at <ContactEmail /> within the 14 days and tell us
        you want to cancel.
      </p>
      <p>
        If you asked us to start your paid service during the 14 days, we may deduct an amount for
        the service you received before you told us you were cancelling, in proportion to the full
        subscription period. We will refund the rest to your original payment method within 14 days
        of you telling us.{" "}
        <ToConfirm>checkout does not yet ask customers to request an immediate start and acknowledge this; until it does, the full 14-day right applies</ToConfirm>
      </p>

      <h2>3. Refunds outside the 14 days</h2>
      <p>
        Cancelling after the 14-day period stops future payments but does not give a refund for the
        rest of the current monthly or annual period, because you keep access until it ends.{" "}
        <ToConfirm>whether you offer any goodwill or pro-rata refunds, for example on annual plans</ToConfirm>
      </p>
      <p>This does not affect your other legal rights. You may be entitled to a refund or price reduction if:</p>
      <ul>
        <li>the service was not provided with reasonable care and skill, or not as described;</li>
        <li>you were charged in error (for example a duplicate payment);</li>
        <li>the law otherwise requires it.</li>
      </ul>

      <h2>4. Changing plan</h2>
      <p>
        If you switch plan or billing period in the billing portal, Stripe adjusts the charge for the
        time left in your current period. Any credit is shown in the portal before you confirm and
        is usually applied to your next invoice rather than paid back to your card.
      </p>

      <h2>5. Failed payments</h2>
      <p>
        If a renewal payment fails, Stripe retries it and you keep your paid features meanwhile.
        Update your card in <em>Manage billing</em> to avoid interruption. If the payment still
        can&apos;t be taken, your subscription ends and your account returns to the free plan.
      </p>

      <h2>6. Deleting your account</h2>
      <p>
        If you delete your account (<em>Settings → Delete account</em>) while you have a paid
        subscription, the subscription is <strong>cancelled immediately</strong> and you lose access
        to the rest of the billing period. No refund is made for that remaining period unless you are
        within your 14-day right to cancel. If you might want a refund, contact us{" "}
        <strong>before</strong> deleting your account.
      </p>

      <h2>7. How refunds are paid</h2>
      <p>
        Refunds are made to the payment method you paid with, through Stripe. Depending on your bank,
        they usually take 5–10 business days to appear.
      </p>

      <h2>8. Contact</h2>
      <p>
        For cancellation or refund requests, email <ContactEmail /> with the email address of your
        GradPilot AI account. See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
