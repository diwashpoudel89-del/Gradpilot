"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("This reset link is invalid or expired. Request a new one from the login page.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight">Choose a new password</h1>
      <p className="mt-1.5 text-sm text-slate-600">Use at least 8 characters.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
          className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm new password"
          className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary h-12 w-full px-7 text-sm">
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
