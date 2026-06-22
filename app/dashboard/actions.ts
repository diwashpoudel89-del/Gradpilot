"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated");
  return { supabase, user: data.user };
}

// ---- Saved jobs ----

export async function toggleSaveJob(input: { jobId: string; jobTitle: string; company: string }) {
  const { supabase, user } = await requireUser();
  const { data: existing } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("user_id", user.id)
    .eq("job_id", input.jobId)
    .maybeSingle();

  if (existing) {
    await supabase.from("saved_jobs").delete().eq("id", existing.id);
  } else {
    await supabase.from("saved_jobs").insert({
      user_id: user.id,
      job_id: input.jobId,
      job_title: input.jobTitle,
      company: input.company,
    });
  }
  revalidatePath("/dashboard");
  revalidatePath(`/jobs/${input.jobId}`);
  return { saved: !existing };
}

export async function removeSavedJob(id: string) {
  const { supabase, user } = await requireUser();
  await supabase.from("saved_jobs").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard");
}

// ---- Applications ----

export async function addApplication(input: {
  jobId?: string | null;
  jobTitle: string;
  company: string;
  status?: ApplicationStatus;
}) {
  const { supabase, user } = await requireUser();
  const status = input.status && APPLICATION_STATUSES.includes(input.status) ? input.status : "saved";
  await supabase.from("applications").insert({
    user_id: user.id,
    job_id: input.jobId ?? null,
    job_title: input.jobTitle,
    company: input.company,
    status,
    applied_at: status === "applied" ? new Date().toISOString().slice(0, 10) : null,
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  if (!APPLICATION_STATUSES.includes(status)) throw new Error("Invalid status");
  const { supabase, user } = await requireUser();
  const patch: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (status === "applied") patch.applied_at = new Date().toISOString().slice(0, 10);
  await supabase.from("applications").update(patch).eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
}

export async function updateApplicationNotes(id: string, notes: string) {
  const { supabase, user } = await requireUser();
  await supabase
    .from("applications")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);
  revalidatePath("/dashboard/applications");
}

export async function deleteApplication(id: string) {
  const { supabase, user } = await requireUser();
  await supabase.from("applications").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
}

// Convert a saved job into a tracked application, then clear the saved row.
export async function trackSavedJob(savedJobId: string, jobTitle: string, company: string, jobId: string | null) {
  const { supabase, user } = await requireUser();
  await supabase.from("applications").insert({
    user_id: user.id,
    job_id: jobId,
    job_title: jobTitle,
    company,
    status: "applied",
    applied_at: new Date().toISOString().slice(0, 10),
  });
  await supabase.from("saved_jobs").delete().eq("id", savedJobId).eq("user_id", user.id);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
}

// ---- Profile ----

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await requireUser();
  const str = (k: string) => {
    const v = String(formData.get(k) ?? "").trim();
    return v === "" ? null : v;
  };
  const targetRoles = (str("target_roles") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await supabase
    .from("profiles")
    .update({
      full_name: str("full_name"),
      university: str("university"),
      degree_level: str("degree_level"),
      degree_subject: str("degree_subject"),
      country_of_origin: str("country_of_origin"),
      visa_type: str("visa_type"),
      visa_expiry_date: str("visa_expiry_date"),
      graduation_date: str("graduation_date"),
      target_industry: str("target_industry"),
      target_roles: targetRoles,
      linkedin_url: str("linkedin_url"),
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
}

// ---- Onboarding ----

// Save the profile from the onboarding form and send the user into the app.
export async function completeOnboarding(formData: FormData) {
  await updateProfile(formData); // writes fields + sets onboarding_completed = true
  redirect("/dashboard");
}

// Let the user skip for now without being nagged again.
export async function skipOnboarding() {
  const { supabase, user } = await requireUser();
  await supabase
    .from("profiles")
    .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
    .eq("id", user.id);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
