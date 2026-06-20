"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { btnOutline, btnPrimary, cn, sizeLg } from "@/lib/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-6xl font-extrabold tracking-tight text-gradient">Oops</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Something went wrong</h1>
        <p className="mx-auto mt-2 text-muted-foreground">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground">Reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className={cn(btnPrimary, sizeLg)}>
            Try again
          </button>
          <Link href="/" className={cn(btnOutline, sizeLg)}>
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
