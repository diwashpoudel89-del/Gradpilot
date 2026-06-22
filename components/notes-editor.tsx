"use client";

import { useState, useTransition } from "react";
import { updateApplicationNotes, updateSavedJobNotes } from "@/app/dashboard/actions";

// Inline notes editor shared by applications and saved jobs. Collapsed by
// default; expands to a textarea that saves through the matching server action.
export function NotesEditor({
  kind,
  id,
  initialNotes,
}: {
  kind: "application" | "savedJob";
  id: string;
  initialNotes: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saved, setSaved] = useState(initialNotes ?? "");
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      try {
        if (kind === "application") await updateApplicationNotes(id, notes);
        else await updateSavedJobNotes(id, notes);
        setSaved(notes);
        setOpen(false);
      } catch {
        // keep editing on failure
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm text-slate-500 hover:text-brand-600"
      >
        {saved ? (
          <span className="line-clamp-2 whitespace-pre-line">📝 {saved}</span>
        ) : (
          "＋ Add note"
        )}
      </button>
    );
  }

  return (
    <div className="w-full">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        autoFocus
        placeholder="Add a note — recruiter name, salary, follow-up date…"
        className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="btn-primary h-8 px-3 text-xs"
        >
          {pending ? "Saving…" : "Save note"}
        </button>
        <button
          type="button"
          onClick={() => {
            setNotes(saved);
            setOpen(false);
          }}
          disabled={pending}
          className="text-xs text-slate-500 hover:text-slate-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
