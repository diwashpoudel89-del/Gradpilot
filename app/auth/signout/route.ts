import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";

export async function POST(request: NextRequest) {
  if (supabaseConfigured) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
