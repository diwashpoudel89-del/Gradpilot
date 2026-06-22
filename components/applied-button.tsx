"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markJobApplied } from "@/app/dashboard/actions";

export function AppliedButton({
  jobId,
  jobTitle,
  company,
  initialApplied,
  isAuthed,
  className = "btn-outline h-11 w-full px-5 text-sm",
}: {
  jobId: string;
  jobTitle: string;
  company: string;
  initialApplied: boolean;
  isAuthed: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [applied, setApplied] = useState(initialApplied);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!isAuthed) {
      router.push(`/login?next=/jobs/${jobId}`);
      return;
    }
    if (applied) return;
    startTransition(async () => {
      try {
        await markJobApplied({ jobId, jobTitle, company });
        setApplied(true);
      } catch {
        // keep current state on failure
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || applied}
      className={className}
      aria-pressed={applied}
    >
      {pending ? "Saving…" : applied ? "✓ Tracked as applied" : "I applied to this job"}
    </button>
  );
}
