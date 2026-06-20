import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How GradPilot AI uses cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">What cookies are</h2>
            <p className="mt-2">
              Cookies are small text files stored on your device. We use them to keep you signed in and,
              with your consent, to understand how the product is used so we can improve it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Essential cookies</h2>
            <p className="mt-2">
              Required for the service to work — primarily your authentication session. These are always
              on and cannot be disabled, as the app can't function without them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Analytics cookies (optional)</h2>
            <p className="mt-2">
              With your consent, we use privacy-respecting analytics (such as Vercel Analytics, Google
              Analytics, and PostHog) to measure traffic and improve the experience. We do not load these
              until you choose “Accept all,” and you can change your mind at any time by clearing cookies
              for this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Managing cookies</h2>
            <p className="mt-2">
              You can accept or reject optional cookies via the banner shown on your first visit. You can
              also block or delete cookies in your browser settings. Rejecting optional cookies will not
              affect core functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about this policy? Email{" "}
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
