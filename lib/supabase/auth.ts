import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";

export type Plan = "free" | "pro" | "premium";

// Authenticated user, verified with Supabase Auth. Cached per request.
export const getCurrentUser = cache(async () => {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
});

// The signed-in user's profile fields used by billing. Cached per request.
export const getProfile = cache(
  async (): Promise<{ id: string; full_name: string | null; plan: Plan } | null> => {
    const user = await getCurrentUser();
    if (!user) return null;
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, plan")
      .eq("id", user.id)
      .maybeSingle();
    return (data as { id: string; full_name: string | null; plan: Plan } | null) ?? null;
  }
);
