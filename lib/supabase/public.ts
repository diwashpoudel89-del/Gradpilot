import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

// Cookieless Supabase client for public, anon-readable content (jobs, blog,
// mentors, FAQs, pricing…). Because it never touches next/headers cookies(),
// pages that only use it can be statically rendered / ISR-cached.
export function createPublicClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
