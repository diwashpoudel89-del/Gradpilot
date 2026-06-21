"use client";

import { useTransition } from "react";
import { updateApplicationStatus, deleteApplication } from "@/app/dashboard/actions";
import { APPLICATION_STATUSES, STATUS_LABELS, type ApplicationStatus } from "@/lib/types";

export function ApplicationStatusSelect({ id, status }: { id: string; status: ApplicationStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={status}
        disabled={pending}
        onChange={(e) =>
          startTransition(async () => {
            await updateApplicationStatus(id, e.target.value as ApplicationStatus);
          })
        }
        className="h-9 rounded-lg border border-slate-300 bg-white px-2 text-sm outline-none focus:border-brand-500"
      >
        {APPLICATION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Remove this application?")) {
            startTransition(async () => {
              await deleteApplication(id);
            });
          }
        }}
        className="text-sm text-slate-400 hover:text-red-600"
        aria-label="Delete application"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}
