import { createSupabaseServerClient } from "@/lib/auth-server";
import { ProfileForm, type ProfileValues } from "@/components/profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select(
      "full_name, university, degree_level, degree_subject, country_of_origin, visa_type, visa_expiry_date, graduation_date, target_industry, target_roles, experience_level, salary_expectation, linkedin_url"
    )
    .eq("id", user!.id)
    .maybeSingle();

  const initial: ProfileValues = {
    full_name: data?.full_name ?? user?.user_metadata?.full_name ?? "",
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
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Your profile</h1>
      <p className="mt-2 text-muted-foreground">
        The more we know, the better your Graduate Route countdown, job matches, and AI guidance
        become.
      </p>
      <div className="mt-8">
        <ProfileForm userId={user!.id} initial={initial} />
      </div>
    </div>
  );
}
