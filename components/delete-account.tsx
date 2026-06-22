"use client";

import { useState, useTransition } from "react";
import { deleteAccount } from "@/app/dashboard/actions";

// Destructive, GDPR account deletion. Requires the user to type DELETE to
// confirm before the irreversible server action runs.
export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onDelete() {
    setError(null);
    startTransition(async () => {
      try {
        await deleteAccount();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-900">Delete account</h2>
      <p className="mt-1 text-sm text-red-800">
        Permanently delete your account, profile, saved jobs and application history. This cannot be undone.
      </p>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn mt-4 h-10 border border-red-300 bg-white px-5 text-sm text-red-700 hover:bg-red-100"
        >
          Delete my account
        </button>
      ) : (
        <div className="mt-4 max-w-sm">
          <label htmlFor="confirm-delete" className="block text-sm font-medium text-red-900">
            Type <span className="font-mono font-bold">DELETE</span> to confirm
          </label>
          <input
            id="confirm-delete"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoFocus
            className="mt-1.5 h-11 w-full rounded-xl border border-red-300 px-3.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={onDelete}
              disabled={pending || confirm !== "DELETE"}
              className="btn h-10 bg-red-600 px-5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
            >
              {pending ? "Deleting…" : "Permanently delete"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirm("");
                setError(null);
              }}
              disabled={pending}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
