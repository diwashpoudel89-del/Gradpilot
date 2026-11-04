import Link from "next/link";
import { LEGAL, LEGAL_PAGES } from "@/lib/legal";

/** Highlights a fact the business owner still has to confirm. */
export function ToConfirm({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber-100 px-1 py-0.5 font-medium text-amber-900">
      [To be confirmed: {children}]
    </mark>
  );
}

/** Renders a confirmed value, or a "to be confirmed" marker when it's missing. */
export function Fact({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <ToConfirm>{label}</ToConfirm>;
}

/** Contact line used across the legal pages. */
export function ContactEmail() {
  return LEGAL.contactEmail ? (
    <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
  ) : (
    <ToConfirm>contact email address</ToConfirm>
  );
}

export function LegalPage({
  title,
  summary,
  current,
  children,
}: {
  title: string;
  summary: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {LEGAL.draft && (
          <div
            role="note"
            className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <strong>Draft for review.</strong> This document is not yet in effect. Highlighted items
            must be confirmed by GradPilot AI Ltd, and the text should be checked by a qualified legal
            adviser before launch.
          </div>
        )}

        <nav aria-label="Legal documents" className="-mx-1 mb-8 flex flex-wrap gap-2 text-sm">
          {LEGAL_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={p.href === current ? "page" : undefined}
              className={`rounded-full border px-3 py-1 ${
                p.href === current
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <header>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {LEGAL.lastUpdated}</p>
          <p className="mt-4 text-slate-600">{summary}</p>
        </header>

        <div
          className="mt-8 space-y-4 break-words text-[15px] leading-relaxed text-slate-700
            [&_a]:font-medium [&_a]:text-brand-600 [&_a:hover]:underline
            [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900
            [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-slate-900
            [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5
            [&_strong]:text-slate-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Scrollable table wrapper so wide tables never overflow on phones. */
export function LegalTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            {head.map((h) => (
              <th key={h} className="px-2 py-2 font-semibold text-slate-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-100 align-top">
              {r.map((c, j) => (
                <td key={j} className="px-2 py-2">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
