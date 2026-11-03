"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { SpinnerIcon } from "@/components/icons";
import { deleteAccount, type DeleteAccountState } from "@/app/settings/actions";

export function DeleteAccountForm({ hasPaidPlan }: { hasPaidPlan: boolean }) {
  const [state, action] = useActionState<DeleteAccountState, FormData>(deleteAccount, null);
  const [confirm, setConfirm] = useState("");

  return (
    <div className="card mt-6 border-red-200 p-6">
      <h2 className="font-semibold text-red-700">Delete account</h2>
      <p className="mt-2 text-sm text-slate-600">
        This permanently deletes your profile, saved jobs, applications and all other data. It can&apos;t be undone.
        {hasPaidPlan
          ? " Your paid subscription will be cancelled immediately and you won't be charged again. Unused time isn't refunded."
          : null}
      </p>
      <form action={action} className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5 text-sm text-slate-700">
          <span>
            Type <span className="font-mono font-semibold">DELETE</span> to confirm
          </span>
          <input
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="off"
            className="h-10 w-48 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-500"
          />
        </label>
        <Submit disabled={confirm.trim() !== "DELETE"} />
      </form>
      {state?.error ? (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </div>
  );
}

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="btn h-10 bg-red-600 px-4 text-sm text-white hover:bg-red-700"
    >
      {pending ? <SpinnerIcon /> : null}
      {pending ? "Deleting…" : "Delete my account"}
    </button>
  );
}
