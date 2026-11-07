-- 0006_adzuna_jobs
-- Adds external job sources (Adzuna) to public.jobs without removing anything.
--
-- * source / external_id   - where a job came from; (source, external_id) is unique,
--                            so re-syncing the same Adzuna advert updates it in place.
-- * source_url             - the provider's link to the original advert (Adzuna redirect_url).
-- * source_created_at      - when the provider says the advert was posted.
-- * last_seen_at           - last successful sync that returned this advert (expiry).
-- * salary_is_predicted    - Adzuna estimated the salary (we don't display estimates).
-- * category/contract_type - provider metadata.
-- * dedupe_key/is_duplicate- the same role reposted under different ids is shown once.
--
-- The rows that exist when this runs are the sample jobs imported from Base44
-- (verified 2026-11-07: 30 rows in Preview and Production, none linked from
-- saved_jobs or applications). They are re-labelled source = 'sample', not
-- deleted, so they can be hidden from the board. RE-CHECK before applying to
-- Production in case real manual jobs have been added since.

alter table public.jobs
  add column if not exists source text not null default 'manual',
  add column if not exists external_id text,
  add column if not exists source_url text,
  add column if not exists source_created_at timestamptz,
  add column if not exists last_seen_at timestamptz,
  add column if not exists salary_is_predicted boolean,
  add column if not exists category text,
  add column if not exists contract_type text,
  add column if not exists dedupe_key text,
  add column if not exists is_duplicate boolean not null default false;

alter table public.jobs
  drop constraint if exists jobs_source_check,
  add constraint jobs_source_check check (source in ('manual', 'sample', 'adzuna'));

-- NULL external_ids (manual jobs) never conflict with each other.
alter table public.jobs
  drop constraint if exists jobs_source_external_id_key,
  add constraint jobs_source_external_id_key unique (source, external_id);

create index if not exists idx_jobs_board on public.jobs (is_active, is_duplicate, posted_at desc);
create index if not exists idx_jobs_dedupe_key on public.jobs (dedupe_key) where dedupe_key is not null;
create index if not exists idx_jobs_source_last_seen on public.jobs (source, last_seen_at);

update public.jobs set source = 'sample' where source = 'manual' and external_id is null;

-- One row per sync attempt, for monitoring. Service role only (RLS on, no policies).
create table if not exists public.job_sync_runs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  status text not null default 'running'
    check (status in ('running', 'success', 'partial', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  requests_made integer not null default 0,
  jobs_received integer not null default 0,
  jobs_upserted integer not null default 0,
  jobs_deactivated integer not null default 0,
  error text
);
alter table public.job_sync_runs enable row level security;
create index if not exists idx_job_sync_runs_started on public.job_sync_runs (source, started_at desc);

-- Hide expired adverts: not returned by recent successful syncs, or too old.
-- Rows are deactivated, never deleted (saved_jobs/applications may reference them).
create or replace function public.deactivate_stale_jobs(
  p_source text,
  p_seen_before timestamptz,
  p_posted_before timestamptz
) returns integer
language sql
security definer
set search_path = public
as $$
  with stale as (
    update public.jobs
       set is_active = false
     where source = p_source
       and is_active
       and (last_seen_at < p_seen_before or source_created_at < p_posted_before)
    returning 1
  )
  select count(*)::integer from stale;
$$;

-- Among active adverts sharing a dedupe_key, keep the newest visible.
create or replace function public.mark_duplicate_jobs() returns integer
language sql
security definer
set search_path = public
as $$
  with ranked as (
    select id,
           row_number() over (
             partition by dedupe_key
             order by source_created_at desc nulls last, id
           ) > 1 as dup
      from public.jobs
     where is_active and dedupe_key is not null
  ), changed as (
    update public.jobs j
       set is_duplicate = r.dup
      from ranked r
     where j.id = r.id and j.is_duplicate is distinct from r.dup
    returning 1
  )
  select count(*)::integer from changed;
$$;

revoke all on function public.deactivate_stale_jobs(text, timestamptz, timestamptz) from public, anon, authenticated;
revoke all on function public.mark_duplicate_jobs() from public, anon, authenticated;
grant execute on function public.deactivate_stale_jobs(text, timestamptz, timestamptz) to service_role;
grant execute on function public.mark_duplicate_jobs() to service_role;
