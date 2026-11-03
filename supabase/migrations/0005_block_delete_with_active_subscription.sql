-- ALREADY APPLIED to the production Supabase project on 2026-11-02 (block_delete_with_active_subscription).
-- Kept here as a record only. DO NOT re-run.

-- Account deletion must never leave a paying Stripe subscription behind.
-- delete_own_account() is callable over the API by any signed-in user, so the
-- guard lives here: deletion is refused while the user has a subscription
-- that is still billable. The app's deleteAccount action cancels it in Stripe
-- and marks the row cancelled first, then calls this function.
create or replace function public.delete_own_account()
returns void language plpgsql security definer set search_path = public, auth as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if exists (
    select 1 from public.subscriptions
    where user_id = uid
      and stripe_subscription_id is not null
      and payment_status in ('active', 'trialing', 'past_due', 'unpaid', 'incomplete')
  ) then
    raise exception 'Cancel your subscription before deleting your account'
      using errcode = 'P0001', hint = 'active_subscription';
  end if;

  delete from public.ai_conversations      where user_id = uid;
  delete from public.applications          where user_id = uid;
  delete from public.cvs                   where user_id = uid;
  delete from public.interview_prep_sessions where user_id = uid;
  delete from public.job_alerts            where user_id = uid;
  delete from public.mentor_requests       where user_id = uid;
  delete from public.notifications         where user_id = uid;
  delete from public.saved_jobs            where user_id = uid;
  delete from public.subscriptions         where user_id = uid;
  delete from public.support_tickets       where user_id = uid;
  delete from public.usage_tracking        where user_id = uid;
  delete from public.visa_deadline_alerts  where user_id = uid;
  delete from public.profiles              where id = uid;

  -- Finally remove the auth identity itself.
  delete from auth.users where id = uid;
end;
$$;
