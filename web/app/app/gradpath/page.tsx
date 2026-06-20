import { GradPath } from "@/components/gradpath";

export const dynamic = "force-dynamic";

export default function GradPathPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">GradPath™</h1>
      <p className="mt-2 text-muted-foreground">
        Your personalised, step-by-step roadmap from where you are now to a sponsored UK role and a
        settled life — built around your Graduate Route timeline by Claude Opus 4.8.
      </p>
      <div className="mt-8">
        <GradPath />
      </div>
    </div>
  );
}
