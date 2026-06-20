"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";
import { btnPrimary, cn, sizeMd } from "@/lib/ui";

export type Application = {
  id: string;
  job_title: string;
  company: string;
  status: string;
  applied_at: string | null;
  notes: string | null;
};

const STATUSES = ["saved", "applied", "interviewing", "offer", "rejected"];
const STATUS_STYLE: Record<string, string> = {
  saved: "bg-secondary text-muted-foreground",
  applied: "bg-brand-50 text-primary",
  interviewing: "bg-amber-100 text-amber-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export function ApplicationManager({
  userId,
  initial,
}: {
  userId: string;
  initial: Application[];
}) {
  const [apps, setApps] = useState<Application[]>(initial);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [adding, setAdding] = useState(false);

  function db() {
    return createSupabaseBrowserClient();
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    setAdding(true);
    const { data, error } = await db()
      .from("applications")
      .insert({
        user_id: userId,
        job_title: title.trim(),
        company: company.trim(),
        status: "applied",
        applied_at: new Date().toISOString().slice(0, 10),
      })
      .select("id, job_title, company, status, applied_at, notes")
      .single();
    setAdding(false);
    if (!error && data) {
      setApps((p) => [data as Application, ...p]);
      setTitle("");
      setCompany("");
    }
  }

  async function updateStatus(id: string, status: string) {
    setApps((p) => p.map((a) => (a.id === id ? { ...a, status } : a)));
    await db().from("applications").update({ status }).eq("id", id);
  }

  async function remove(id: string) {
    setApps((p) => p.filter((a) => a.id !== id));
    await db().from("applications").delete().eq("id", id);
  }

  return (
    <div>
      <form onSubmit={add} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Role (e.g. Graduate Software Engineer)"
          className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
        />
        <button type="submit" disabled={adding} className={cn(btnPrimary, sizeMd, "h-11")}>
          {adding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Add
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {apps.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            No applications yet. Add your first one above, or save roles from the{" "}
            <a href="/jobs" className="text-primary underline">jobs board</a>.
          </p>
        ) : (
          apps.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{a.job_title}</p>
                <p className="truncate text-sm text-muted-foreground">{a.company}</p>
              </div>
              <select
                value={a.status}
                onChange={(e) => updateStatus(a.id, e.target.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium capitalize outline-none",
                  STATUS_STYLE[a.status] ?? "bg-secondary"
                )}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => remove(a.id)}
                aria-label="Delete"
                className="text-muted-foreground transition-colors hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
