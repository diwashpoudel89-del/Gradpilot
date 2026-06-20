// These are public client credentials. Database access is still enforced by RLS.
// The fallbacks keep authentication and public data working when a Vercel
// environment has not been configured yet.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://tqpsvhtnoqhrvkntzlvz.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_Gf-8az1tn9zeJars_CxTOA_ghx-G5X3";
