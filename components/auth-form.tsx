"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "").trim();
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
          },
        });
        if (error) throw error;
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.push(next);
          router.refresh();
        } else {
          setInfo("Check your email to confirm your account, then sign in.");
          setStatus("idle");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
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
        {error && <p className="text-sm text-red-600">{error}</p>}
        {info && <p className="text-sm text-emerald-600">{info}</p>}
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
