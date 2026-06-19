import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the email-confirmation / OAuth code exchange.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    try {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch {
      return NextResponse.redirect(`${origin}/login?error=auth`);
    }
  }
  return NextResponse.redirect(`${origin}${next}`);
}
