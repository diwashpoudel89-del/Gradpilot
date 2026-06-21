import type { Metadata } from "next";
import { AdviserChat } from "@/components/adviser-chat";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "AI Career Adviser" };

export default function AdviserPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">AI Career Adviser</h1>
      <p className="mt-1 text-slate-600">Honest, UK-specific guidance for international students — available 24/7.</p>
      <div className="mt-6"><AdviserChat /></div>
      <p className="mt-4 text-center text-xs text-slate-500">
        General guidance, not legal or immigration advice. Verify visa decisions against{" "}
        <a className="underline" href="https://www.gov.uk/graduate-visa" target="_blank" rel="noopener noreferrer">GOV.UK</a>.
      </p>
    </div>
  );
}
