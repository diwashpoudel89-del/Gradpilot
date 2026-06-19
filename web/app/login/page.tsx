import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { btnOutline, btnPrimary, cn, sizeLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to GradPilot AI.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-col px-5 py-16 text-center sm:px-6 sm:py-28 lg:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">We're not open yet</h1>
        <p className="mt-3 text-muted-foreground">
          GradPilot AI is in pre-launch — accounts open at launch. Join the waitlist now and you'll
          be among the first invited in (with 3 months of Pro free).
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/waitlist" className={cn(btnPrimary, sizeLg)}>
            Join the waitlist
          </Link>
          <Link href="/" className={cn(btnOutline, sizeLg)}>
            Back home
          </Link>
        </div>
        {/*
          When the app is ready, replace this with the real auth form
          (Supabase Auth) and remove `robots: { index: false }` above.
        */}
      </main>
      <Footer />
    </>
  );
}
