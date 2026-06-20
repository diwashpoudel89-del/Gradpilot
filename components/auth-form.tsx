"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/auth-browser";
import { btnPrimary, cn, sizeLg } from "@/lib/ui";

export function AuthForm({
  mode,
  next,
  initialError,
}: {
  mode: "login" | "signup";
  next?: string;
  initialError?: string;
}) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError ?? "");
  const [info, setInfo] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const dest = next && next.startsWith("/") ? next : "/app";

  function confirmationRedirect() {
    const callback = new URL("/auth/callback", window.location.origin);
    callback.searchParams.set("next", dest);
    return callback.toString();
  }

  async function resendConfirmation() {
    if (!confirmationEmail) return;
    setLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: confirmationEmail,
        options: { emailRedirectTo: confirmationRedirect() },
      });
      if (error) throw error;
      setInfo("We sent a fresh confirmation link. Check your inbox and spam folder.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not resend the email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const normalizedEmail = email.trim().toLowerCase();

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: confirmationRedirect(),
          },
        });
        if (error) throw error;

        if (data.session) {
          router.push(dest);
          router.refresh();
        } else {
          setConfirmationEmail(normalizedEmail);
          setInfo("Check your email to confirm your account. The link will sign you in automatically.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) {
          if (error.message.toLowerCase().includes("email not confirmed")) {
            setConfirmationEmail(normalizedEmail);
            throw new Error("Please confirm your email before signing in.");
          }
          if (error.message.toLowerCase().includes("invalid login credentials")) {
            throw new Error("The email or password is incorrect.");
          }
          throw error;
        }
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (info) {
    return (
      <div className="rounded-2xl border border-border bg-card/70 p-6 text-center">
        <p className="font-display text-lg font-semibold">Almost there 🎉</p>
        <p className="mt-2 text-sm text-muted-foreground">{info}</p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {confirmationEmail && (
          <button
            type="button"
            disabled={loading}
            onClick={resendConfirmation}
            className="mt-4 text-sm text-primary underline disabled:opacity-50"
          >
            Resend confirmation email
          </button>
        )}
        <Link href="/login" className="mt-4 inline-block text-sm text-primary underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {isSignup && (
        <input
          type="text"
          required
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-card px-4 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
        />
      )}
      <input
        type="email"
        required
        autoComplete="email"
        placeholder="you@university.ac.uk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 w-full rounded-xl border border-border bg-card px-4 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
      />
      <input
        type="password"
        required
        autoComplete={isSignup ? "new-password" : "current-password"}
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-12 w-full rounded-xl border border-border bg-card px-4 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-[var(--primary)]/30"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      {confirmationEmail && !isSignup && (
        <button
          type="button"
          disabled={loading}
          onClick={resendConfirmation}
          className="text-sm text-primary underline disabled:opacity-50"
        >
          Resend confirmation email
        </button>
      )}

      <button type="submit" disabled={loading} className={cn(btnPrimary, sizeLg, "w-full")}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {isSignup ? "Create account" : "Sign in"}
      </button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to GradPilot?{" "}
            <Link href="/signup" className="text-primary underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
