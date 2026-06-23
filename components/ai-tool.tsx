"use client";

import { useState, useTransition } from "react";
import { Markdown } from "@/components/markdown";
import type { AiResult } from "@/app/dashboard/ai/actions";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
};

export function AiTool({
  title,
  description,
  fields,
  submitLabel,
  action,
  disabled,
}: {
  title: string;
  description: string;
  fields: Field[];
  submitLabel: string;
  action: (values: Record<string, string>) => Promise<AiResult>;
  disabled?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AiResult | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      setResult(await action(values));
    });
  }

  return (
    <section className="card p-6">
      <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>

      <form onSubmit={submit} className="mt-4 space-y-4">
        {fields.map((f) =>
          f.type === "textarea" ? (
            <textarea
              key={f.name}
              required={f.required}
              rows={8}
              placeholder={f.placeholder ?? f.label}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          ) : (
            <input
              key={f.name}
              required={f.required}
              placeholder={f.placeholder ?? f.label}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          )
        )}
        <button type="submit" disabled={pending || disabled} className="btn-primary h-11 px-6 text-sm">
          {pending ? "Thinking…" : submitLabel}
        </button>
      </form>

      {result && !result.ok && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{result.error}</p>
      )}
      {result && result.ok && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Markdown source={result.text} />
        </div>
      )}
    </section>
  );
}
