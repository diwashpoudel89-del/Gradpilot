"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/auth";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { cancelSubscriptionsForDeletion, hasBillableSubscriptionRow } from "@/lib/billing";
import { isStripeConfigured } from "@/lib/stripe";

export type DeleteAccountState = { error?: string } | null;

/**
 * Permanently delete the signed-in user's account. Any Stripe subscription is
 * cancelled first; if that can't be confirmed, the account is left intact so
 * the user is never deleted while still being billed.
 */
export async function deleteAccount(
  _prev: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/settings");

  if (String(formData.get("confirm") ?? "").trim() !== "DELETE") {
    return { error: "Type DELETE to confirm." };
  }

  try {
    if (isStripeConfigured() && isAdminConfigured()) {
      await cancelSubscriptionsForDeletion(user.id);
    } else if (isAdminConfigured() && (await hasBillableSubscriptionRow(user.id))) {
      // Billing is off on this deployment but the user has a live subscription.
      return { error: "We couldn't cancel your subscription right now. Please try again later or contact support." };
    }
  } catch (err) {
    console.error("[account] subscription cancellation failed", err);
    return {
      error:
        "We couldn't cancel your subscription, so your account has not been deleted. Please try again, or cancel it from Plan & billing first.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_own_account");
  if (error) {
    console.error("[account] delete_own_account failed", error.message);
    return {
      error:
        error.hint === "active_subscription"
          ? "Please cancel your subscription in Plan & billing before deleting your account."
          : "We couldn't delete your account. Please try again.",
    };
  }

  // The auth user is gone; clear the session cookies.
  await supabase.auth.signOut().catch(() => {});
  revalidatePath("/", "layout");
  redirect("/?account=deleted");
}
