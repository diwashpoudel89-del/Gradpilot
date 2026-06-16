#!/usr/bin/env python3
"""Generate the GradPilot Supabase security + performance hardening migration.

Fixes:
 - function_search_path_mutable (set_updated_at)
 - SECURITY DEFINER functions executable by anon/authenticated (handle_new_user, is_admin)
 - rls_policy_always_true (waitlist insert)
 - multiple_permissive_policies (split ALL policies into per-command, single policy per cmd/role)
 - auth_rls_initplan (wrap auth.uid()/is_admin() in scalar subqueries)
 - unindexed_foreign_keys (add 8 covering indexes)
Semantics are preserved from the original policy set.
"""

# (table, policyname) pairs to drop — full existing set
EXISTING = [
 ("ai_conversations","ai_conversations_admin_read"),("ai_conversations","ai_conversations_owner"),
 ("announcements","announcements_admin"),("announcements","announcements_read"),
 ("applications","applications_admin_read"),("applications","applications_owner"),
 ("blog_posts","blog_posts_admin"),("blog_posts","blog_posts_read"),
 ("company_info","company_info_admin"),("company_info","company_info_read"),
 ("company_values","company_values_admin"),("company_values","company_values_read"),
 ("cvs","cvs_admin_read"),("cvs","cvs_owner"),
 ("employer_insights","employer_insights_admin"),("employer_insights","employer_insights_read"),
 ("faqs","faqs_admin"),("faqs","faqs_read"),
 ("how_it_works_steps","how_it_works_steps_admin"),("how_it_works_steps","how_it_works_steps_read"),
 ("interview_prep_sessions","interview_prep_sessions_admin_read"),("interview_prep_sessions","interview_prep_sessions_owner"),
 ("interview_questions","interview_questions_admin"),("interview_questions","interview_questions_read"),
 ("job_alerts","job_alerts_admin_read"),("job_alerts","job_alerts_owner"),
 ("jobs","jobs_admin"),("jobs","jobs_read"),
 ("mentor_requests","mentor_requests_admin_read"),("mentor_requests","mentor_requests_owner"),
 ("mentors","mentors_admin"),("mentors","mentors_read"),
 ("notifications","notifications_admin_read"),("notifications","notifications_owner"),
 ("pain_points","pain_points_admin"),("pain_points","pain_points_read"),
 ("platform_features","platform_features_admin"),("platform_features","platform_features_read"),
 ("pricing_plans","pricing_plans_admin"),("pricing_plans","pricing_plans_read"),
 ("profiles","profiles_insert"),("profiles","profiles_self"),("profiles","profiles_update"),
 ("room_listings","rooms_owner"),("room_listings","rooms_read"),
 ("saved_jobs","saved_jobs_admin_read"),("saved_jobs","saved_jobs_owner"),
 ("site_content","site_content_admin"),("site_content","site_content_read"),
 ("subscriptions","subscriptions_owner"),
 ("support_tickets","support_tickets_admin_read"),("support_tickets","support_tickets_owner"),
 ("target_segments","target_segments_admin"),("target_segments","target_segments_read"),
 ("team_members","team_members_admin"),("team_members","team_members_read"),
 ("testimonials","testimonials_admin"),("testimonials","testimonials_read"),
 ("uk_guidance_services","uk_guidance_services_admin"),("uk_guidance_services","uk_guidance_services_read"),
 ("usage_tracking","usage_owner"),
 ("visa_deadline_alerts","visa_deadline_alerts_admin_read"),("visa_deadline_alerts","visa_deadline_alerts_owner"),
 ("waitlist_submissions","waitlist_admin_read"),("waitlist_submissions","waitlist_insert"),
]

UID = "(select auth.uid())"
ADMIN = "(select public.is_admin())"

# CMS tables with public read = true
CMS_PUBLIC = ["blog_posts","company_info","company_values","employer_insights","faqs",
 "how_it_works_steps","interview_questions","jobs","mentors","pain_points",
 "platform_features","pricing_plans","site_content","target_segments","team_members",
 "uk_guidance_services"]
# CMS read restricted to authenticated
CMS_AUTH = ["announcements"]
# user-owned: owner full CRUD + admin read (column user_id)
OWNED = ["ai_conversations","applications","cvs","interview_prep_sessions","job_alerts",
 "mentor_requests","notifications","saved_jobs","support_tickets","visa_deadline_alerts"]

out = []
def w(s=""): out.append(s)

w("-- GradPilot AI — Supabase security & performance hardening")
w("-- Generated migration. Preserves original access semantics.")
w("")
w("-- 1. Drop existing policies -------------------------------------------------")
for t,p in EXISTING:
    w(f'DROP POLICY IF EXISTS "{p}" ON public.{t};')
w("")

w("-- 2. Harden functions ------------------------------------------------------")
w("""CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;""")
w("-- handle_new_user is a trigger only; remove RPC exposure")
w("REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;")
w("-- is_admin is used only inside policies evaluated for signed-in users")
w("REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;")
w("GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;")
w("")

w("-- 3. CMS / content tables (public read; admin writes) ----------------------")
for t in CMS_PUBLIC:
    w(f'CREATE POLICY "{t}_read" ON public.{t} FOR SELECT TO public USING (true);')
    w(f'CREATE POLICY "{t}_admin_insert" ON public.{t} FOR INSERT TO authenticated WITH CHECK ({ADMIN});')
    w(f'CREATE POLICY "{t}_admin_update" ON public.{t} FOR UPDATE TO authenticated USING ({ADMIN}) WITH CHECK ({ADMIN});')
    w(f'CREATE POLICY "{t}_admin_delete" ON public.{t} FOR DELETE TO authenticated USING ({ADMIN});')
w("")

w("-- announcements (authenticated read; admin writes)")
for t in CMS_AUTH:
    w(f'CREATE POLICY "{t}_read" ON public.{t} FOR SELECT TO authenticated USING (true);')
    w(f'CREATE POLICY "{t}_admin_insert" ON public.{t} FOR INSERT TO authenticated WITH CHECK ({ADMIN});')
    w(f'CREATE POLICY "{t}_admin_update" ON public.{t} FOR UPDATE TO authenticated USING ({ADMIN}) WITH CHECK ({ADMIN});')
    w(f'CREATE POLICY "{t}_admin_delete" ON public.{t} FOR DELETE TO authenticated USING ({ADMIN});')
w("")

w("-- testimonials (public sees published; admin full)")
w('CREATE POLICY "testimonials_read" ON public.testimonials FOR SELECT TO public USING (is_published = true);')
w(f'CREATE POLICY "testimonials_admin_read" ON public.testimonials FOR SELECT TO authenticated USING ({ADMIN});')
w(f'CREATE POLICY "testimonials_admin_insert" ON public.testimonials FOR INSERT TO authenticated WITH CHECK ({ADMIN});')
w(f'CREATE POLICY "testimonials_admin_update" ON public.testimonials FOR UPDATE TO authenticated USING ({ADMIN}) WITH CHECK ({ADMIN});')
w(f'CREATE POLICY "testimonials_admin_delete" ON public.testimonials FOR DELETE TO authenticated USING ({ADMIN});')
w("")

w("-- room_listings (public sees active; owner + admin manage)")
w('CREATE POLICY "rooms_read" ON public.room_listings FOR SELECT TO public USING (is_active = true);')
w(f'CREATE POLICY "rooms_owner_read" ON public.room_listings FOR SELECT TO authenticated USING ({UID} = posted_by OR {ADMIN});')
w(f'CREATE POLICY "rooms_owner_insert" ON public.room_listings FOR INSERT TO authenticated WITH CHECK ({UID} = posted_by OR {ADMIN});')
w(f'CREATE POLICY "rooms_owner_update" ON public.room_listings FOR UPDATE TO authenticated USING ({UID} = posted_by OR {ADMIN}) WITH CHECK ({UID} = posted_by OR {ADMIN});')
w(f'CREATE POLICY "rooms_owner_delete" ON public.room_listings FOR DELETE TO authenticated USING ({UID} = posted_by OR {ADMIN});')
w("")

w("-- 4. User-owned tables (owner CRUD; admin read) ----------------------------")
for t in OWNED:
    w(f'CREATE POLICY "{t}_select" ON public.{t} FOR SELECT TO authenticated USING ({UID} = user_id OR {ADMIN});')
    w(f'CREATE POLICY "{t}_insert" ON public.{t} FOR INSERT TO authenticated WITH CHECK ({UID} = user_id);')
    w(f'CREATE POLICY "{t}_update" ON public.{t} FOR UPDATE TO authenticated USING ({UID} = user_id) WITH CHECK ({UID} = user_id);')
    w(f'CREATE POLICY "{t}_delete" ON public.{t} FOR DELETE TO authenticated USING ({UID} = user_id);')
w("")

w("-- profiles")
w(f'CREATE POLICY "profiles_select" ON public.profiles FOR SELECT TO authenticated USING ({UID} = id OR {ADMIN});')
w(f'CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK ({UID} = id);')
w(f'CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE TO authenticated USING ({UID} = id) WITH CHECK ({UID} = id);')
w("")

w("-- subscriptions & usage_tracking (read-only to owner/admin; writes via service role)")
w(f'CREATE POLICY "subscriptions_select" ON public.subscriptions FOR SELECT TO authenticated USING ({UID} = user_id OR {ADMIN});')
w(f'CREATE POLICY "usage_select" ON public.usage_tracking FOR SELECT TO authenticated USING ({UID} = user_id OR {ADMIN});')
w("")

w("-- waitlist_submissions (validated public insert; admin read)")
w("""CREATE POLICY "waitlist_insert" ON public.waitlist_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(btrim(full_name)) > 0 AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\\.[^@[:space:]]+$');""")
w(f'CREATE POLICY "waitlist_admin_read" ON public.waitlist_submissions FOR SELECT TO authenticated USING ({ADMIN});')
w("")

w("-- 5. Add covering indexes for foreign keys ---------------------------------")
fks = [("applications","job_id"),("job_alerts","user_id"),("mentor_requests","mentor_id"),
 ("mentor_requests","user_id"),("room_listings","posted_by"),("saved_jobs","job_id"),
 ("support_tickets","user_id"),("visa_deadline_alerts","user_id")]
for t,c in fks:
    w(f'CREATE INDEX IF NOT EXISTS idx_{t}_{c} ON public.{t}({c});')

open("/home/user/Gradpilot/supabase/migrations/0001_security_perf_hardening.sql","w").write("\n".join(out)+"\n")
print("\n".join(out))
print("\n-- statements:", len(out))
