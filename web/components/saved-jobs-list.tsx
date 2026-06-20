"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";

export type SavedJob = {
  id: string;
  job_title: string;
  company: string;
};

export function SavedJobsList({ initial }: { initial: SavedJob[] }) {
  const [jobs, setJobs] = useState<SavedJob[]>(initial);

  async function remove(id: string) {
    setJobs((p) => p.filter((j) => j.id !== id));
    await createSupabaseBrowserClient().from("saved_jobs").delete().eq("id", id);
  }

  if (jobs.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No saved jobs yet. Browse the{" "}
        <a href="/jobs" className="text-primary underline">jobs board</a> and tap Save.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((j) => (
        <div key={j.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{j.job_title}</p>
            <p className="truncate text-sm text-muted-foreground">{j.company}</p>
          </div>
          <button
            type="button"
            onClick={() => remove(j.id)}
            aria-label="Remove"
            className="text-muted-foreground transition-colors hover:text-red-600"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
