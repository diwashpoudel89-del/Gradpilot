import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdviserChat } from "@/components/adviser-chat";

export const metadata: Metadata = {
  title: "AI Career Adviser",
  description:
    "Chat with GradPilot AI's career adviser — Graduate Route, visa-sponsoring jobs, UK CVs, and interview prep for international students.",
  alternates: { canonical: "/adviser" },
};

export default function AdviserPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">AI Career Adviser</h1>
          <p className="mt-2 text-muted-foreground">
            Honest, UK-specific guidance for international students — available 24/7.
          </p>
        </div>
        <AdviserChat />
        <p className="mt-4 text-center text-xs text-muted-foreground">
          General guidance, not legal or immigration advice. Verify visa decisions against{" "}
          <a className="underline" href="https://www.gov.uk/graduate-visa" target="_blank" rel="noopener noreferrer">
            GOV.UK
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
