import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail, LegalPage, LegalTable } from "@/components/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies GradPilot AI uses and why.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      current="/cookies"
      summary="GradPilot AI only uses cookies that are strictly necessary to sign you in and keep your account secure. We do not use analytics, advertising or tracking cookies."
    >
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files a website stores in your browser. Similar technologies, such as
        local storage, work in a comparable way. This policy covers both.
      </p>

      <h2>2. Cookies we use</h2>
      <p>
        We only set cookies when you sign in, or while you confirm your email or reset your password.
        Visitors who are not signed in do not receive cookies from us.
      </p>
      <LegalTable
        head={["Cookie", "Purpose", "Type", "How long"]}
        rows={[
          [
            <code key="a">sb-…-auth-token</code>,
            "Keeps you signed in and identifies your session securely. Large sessions are split into numbered parts (…-auth-token.0, .1).",
            "Strictly necessary",
            "Up to 400 days, or until you sign out",
          ],
          [
            <code key="b">sb-…-auth-token-code-verifier</code>,
            "Used once to complete sign-in safely when you open an email confirmation or password-reset link.",
            "Strictly necessary",
            "Removed once sign-in completes; otherwise up to 400 days",
          ],
        ]}
      />
      <p>
        These cookies are set by our authentication provider, Supabase, on our own domain. Because
        they are strictly necessary to provide a service you have asked for, UK law (the Privacy and
        Electronic Communications Regulations) does not require your consent for them, and we do not
        show a cookie banner.
      </p>

      <h2>3. What we don&apos;t use</h2>
      <ul>
        <li>No analytics or statistics cookies.</li>
        <li>No advertising, retargeting or social media tracking cookies.</li>
        <li>No local storage or similar technologies to track you.</li>
      </ul>
      <p>
        If we ever add non-essential cookies, we will update this policy and ask for your consent
        before setting them.
      </p>

      <h2>4. Payments (Stripe)</h2>
      <p>
        When you go to checkout or open <em>Manage billing</em>, you leave our site for pages hosted
        by Stripe on Stripe&apos;s own domains. Stripe sets its own cookies there, including for
        fraud prevention. Those cookies are controlled by Stripe and covered by{" "}
        <a href="https://stripe.com/legal/cookies-policy" rel="noopener noreferrer" target="_blank">Stripe&apos;s cookie policy</a>.
      </p>

      <h2>5. Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. If you block the cookies above, you
        will not be able to sign in. Signing out removes the sign-in cookie.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies? Contact us at <ContactEmail />. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
