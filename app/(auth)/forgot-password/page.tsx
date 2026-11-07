"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand";

// Can't export metadata from a client component, so the title is set via
// the auth layout's document title fallback. If you need a per-page title
// here, convert the outer shell to a server component and render a client
// child for the form.

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=/auth/reset-password`
          : "https://gradpilotai.com/auth/callback?next=/auth/reset-password",
    });
    if (error) {
      setError(error.message);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div>
        <div className="mb-4 text-3xl">📬</div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Check your inbox</h1>
        <p className="mt-2 text-sm text-slate-600">
          We sent a password reset link to <strong>{email}</strong>. Click it to set a new password.
          The link expires in 1 hour.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Didn&apos;t get it? Check your spam folder, or{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-medium text-brand-600 hover:underline"
          >
            try again
          </button>
          .
        </p>
        <div className="mt-6">
          <Link href="/login" className="text-sm font-medium text-brand-600 hover:underline">
            ← Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight">Reset your password</h1>
      <p className="mt-1.5 text-sm text-slate-600">
        Enter your email address and we&apos;ll send you a link to set a new password.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            placeholder="jane@university.ac.uk"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary h-12 w-full px-7 text-sm"
        >
          {status === "loading" ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
