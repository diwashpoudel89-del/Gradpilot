"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level error boundary. Catches unhandled errors in any page below the
// root and shows a branded recovery screen instead of a raw stack trace.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[60vh] place-items-center px-5 py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-semibold text-brand-600">Something went wrong</p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">
          We hit an unexpected error
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Sorry about that — the issue has been logged. You can try again, or head back home.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={reset} className="btn-primary h-11 px-6 text-sm">Try again</button>
          <Link href="/" className="btn-outline h-11 px-6 text-sm">Back to home</Link>
        </div>
        {error.digest && <p className="mt-6 text-xs text-slate-400">Reference: {error.digest}</p>}
      </div>
    </div>
  );
}
