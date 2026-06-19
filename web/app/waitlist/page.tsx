import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Join the GradPilot AI waitlist for early access — and lock in 3 months of Pro free at launch.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-center font-display text-3xl font-bold tracking-tight">
          Get early access to GradPilot AI
        </h1>
        <p className="mt-3 text-center text-muted-foreground">
          We're in pre-launch. Join the waitlist and we'll email you the moment your spot opens —
          early members get 3 months of Pro free at launch.
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
