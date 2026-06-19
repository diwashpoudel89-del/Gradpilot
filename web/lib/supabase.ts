import { createClient } from "@supabase/supabase-js";

// Browser client used by the waitlist form. RLS on the `waitlist` table
// restricts inserts to a validated (name + email) shape, so the anon key is safe.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && anonKey);

export const supabase = supabaseEnabled
  ? createClient(url as string, anonKey as string)
  : null;
