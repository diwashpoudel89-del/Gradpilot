import { beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Fakes: an in-memory Stripe (subscriptions only) and a Supabase admin client
// that serves one subscriptions row and records updates. No network, no keys.
// ---------------------------------------------------------------------------

type Sub = { id: string; customer: string; status: string };
type Row = {
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  payment_status: string | null;
} | null;

const state = vi.hoisted(() => ({
  subs: new Map<string, { id: string; customer: string; status: string }>(),
  row: null as unknown,
  selectError: null as unknown,
  updateError: null as unknown,
  updates: [] as { table: string; values: Record<string, unknown>; column: string; value: unknown }[],
}));

const stripe = vi.hoisted(() => ({
  subscriptions: {
    list: vi.fn(),
    retrieve: vi.fn(),
    cancel: vi.fn(),
  },
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: state.row, error: state.selectError }),
        }),
      }),
      update: (values: Record<string, unknown>) => ({
        eq: async (column: string, value: unknown) => {
          state.updates.push({ table, values, column, value });
          return { error: state.updateError };
        },
      }),
    }),
  }),
}));

vi.mock("@/lib/stripe", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/stripe")>()),
  getStripe: () => stripe,
}));

import { cancelSubscriptionsForDeletion, dbStatus, hasBillableSubscriptionRow, syncSubscription } from "@/lib/billing";

const USER = "user-123";
const CUSTOMER = "cus_A";

function missing() {
  return Object.assign(new Error("No such subscription"), { code: "resource_missing" });
}

function seed(row: Row, subs: Sub[] = []) {
  state.row = row;
  state.subs = new Map(subs.map((s) => [s.id, { ...s }]));
}

/** Default behaviour mirrors Stripe: list by customer, retrieve by id, cancel sets status. */
function installStripeDefaults() {
  stripe.subscriptions.list.mockImplementation(({ customer }: { customer: string }) => ({
    async *[Symbol.asyncIterator]() {
      for (const s of state.subs.values()) if (s.customer === customer) yield { ...s };
    },
  }));
  stripe.subscriptions.retrieve.mockImplementation(async (id: string) => {
    const s = state.subs.get(id);
    if (!s) throw missing();
    return { ...s };
  });
  stripe.subscriptions.cancel.mockImplementation(async (id: string) => {
    const s = state.subs.get(id);
    if (!s) throw missing();
    if (s.status === "canceled") throw new Error("This subscription is already canceled");
    s.status = "canceled";
    return { ...s };
  });
}

const activeRow: Row = { stripe_customer_id: CUSTOMER, stripe_subscription_id: "sub_1", payment_status: "active" };

beforeEach(() => {
  state.row = null;
  state.subs = new Map();
  state.selectError = null;
  state.updateError = null;
  state.updates = [];
  stripe.subscriptions.list.mockReset();
  stripe.subscriptions.retrieve.mockReset();
  stripe.subscriptions.cancel.mockReset();
  installStripeDefaults();
});

describe("cancelSubscriptionsForDeletion", () => {
  describe("users with nothing to cancel", () => {
    it("does nothing for a user with no subscriptions row", async () => {
      seed(null);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.list).not.toHaveBeenCalled();
      expect(stripe.subscriptions.cancel).not.toHaveBeenCalled();
      expect(state.updates).toEqual([]);
    });

    it("does nothing when the row has no Stripe customer or subscription", async () => {
      seed({ stripe_customer_id: null, stripe_subscription_id: null, payment_status: null });
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.list).not.toHaveBeenCalled();
      expect(state.updates).toEqual([]);
    });

    it("skips subscriptions that are already cancelled or expired", async () => {
      seed({ stripe_customer_id: CUSTOMER, stripe_subscription_id: "sub_1", payment_status: "canceled" }, [
        { id: "sub_1", customer: CUSTOMER, status: "canceled" },
        { id: "sub_0", customer: CUSTOMER, status: "incomplete_expired" },
      ]);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.cancel).not.toHaveBeenCalled();
      expect(state.updates).toEqual([]);
    });

    it("customer who started checkout but never subscribed: no cancel, no update", async () => {
      seed({ stripe_customer_id: CUSTOMER, stripe_subscription_id: null, payment_status: null });
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.list).toHaveBeenCalledOnce();
      expect(stripe.subscriptions.cancel).not.toHaveBeenCalled();
      expect(state.updates).toEqual([]);
    });
  });

  describe("cancelling", () => {
    it("cancels an active subscription immediately with an idempotency key, then marks the row cancelled", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);

      await cancelSubscriptionsForDeletion(USER);

      expect(stripe.subscriptions.cancel).toHaveBeenCalledOnce();
      expect(stripe.subscriptions.cancel).toHaveBeenCalledWith(
        "sub_1",
        expect.objectContaining({ invoice_now: false, prorate: false }),
        { idempotencyKey: "gp-account-delete-cancel-sub_1" }
      );
      expect(state.subs.get("sub_1")!.status).toBe("canceled");
      expect(state.updates).toEqual([
        {
          table: "subscriptions",
          values: { payment_status: "canceled", plan_type: "free", cancel_at_period_end: false },
          column: "user_id",
          value: USER,
        },
      ]);
    });

    it.each(["trialing", "past_due", "unpaid", "incomplete", "paused"])(
      "treats a %s subscription as billable and cancels it",
      async (status) => {
        seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status }]);
        await cancelSubscriptionsForDeletion(USER);
        expect(stripe.subscriptions.cancel).toHaveBeenCalledWith("sub_1", expect.anything(), expect.anything());
      }
    );

    it("cancels every live subscription for the customer, and only those", async () => {
      seed(activeRow, [
        { id: "sub_1", customer: CUSTOMER, status: "active" },
        { id: "sub_2", customer: CUSTOMER, status: "past_due" },
        { id: "sub_old", customer: CUSTOMER, status: "canceled" },
        { id: "sub_other", customer: "cus_SOMEONE_ELSE", status: "active" },
      ]);

      await cancelSubscriptionsForDeletion(USER);

      const cancelled = stripe.subscriptions.cancel.mock.calls.map((c) => c[0]).sort();
      expect(cancelled).toEqual(["sub_1", "sub_2"]);
      expect(state.subs.get("sub_other")!.status).toBe("active");
    });

    it("trusts Stripe over a stale row: cancels a live subscription even if the row says cancelled", async () => {
      seed({ stripe_customer_id: CUSTOMER, stripe_subscription_id: "sub_1", payment_status: "canceled" }, [
        { id: "sub_1", customer: CUSTOMER, status: "active" },
      ]);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.cancel).toHaveBeenCalledOnce();
      expect(state.updates).toHaveLength(1);
    });

    it("also cancels the row's subscription if it sits under a different customer", async () => {
      seed(activeRow, [{ id: "sub_1", customer: "cus_LEGACY", status: "active" }]);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.retrieve).toHaveBeenCalledWith("sub_1");
      expect(stripe.subscriptions.cancel).toHaveBeenCalledWith("sub_1", expect.anything(), expect.anything());
    });

    it("tolerates the row's subscription no longer existing in Stripe, and still clears the row", async () => {
      seed(activeRow, []);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.cancel).not.toHaveBeenCalled();
      expect(state.updates).toHaveLength(1);
    });
  });

  describe("duplicate and concurrent attempts", () => {
    it("is safe to run twice: the second run cancels nothing", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      await cancelSubscriptionsForDeletion(USER);
      await cancelSubscriptionsForDeletion(USER);
      expect(stripe.subscriptions.cancel).toHaveBeenCalledOnce();
    });

    it("succeeds if the subscription was cancelled elsewhere between listing and cancelling", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      stripe.subscriptions.cancel.mockImplementationOnce(async (id: string) => {
        state.subs.get(id)!.status = "canceled"; // e.g. a parallel request or the portal won the race
        throw new Error("This subscription is already canceled");
      });

      await expect(cancelSubscriptionsForDeletion(USER)).resolves.toBeUndefined();
      expect(state.updates).toHaveLength(1);
    });
  });

  describe("failures never report success (so the account is not deleted)", () => {
    it("rejects and does not touch the row when Stripe is unreachable while listing", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      stripe.subscriptions.list.mockImplementation(() => ({
        async *[Symbol.asyncIterator]() {
          throw new Error("Stripe API unavailable");
        },
      }));

      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("Stripe API unavailable");
      expect(stripe.subscriptions.cancel).not.toHaveBeenCalled();
      expect(state.updates).toEqual([]);
    });

    it("rejects when cancel fails and the subscription is still active", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      stripe.subscriptions.cancel.mockRejectedValueOnce(new Error("api_error"));

      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("api_error");
      expect(state.updates).toEqual([]);
    });

    it("rejects when Stripe returns a non-cancelled status from cancel", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      stripe.subscriptions.cancel.mockResolvedValueOnce({ id: "sub_1", customer: CUSTOMER, status: "active" });

      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("still active");
      expect(state.updates).toEqual([]);
    });

    it("stops at the first failure and does not mark the row cancelled", async () => {
      seed(activeRow, [
        { id: "sub_1", customer: CUSTOMER, status: "active" },
        { id: "sub_2", customer: CUSTOMER, status: "active" },
      ]);
      stripe.subscriptions.cancel.mockRejectedValueOnce(new Error("rate_limit"));

      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("rate_limit");
      expect(state.updates).toEqual([]);
    });

    it("rejects on an unexpected error retrieving the row's subscription", async () => {
      seed(activeRow, []);
      stripe.subscriptions.retrieve.mockRejectedValueOnce(
        Object.assign(new Error("Invalid API key"), { code: "api_key_invalid" })
      );
      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("Invalid API key");
      expect(state.updates).toEqual([]);
    });

    it("rejects if the subscriptions row can't be read", async () => {
      state.selectError = new Error("db down");
      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("db down");
      expect(stripe.subscriptions.list).not.toHaveBeenCalled();
    });

    it("rejects if the row can't be marked cancelled (the DB guard would otherwise block deletion anyway)", async () => {
      seed(activeRow, [{ id: "sub_1", customer: CUSTOMER, status: "active" }]);
      state.updateError = new Error("update failed");
      await expect(cancelSubscriptionsForDeletion(USER)).rejects.toThrow("update failed");
    });
  });
});

describe("hasBillableSubscriptionRow", () => {
  it.each([
    [null, false],
    [{ stripe_subscription_id: null, payment_status: "active" }, false],
    [{ stripe_subscription_id: "sub_1", payment_status: "canceled" }, false],
    [{ stripe_subscription_id: "sub_1", payment_status: "active" }, true],
    [{ stripe_subscription_id: "sub_1", payment_status: "past_due" }, true],
    [{ stripe_subscription_id: "sub_1", payment_status: "unpaid" }, true],
  ])("row %j → %s", async (row, expected) => {
    state.row = row;
    await expect(hasBillableSubscriptionRow(USER)).resolves.toBe(expected);
  });
});

describe("syncSubscription (webhook) edge cases", () => {
  const stripeSub = {
    id: "sub_1",
    customer: CUSTOMER,
    status: "canceled",
    metadata: { user_id: USER, plan: "pro" },
    items: { data: [] },
    cancel_at: null,
    cancel_at_period_end: false,
  };

  it("acknowledges events for an account that has been deleted, writing nothing", async () => {
    stripe.subscriptions.retrieve.mockResolvedValueOnce(stripeSub);
    state.row = null; // profile lookup finds no row
    await expect(syncSubscription("sub_1")).resolves.toBeUndefined();
    expect(state.updates).toEqual([]);
  });

  it("throws on a database error so Stripe retries, instead of treating it as a deleted account", async () => {
    stripe.subscriptions.retrieve.mockResolvedValueOnce(stripeSub);
    state.selectError = new Error("connection reset");
    await expect(syncSubscription("sub_1")).rejects.toThrow("connection reset");
    expect(state.updates).toEqual([]);
  });
});

describe("dbStatus", () => {
  it.each([
    ["active", "active"],
    ["trialing", "trialing"],
    ["past_due", "past_due"],
    ["unpaid", "unpaid"],
    ["canceled", "canceled"],
    ["incomplete", "incomplete"],
    ["incomplete_expired", "canceled"],
    ["paused", "incomplete"],
  ] as const)("%s → %s", (stripeStatus, expected) => {
    expect(dbStatus(stripeStatus)).toBe(expected);
  });
});
