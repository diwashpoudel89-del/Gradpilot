"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { btnOutline, btnPrimary, cn, sizeMd } from "@/lib/ui";

export const CONSENT_KEY = "gp_cookie_consent";

export function getConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  try {
    return (localStorage.getItem(CONSENT_KEY) as "accepted" | "rejected" | null) ?? null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!getConsent()) setShow(true);
  }, []);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("gp-consent", { detail: value }));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use essential cookies to run GradPilot, and optional analytics cookies to improve it. See
          our{" "}
          <Link href="/cookies" className="text-primary underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => choose("rejected")} className={cn(btnOutline, sizeMd)}>
            Reject
          </button>
          <button onClick={() => choose("accepted")} className={cn(btnPrimary, sizeMd)}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
