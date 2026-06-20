"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const requestedNext = params.get("next");
  const next = requestedNext?.startsWith("/") ? requestedNext : "/dashboard";
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState(
    params.get("error") === "confirmation_failed"
      ? "That confirmation link is invalid or has expired. Please request a new one."
      : ""
  );
  const [info, setInfo] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  async function sendPasswordReset() {
    const input = document.querySelector<HTMLInputElement>('#email');
    const email = input?.value.trim().toLowerCase() ?? "";
    if (!email) {
      setError("Enter your email address first, then request a password reset.");
      return;
    }

    setStatus("loading");
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setInfo("Password reset email sent. Check your inbox and spam folder.");
    }
    setStatus("idle");
  }

  function confirmationRedirect() {
    const callback = new URL("/auth/callback", window.location.origin);
    callback.searchParams.set("next", next);
    return callback.toString();
  }

  async function resendConfirmation() {
    if (!confirmationEmail) return;
    setStatus("loading");
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: confirmationEmail,
      options: { emailRedirectTo: confirmationRedirect() },
    });
    if (error) {
      setError(error.message);
    } else {
      setInfo("We sent a fresh confirmation link. Check your inbox and spam folder.");
    }
    setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "").trim();
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: confirmationRedirect(),
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push(next);
          router.refresh();
        } else {
          setConfirmationEmail(email);
          setInfo("Check your email to confirm your account. The link will sign you in automatically.");
          setStatus("idle");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.toLowerCase().includes("email not confirmed")) {
            setConfirmationEmail(email);
            throw new Error("Please confirm your email before signing in.");
          }
          if (error.message.toLowerCase().includes("invalid login credentials")) {
            throw new Error("The email or password is incorrect.");
          }
          throw error;
        }
        router.push(next);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1.5 text-sm text-slate-600">
        {mode === "signup" ? "Start finding visa-sponsoring jobs today." : "Sign in to your GradPilot dashboard."}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">Full name</label>
            <input id="fullName" name="fullName" required className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="Jane Doe" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="jane@university.ac.uk" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={6} className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="••••••••" />
        </div>
        {mode === "login" && (
          <button
            type="button"
            onClick={sendPasswordReset}
            disabled={status === "loading"}
            className="text-sm font-medium text-brand-600 hover:underline disabled:opacity-50"
          >
            Forgot your password?
          </button>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {info && <p className="text-sm text-emerald-600">{info}</p>}
        {confirmationEmail && (
          <button
            type="button"
            disabled={status === "loading"}
            onClick={resendConfirmation}
            className="text-sm font-medium text-brand-600 hover:underline disabled:opacity-50"
          >
            Resend confirmation email
          </button>
        )}
        <button type="submit" disabled={status === "loading"} className="btn-primary h-12 w-full px-7 text-sm">
          {status === "loading" ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {mode === "signup" ? (
          <>Already have an account? <Link href="/login" className="font-medium text-brand-600 hover:underline">Sign in</Link></>
        ) : (
          <>New to GradPilot? <Link href="/signup" className="font-medium text-brand-600 hover:underline">Create an account</Link></>
        )}
      </p>
    </div>
  );
}
