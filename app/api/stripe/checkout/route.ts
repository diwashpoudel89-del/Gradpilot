import { NextRequest, NextResponse } from "next/server";
import { PRICE_BY_PLAN, stripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/auth-server";

export const runtime = "nodejs";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gradpilotai.com";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Billing isn't configured yet." }, { status: 503 });
  }

  let plan = "";
  try {
    plan = String((await req.json())?.plan ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const price = PRICE_BY_PLAN[plan];
  if (!price) {
    return NextResponse.json({ error: "Unknown or unconfigured plan." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in first.", requiresAuth: true }, { status: 401 });
  }

  // Reuse an existing Stripe customer if we have one.
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("id, stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id ?? undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    const row = {
      user_id: user.id,
      stripe_customer_id: customerId,
      stripe_email: user.email ?? null,
    };
    if (sub?.id) {
      await supabase.from("subscriptions").update(row).eq("id", sub.id);
    } else {
      await supabase.from("subscriptions").insert(row);
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    client_reference_id: user.id,
    metadata: { user_id: user.id, plan },
    allow_promotion_codes: true,
    success_url: `${SITE}/app/settings?upgraded=1`,
    cancel_url: `${SITE}/app/settings`,
  });

  return NextResponse.json({ url: session.url });
}
