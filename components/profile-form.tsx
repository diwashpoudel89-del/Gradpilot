"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type ProfileValues = {
  full_name: string | null;
  university: string | null;
  degree_level: string | null;
  degree_subject: string | null;
  country_of_origin: string | null;
  visa_type: string | null;
  visa_expiry_date: string | null;
  graduation_date: string | null;
  target_industry: string | null;
  target_roles: string[] | null;
  experience_level: string | null;
  salary_expectation: string | null;
  linkedin_url: string | null;
};

const DEGREE_LEVELS = ["Bachelor's", "Master's", "PhD", "Other"];
const VISA_TYPES = ["Student (Tier 4)", "Graduate Route", "Skilled Worker", "Other"];
const EXPERIENCE = ["No UK experience", "Internship / placement", "1-2 years", "3+ years"];

const field = "h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "text-sm font-medium";

export function ProfileForm({ userId, initial }: { userId: string; initial: ProfileValues }) {
  const router = useRouter();
  const [v, setV] = useState<ProfileValues>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProfileValues>(key: K, value: ProfileValues[K]) {
    setV((p) => ({ ...p, [key]: value })); setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("profiles").update({
        full_name: v.full_name, university: v.university, degree_level: v.degree_level,
        degree_subject: v.degree_subject, country_of_origin: v.country_of_origin,
        visa_type: v.visa_type, visa_expiry_date: v.visa_expiry_date || null,
        graduation_date: v.graduation_date || null, target_industry: v.target_industry,
        target_roles: v.target_roles, experience_level: v.experience_level,
        salary_expectation: v.salary_expectation, linkedin_url: v.linkedin_url,
        onboarding_completed: true,
      }).eq("id", userId);
      if (error) throw error;
      setSaved(true); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Full name</label>
          <input className={`${field} mt-1`} value={v.full_name ?? ""} onChange={(e) => set("full_name", e.target.value)} />
        </div>
        <div><label className={label}>University</label><input className={`${field} mt-1`} value={v.university ?? ""} onChange={(e) => set("university", e.target.value)} /></div>
        <div><label className={label}>Country of origin</label><input className={`${field} mt-1`} value={v.country_of_origin ?? ""} onChange={(e) => set("country_of_origin", e.target.value)} /></div>
        <div>
          <label className={label}>Degree level</label>
          <select className={`${field} mt-1`} value={v.degree_level ?? ""} onChange={(e) => set("degree_level", e.target.value)}>
            <option value="">Select…</option>{DEGREE_LEVELS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div><label className={label}>Degree subject</label><input className={`${field} mt-1`} value={v.degree_subject ?? ""} onChange={(e) => set("degree_subject", e.target.value)} /></div>
        <div>
          <label className={label}>Visa type</label>
          <select className={`${field} mt-1`} value={v.visa_type ?? ""} onChange={(e) => set("visa_type", e.target.value)}>
            <option value="">Select…</option>{VISA_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div><label className={label}>Visa expiry date</label><input type="date" className={`${field} mt-1`} value={v.visa_expiry_date ?? ""} onChange={(e) => set("visa_expiry_date", e.target.value)} /></div>
        <div><label className={label}>Graduation date</label><input type="date" className={`${field} mt-1`} value={v.graduation_date ?? ""} onChange={(e) => set("graduation_date", e.target.value)} /></div>
        <div>
          <label className={label}>Experience level</label>
          <select className={`${field} mt-1`} value={v.experience_level ?? ""} onChange={(e) => set("experience_level", e.target.value)}>
            <option value="">Select…</option>{EXPERIENCE.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div><label className={label}>Target industry</label><input className={`${field} mt-1`} value={v.target_industry ?? ""} onChange={(e) => set("target_industry", e.target.value)} /></div>
        <div className="sm:col-span-2">
          <label className={label}>Target roles <span className="text-slate-500">(comma-separated)</span></label>
          <input className={`${field} mt-1`} value={(v.target_roles ?? []).join(", ")} onChange={(e) => set("target_roles", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </div>
        <div><label className={label}>Salary expectation</label><input className={`${field} mt-1`} value={v.salary_expectation ?? ""} onChange={(e) => set("salary_expectation", e.target.value)} placeholder="e.g. £35,000" /></div>
        <div><label className={label}>LinkedIn URL</label><input className={`${field} mt-1`} value={v.linkedin_url ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} /></div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-emerald-600">Saved ✓</p>}
      <button type="submit" disabled={saving} className="btn-primary h-12 px-7 text-sm">{saving ? "Saving…" : "Save profile"}</button>
    </form>
  );
}
