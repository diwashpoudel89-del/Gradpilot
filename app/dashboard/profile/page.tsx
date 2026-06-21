import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm, type ProfileValues } from "@/components/profile-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your profile" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, university, degree_level, degree_subject, country_of_origin, visa_type, visa_expiry_date, graduation_date, target_industry, target_roles, experience_level, salary_expectation, linkedin_url")
    .eq("id", user!.id)
    .maybeSingle();

  const initial: ProfileValues = {
    full_name: data?.full_name ?? (user?.user_metadata?.full_name as string | undefined) ?? "",
    university: data?.university ?? "",
    degree_level: data?.degree_level ?? "",
    degree_subject: data?.degree_subject ?? "",
    country_of_origin: data?.country_of_origin ?? "",
    visa_type: data?.visa_type ?? "",
    visa_expiry_date: data?.visa_expiry_date ?? "",
    graduation_date: data?.graduation_date ?? "",
    target_industry: data?.target_industry ?? "",
    target_roles: data?.target_roles ?? [],
    experience_level: data?.experience_level ?? "",
    salary_expectation: data?.salary_expectation ?? "",
    linkedin_url: data?.linkedin_url ?? "",
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight">Your profile</h1>
      <p className="mt-1 text-slate-600">The more we know, the better your GradScore™, job matches, and AI guidance become.</p>
      <div className="mt-8"><ProfileForm userId={user!.id} initial={initial} /></div>
    </div>
  );
}
