"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleSaveJob } from "@/app/dashboard/actions";

export function SaveJobButton({
  jobId,
  jobTitle,
  company,
  initialSaved,
  isAuthed,
  className = "btn-outline h-11 w-full px-5 text-sm",
}: {
  jobId: string;
  jobTitle: string;
  company: string;
  initialSaved: boolean;
  isAuthed: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!isAuthed) {
      router.push(`/login?next=/jobs/${jobId}`);
      return;
    }
    startTransition(async () => {
      try {
        const res = await toggleSaveJob({ jobId, jobTitle, company });
        setSaved(res.saved);
      } catch {
        // keep current state on failure
      }
    });
  }

  return (
    <button type="button" onClick={onClick} disabled={pending} className={className} aria-pressed={saved}>
      {pending ? "Saving…" : saved ? "★ Saved" : "☆ Save & track this job"}
    </button>
  );
}
