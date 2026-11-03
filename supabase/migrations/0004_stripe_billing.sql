-- ALREADY APPLIED to the production Supabase project on 2026-10-09 (stripe_billing).
-- Kept here as a record only. DO NOT re-run.

-- ============================================================================
-- Stripe billing
-- ============================================================================

-- 1. Users may update their own profile row (RLS), but `plan` and `role` are
--    privileged: only the billing webhook (service role) or a direct DB
--    session may change them. Without this, any signed-in user could grant
--    themselves Premium or admin through the public API.
create or replace function public.protect_privileged_profile_cols()
returns trigger language plpgsql set search_path = public as $$
begin
  if coalesce(auth.role(), '') in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      if new.plan <> 'free' or new.role <> 'user' then
        raise exception 'plan and role cannot be set by the client' using errcode = '42501';
      end if;
    elsif new.plan is distinct from old.plan or new.role is distinct from old.role then
      raise exception 'plan and role cannot be changed by the client' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_privileged_cols on public.profiles;
create trigger protect_privileged_cols
  before insert or update on public.profiles
  for each row execute function public.protect_privileged_profile_cols();

-- 2. Extra subscription detail
alter table public.subscriptions
  add column if not exists stripe_price_id text,
  add column if not exists billing_interval text check (billing_interval in ('month', 'year'));

create unique index if not exists subscriptions_stripe_customer_id_key
  on public.subscriptions (stripe_customer_id) where stripe_customer_id is not null;
create unique index if not exists subscriptions_stripe_subscription_id_key
  on public.subscriptions (stripe_subscription_id) where stripe_subscription_id is not null;

-- 3. Webhook idempotency: each Stripe event id is processed once.
--    RLS on with no policies = service role only.
create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  created_at timestamptz not null default now()
);
alter table public.stripe_events enable row level security;
