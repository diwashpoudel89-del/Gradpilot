"use client";

import { useTransition } from "react";
import { removeSavedJob, trackSavedJob } from "@/app/dashboard/actions";

export function SavedJobActions({
  id,
  jobTitle,
  company,
  jobId,
}: {
  id: string;
  jobTitle: string;
  company: string;
  jobId: string | null;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await trackSavedJob(id, jobTitle, company, jobId); })}
        className="text-sm font-medium text-brand-600 hover:underline"
      >
        Mark as applied
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await removeSavedJob(id); })}
        className="text-sm text-slate-400 hover:text-red-600"
        aria-label="Remove saved job"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}
