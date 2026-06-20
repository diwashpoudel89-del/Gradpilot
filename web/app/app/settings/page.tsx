import { createSupabaseServerClient } from "@/lib/auth-server";
import { SettingsForm } from "@/components/settings-form";
import { UpgradeButton, ManageBillingButton } from "@/components/billing-buttons";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: sub }] = await Promise.all([
    supabase
      .from("profiles")
      .select("plan, email_notifications_enabled, weekly_digest_enabled")
      .eq("id", user!.id)
      .maybeSingle(),
    supabase
      .from("subscriptions")
      .select("plan_type, payment_status, current_period_end, cancel_at_period_end")
      .eq("user_id", user!.id)
      .maybeSingle(),
  ]);

  const plan = profile?.plan ?? "free";
  const isPaid = plan === "pro" || plan === "premium";
  const renewal = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>

      {/* Account */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Account</h2>
        <div className="mt-3 rounded-2xl border border-border bg-card p-5">
          <p className="text-sm">
            <span className="text-muted-foreground">Email: </span>
            {user?.email}
          </p>
          <form action="/auth/signout" method="post" className="mt-4">
            <button type="submit" className="text-sm font-medium text-primary underline">
              Sign out
            </button>
          </form>
        </div>
      </section>

      {/* Plan & billing */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Plan &amp; billing</h2>
        <div className="mt-3 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium capitalize">{plan} plan</p>
              {isPaid && (
                <p className="text-sm text-muted-foreground">
                  {sub?.payment_status ?? "active"}
                  {sub?.cancel_at_period_end ? " · cancels at period end" : ""}
                  {renewal ? ` · renews ${renewal}` : ""}
                </p>
              )}
              {!isPaid && (
                <p className="text-sm text-muted-foreground">
                  Upgrade for unlimited AI, GradPath™, and GradShield™.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {isPaid ? (
              <ManageBillingButton />
            ) : (
              <>
                <UpgradeButton plan="pro" label="Upgrade to Pro — £9.99/mo" />
                <UpgradeButton plan="premium" label="Go Premium — £19.99/mo" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Notifications</h2>
        <div className="mt-3">
          <SettingsForm
            userId={user!.id}
            initialEmailNotifs={profile?.email_notifications_enabled ?? true}
            initialWeeklyDigest={profile?.weekly_digest_enabled ?? true}
          />
        </div>
      </section>

      {/* Danger zone */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-red-700">Danger zone</h2>
        <div className="mt-3 rounded-2xl border border-red-200 bg-card p-5">
          <p className="text-sm text-muted-foreground">
            To delete your account and all associated data, email{" "}
            <a className="text-primary underline" href="mailto:hello@gradpilotai.com?subject=Delete%20my%20account">
              hello@gradpilotai.com
            </a>{" "}
            and we'll action it within 30 days, in line with UK GDPR.
          </p>
        </div>
      </section>
    </div>
  );
}
