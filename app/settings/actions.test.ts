import { beforeEach, describe, expect, it, vi } from "vitest";

// deleteAccount orchestration: Stripe cancellation must succeed before the
// account-deletion RPC runs, and any failure must leave the account intact.

const m = vi.hoisted(() => ({
  user: { id: "user-123", email: "student@example.com" } as { id: string; email: string } | null,
  stripeConfigured: true,
  adminConfigured: true,
  cancel: vi.fn(),
  hasBillableRow: vi.fn(),
  rpc: vi.fn(),
  signOut: vi.fn(),
  calls: [] as string[],
}));

class RedirectError extends Error {
  constructor(public url: string) {
    super(`NEXT_REDIRECT ${url}`);
  }
}

vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new RedirectError(url);
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/supabase/auth", () => ({ getCurrentUser: async () => m.user }));
vi.mock("@/lib/supabase/admin", () => ({ isAdminConfigured: () => m.adminConfigured }));
vi.mock("@/lib/stripe", () => ({ isStripeConfigured: () => m.stripeConfigured }));
vi.mock("@/lib/billing", () => ({
  cancelSubscriptionsForDeletion: m.cancel,
  hasBillableSubscriptionRow: m.hasBillableRow,
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ rpc: m.rpc, auth: { signOut: m.signOut } }),
}));

import { deleteAccount } from "./actions";

function form(confirm = "DELETE") {
  const fd = new FormData();
  fd.set("confirm", confirm);
  return fd;
}

beforeEach(() => {
  m.user = { id: "user-123", email: "student@example.com" };
  m.stripeConfigured = true;
  m.adminConfigured = true;
  m.calls = [];
  m.cancel.mockReset().mockImplementation(async () => void m.calls.push("cancel"));
  m.hasBillableRow.mockReset().mockResolvedValue(false);
  m.rpc.mockReset().mockImplementation(async () => {
    m.calls.push("rpc");
    return { error: null };
  });
  m.signOut.mockReset().mockResolvedValue({ error: null });
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("deleteAccount", () => {
  it("redirects signed-out users to login without doing anything", async () => {
    m.user = null;
    await expect(deleteAccount(null, form())).rejects.toMatchObject({ url: "/login?next=/settings" });
    expect(m.cancel).not.toHaveBeenCalled();
    expect(m.rpc).not.toHaveBeenCalled();
  });

  it.each(["", "delete", "DELET", "yes"])("requires typing DELETE (got %j)", async (text) => {
    await expect(deleteAccount(null, form(text))).resolves.toEqual({ error: "Type DELETE to confirm." });
    expect(m.cancel).not.toHaveBeenCalled();
    expect(m.rpc).not.toHaveBeenCalled();
  });

  it("cancels Stripe billing first, then deletes the account, signs out and redirects", async () => {
    await expect(deleteAccount(null, form())).rejects.toMatchObject({ url: "/?account=deleted" });
    expect(m.cancel).toHaveBeenCalledWith("user-123");
    expect(m.calls).toEqual(["cancel", "rpc"]);
    expect(m.rpc).toHaveBeenCalledWith("delete_own_account");
    expect(m.signOut).toHaveBeenCalled();
  });

  it("does NOT delete the account when Stripe cancellation fails", async () => {
    m.cancel.mockRejectedValueOnce(new Error("Stripe API unavailable"));

    const result = await deleteAccount(null, form());

    expect(result?.error).toMatch(/couldn't cancel your subscription.*not been deleted/i);
    expect(m.rpc).not.toHaveBeenCalled();
    expect(m.signOut).not.toHaveBeenCalled();
  });

  it("refuses when billing is switched off but the user still has a live subscription", async () => {
    m.stripeConfigured = false;
    m.hasBillableRow.mockResolvedValueOnce(true);

    const result = await deleteAccount(null, form());

    expect(result?.error).toMatch(/couldn't cancel your subscription/i);
    expect(m.cancel).not.toHaveBeenCalled();
    expect(m.rpc).not.toHaveBeenCalled();
  });

  it("deletes free users normally when billing is switched off", async () => {
    m.stripeConfigured = false;
    await expect(deleteAccount(null, form())).rejects.toMatchObject({ url: "/?account=deleted" });
    expect(m.cancel).not.toHaveBeenCalled();
    expect(m.rpc).toHaveBeenCalledOnce();
  });

  it("falls back to the database guard when no service role is configured", async () => {
    m.stripeConfigured = false;
    m.adminConfigured = false;
    m.rpc.mockResolvedValueOnce({ error: { message: "Cancel your subscription…", hint: "active_subscription" } });

    const result = await deleteAccount(null, form());

    expect(m.hasBillableRow).not.toHaveBeenCalled();
    expect(result?.error).toMatch(/cancel your subscription in Plan & billing/i);
    expect(m.signOut).not.toHaveBeenCalled();
  });

  it("reports a generic error if the deletion RPC fails, without signing out", async () => {
    m.rpc.mockResolvedValueOnce({ error: { message: "boom", hint: null } });
    await expect(deleteAccount(null, form())).resolves.toEqual({
      error: "We couldn't delete your account. Please try again.",
    });
    expect(m.signOut).not.toHaveBeenCalled();
  });

  it("still redirects if sign-out fails after the account is gone", async () => {
    m.signOut.mockRejectedValueOnce(new Error("session already invalid"));
    await expect(deleteAccount(null, form())).rejects.toMatchObject({ url: "/?account=deleted" });
  });
});
