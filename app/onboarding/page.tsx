import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import { getProfile } from "@/lib/queries";
import { completeOnboarding, skipOnboarding } from "@/app/dashboard/actions";
import { Logo } from "@/components/brand";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Welcome — set up your profile" };

const FIELD =
  "h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export default async function OnboardingPage() {
  if (!supabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=/onboarding");

  const profile = await getProfile(data.user.id);
  if (profile?.onboarding_completed) redirect("/dashboard");

  const firstName =
    (profile?.full_name || (data.user.user_metadata?.full_name as string | undefined) || "")
      .split(" ")[0] || "there";

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <form action={skipOnboarding}>
            <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-800">
              Skip for now
            </button>
          </form>
        </div>
      </header>

      <main className="container-x py-10">
        <div className="mx-auto max-w-2xl">
          <span className="badge bg-brand-100 text-brand-700">Step 1 of 1 · takes ~2 minutes</span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
            Welcome, {firstName} 👋
          </h1>
          <p className="mt-2 text-slate-600">
            Tell us a bit about your situation so GradPilot can match you to visa-sponsoring roles and
            track your Graduate Route deadline. You can change any of this later.
          </p>

          <form action={completeOnboarding} className="mt-8 space-y-5">
            <Field label="Full name" name="full_name" defaultValue={profile?.full_name} placeholder="Jane Doe" />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Country of origin" name="country_of_origin" defaultValue={profile?.country_of_origin} placeholder="India" />
              <Field label="University" name="university" defaultValue={profile?.university} placeholder="University of Manchester" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select label="Degree level" name="degree_level" defaultValue={profile?.degree_level}
                options={[["", "Select…"], ["undergraduate", "Undergraduate"], ["masters", "Master's"], ["phd", "PhD"]]} />
              <Field label="Degree subject" name="degree_subject" defaultValue={profile?.degree_subject} placeholder="Computer Science" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select label="Visa type" name="visa_type" defaultValue={profile?.visa_type}
                options={[["", "Select…"], ["graduate_route", "Graduate Route"], ["student", "Student"], ["skilled_worker", "Skilled Worker"], ["other", "Other"]]} />
              <Field label="Visa expiry date" name="visa_expiry_date" type="date" defaultValue={profile?.visa_expiry_date} hint="Powers your Graduate Route countdown" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Graduation date" name="graduation_date" type="date" defaultValue={profile?.graduation_date} />
              <Field label="Target industry" name="target_industry" defaultValue={profile?.target_industry} placeholder="Technology" />
            </div>

            <Field label="Target roles" name="target_roles" defaultValue={profile?.target_roles?.join(", ")}
              placeholder="Software Engineer, Data Analyst" hint="Comma-separated — used for your match scores" />
            <Field label="LinkedIn URL" name="linkedin_url" type="url" defaultValue={profile?.linkedin_url} placeholder="https://linkedin.com/in/…" />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" className="btn-primary h-11 px-6 text-sm">Finish &amp; go to dashboard</button>
              <span className="text-sm text-slate-500">Signed in as {profile?.email ?? data.user.email}</span>
            </div>
          </form>
        </div>
      </main>
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
