import type { Metadata } from "next";
import { GradPath } from "@/components/gradpath";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "GradPath" };

export default function GradPathPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">GradPath™</h1>
      <p className="mt-1 text-slate-600">
        Your personalised, step-by-step roadmap from where you are now to a sponsored UK role and a
        settled life — built around your Graduate Route timeline by Claude Opus 4.8.
      </p>
      <div className="mt-8"><GradPath /></div>
    </div>
  );
}
