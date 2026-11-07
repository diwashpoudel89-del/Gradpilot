"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [sessionReady, setSessionReady] = useState(false);

  // The callback route has already exchanged the code for a session by the
  // time the user lands here. We just verify a session exists so we don't
  // show a useless form to unauthenticated visitors.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSessionReady(true);
      } else {
        // No valid session — the link may have expired.
        router.replace("/login?error=reset_expired");
      }
    });
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setStatus("idle");
    } else {
      setStatus("done");
    }
  }

  if (!sessionReady) {
    return (
      <div className="text-center text-sm text-slate-600 py-8">
        Verifying your reset link…
      </div>
    );
  }

  if (status === "done") {
    return (
      <div>
        <div className="mb-4 text-3xl">🔐</div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Password updated</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your password has been changed successfully. You&apos;re still signed in.
        </p>
        <div className="mt-6">
          <Link href="/dashboard" className="btn-primary h-11 px-6 text-sm">
            Go to dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight">Set a new password</h1>
      <p className="mt-1.5 text-sm text-slate-600">
        Choose a strong password of at least 8 characters.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">
            Confirm new password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary h-12 w-full px-7 text-sm"
        >
          {status === "loading" ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
