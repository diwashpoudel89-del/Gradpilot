// Public Supabase config. These are publishable, client-side values (the anon key
// is shipped to browsers by design; access is enforced by Row Level Security), so
// baking in safe defaults keeps the app working even if Vercel env vars are unset.
// Override anytime via NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
const DEFAULT_URL = "https://tqpsvhtnoqhrvkntzlvz.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcHN2aHRub3FocnZrbnR6bHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDg4NjQsImV4cCI6MjA5NzAyNDg2NH0.0k0IzwbP7zp7vOMlxoIER17ChyCP01wj3VTD7J3sLag";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
