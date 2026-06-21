"use client";

import { useRef, useTransition } from "react";
import { addApplication } from "@/app/dashboard/actions";

export function AddApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(fd) =>
        startTransition(async () => {
          const jobTitle = String(fd.get("jobTitle") ?? "").trim();
          const company = String(fd.get("company") ?? "").trim();
          if (!jobTitle || !company) return;
          await addApplication({ jobTitle, company, status: "applied" });
          formRef.current?.reset();
        })
      }
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        name="jobTitle"
        required
        placeholder="Job title"
        className="h-11 flex-1 rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
      <input
        name="company"
        required
        placeholder="Company"
        className="h-11 flex-1 rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
      <button type="submit" disabled={pending} className="btn-primary h-11 px-5 text-sm">
        {pending ? "Adding…" : "Add application"}
      </button>
    </form>
  );
}
