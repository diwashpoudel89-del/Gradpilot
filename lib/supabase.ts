import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-config";

// Browser client used by the waitlist form. RLS on the `waitlist` table
// restricts inserts to a validated (name + email) shape, so the anon key is safe.
export const supabaseEnabled = true;
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
