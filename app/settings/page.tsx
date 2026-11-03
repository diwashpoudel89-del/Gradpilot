import Link from "next/link";
import type { Metadata } from "next";
import { DeleteAccountForm } from "@/components/delete-account-form";
import { getCurrentUser, getProfile } from "@/lib/supabase/auth";

export const metadata: Metadata = { title: "Settings", robots: { index: false } };

export default async function SettingsPage() {
  const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
  const plan = profile?.plan ?? "free";

  return (
    <main className="container-x max-w-3xl py-10">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
      <p className="mt-1 text-slate-600">Manage your account and subscription.</p>

      <div className="card mt-8 p-6">
        <h2 className="font-semibold text-slate-900">Account</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Signed in as</p>
            <p className="font-medium text-slate-900">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge bg-brand-50 capitalize text-brand-700">{plan} plan</span>
            <Link href="/settings/plan" className="text-sm font-medium text-brand-600 hover:underline">
              {plan === "free" ? "Upgrade" : "Manage plan & billing"}
            </Link>
          </div>
        </div>
      </div>

      <DeleteAccountForm hasPaidPlan={plan !== "free"} />
    </main>
  );
}
