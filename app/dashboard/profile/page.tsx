import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/queries";
import { updateProfile } from "@/app/dashboard/actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Profile" };

const FIELD =
  "h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const profile = await getProfile(data.user.id);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">Your profile</h1>
      <p className="mt-1 text-slate-600">The more we know, the better we can match you to visa-sponsoring roles.</p>

      <form action={updateProfile} className="mt-8 space-y-5">
        <Field label="Full name" name="full_name" defaultValue={profile?.full_name} />
        <Field label="University" name="university" defaultValue={profile?.university} placeholder="University of Manchester" />

        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Degree level" name="degree_level" defaultValue={profile?.degree_level}
            options={[["", "Select…"], ["undergraduate", "Undergraduate"], ["masters", "Master's"], ["phd", "PhD"]]} />
          <Field label="Degree subject" name="degree_subject" defaultValue={profile?.degree_subject} placeholder="Computer Science" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Country of origin" name="country_of_origin" defaultValue={profile?.country_of_origin} placeholder="India" />
          <Select label="Visa type" name="visa_type" defaultValue={profile?.visa_type}
            options={[["", "Select…"], ["graduate_route", "Graduate Route"], ["student", "Student"], ["skilled_worker", "Skilled Worker"], ["other", "Other"]]} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Visa expiry date" name="visa_expiry_date" type="date" defaultValue={profile?.visa_expiry_date} />
          <Field label="Graduation date" name="graduation_date" type="date" defaultValue={profile?.graduation_date} />
        </div>

        <Field label="Target industry" name="target_industry" defaultValue={profile?.target_industry} placeholder="Technology" />
        <Field label="Target roles" name="target_roles" defaultValue={profile?.target_roles?.join(", ")}
          placeholder="Software Engineer, Data Analyst" hint="Comma-separated" />
        <Field label="LinkedIn URL" name="linkedin_url" type="url" defaultValue={profile?.linkedin_url} placeholder="https://linkedin.com/in/…" />

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn-primary h-11 px-6 text-sm">Save profile</button>
          <span className="text-sm text-slate-500">Signed in as {profile?.email ?? data.user.email}</span>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, placeholder, type = "text", hint }: {
  label: string; name: string; defaultValue?: string | null; placeholder?: string; type?: string; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={FIELD} />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Select({ label, name, defaultValue, options }: {
  label: string; name: string; defaultValue?: string | null; options: [string, string][];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}</label>
      <select id={name} name={name} defaultValue={defaultValue ?? ""} className={FIELD}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </div>
  );
}
