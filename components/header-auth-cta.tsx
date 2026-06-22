"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// Resolves auth state on the client so the site header stays cookieless and
// marketing pages can be statically rendered / ISR-cached. Renders the
// signed-out CTA until the session check resolves.
export function HeaderAuthCta() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.user));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(Boolean(session?.user));
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (signedIn) {
    return (
      <Link href="/dashboard" className="btn-primary h-10 px-5 text-sm">
        Dashboard
      </Link>
    );
  }

  return (
    <>
      <Link href="/login" className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 sm:inline">
        Sign in
      </Link>
      <Link href="/signup" className="btn-primary h-10 px-5 text-sm">
        Get started
      </Link>
    </>
  );
}
