import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a free GradPilot AI account — visa-aware jobs, an AI career adviser, and tools built for international students in the UK.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-center font-display text-3xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Free to join. Start with visa-aware job search and the AI career adviser.
        </p>
        <div className="mt-8">
          <AuthForm mode="signup" next={next} />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <a href="/terms" className="underline">Terms</a> and{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
