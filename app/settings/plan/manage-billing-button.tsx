"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { SpinnerIcon } from "@/components/icons";
import { openBillingPortal, type BillingState } from "./actions";

export function ManageBillingButton() {
  const [state, action] = useActionState<BillingState, FormData>(openBillingPortal, null);
  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <Submit />
      {state?.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-outline h-10 px-4 text-sm">
      {pending ? <SpinnerIcon /> : null}
      Manage billing &amp; invoices
    </button>
  );
}
