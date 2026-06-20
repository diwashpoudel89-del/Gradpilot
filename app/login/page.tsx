import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to GradPilot AI.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const initialError =
    error === "confirmation_failed"
      ? "That confirmation link is invalid or has expired. Please request a new one."
      : undefined;
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-center font-display text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Sign in to your GradPilot AI account.
        </p>
        <div className="mt-8">
          <AuthForm mode="login" next={next} initialError={initialError} />
        </div>
      </main>
      <Footer />
    </>
  );
}
