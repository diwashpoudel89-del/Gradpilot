import { CvCoach } from "@/components/cv-coach";

export const dynamic = "force-dynamic";

export default function CvPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">AI CV Coach</h1>
      <p className="mt-2 text-muted-foreground">
        Paste your CV and get a UK-readiness score, specific fixes, a rewritten version, and a
        tailored cover letter — powered by Claude Opus 4.8.
      </p>
      <div className="mt-8">
        <CvCoach />
      </div>
    </div>
  );
}
