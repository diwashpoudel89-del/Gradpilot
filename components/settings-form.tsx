"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-secondary"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

export function SettingsForm({
  userId,
  initialEmailNotifs,
  initialWeeklyDigest,
}: {
  userId: string;
  initialEmailNotifs: boolean;
  initialWeeklyDigest: boolean;
}) {
  const [emailNotifs, setEmailNotifs] = useState(initialEmailNotifs);
  const [weekly, setWeekly] = useState(initialWeeklyDigest);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    await createSupabaseBrowserClient()
      .from("profiles")
      .update({ email_notifications_enabled: emailNotifs, weekly_digest_enabled: weekly })
      .eq("id", userId);
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Toggle checked={emailNotifs} onChange={(v) => { setEmailNotifs(v); setSaved(false); }} label="Email notifications" />
      <Toggle checked={weekly} onChange={(v) => { setWeekly(v); setSaved(false); }} label="Weekly job digest" />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {saving && <Loader2 className="size-4 animate-spin" />} Save preferences
        </button>
        {saved && <span className="text-sm text-green-600">Saved ✓</span>}
      </div>
    </div>
  );
}
