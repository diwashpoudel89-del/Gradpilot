-- GradPilot AI — Supabase security & performance hardening
-- Generated migration. Preserves original access semantics.

-- 1. Drop existing policies -------------------------------------------------
DROP POLICY IF EXISTS "ai_conversations_admin_read" ON public.ai_conversations;
DROP POLICY IF EXISTS "ai_conversations_owner" ON public.ai_conversations;
DROP POLICY IF EXISTS "announcements_admin" ON public.announcements;
DROP POLICY IF EXISTS "announcements_read" ON public.announcements;
DROP POLICY IF EXISTS "applications_admin_read" ON public.applications;
DROP POLICY IF EXISTS "applications_owner" ON public.applications;
DROP POLICY IF EXISTS "blog_posts_admin" ON public.blog_posts;
DROP POLICY IF EXISTS "blog_posts_read" ON public.blog_posts;
DROP POLICY IF EXISTS "company_info_admin" ON public.company_info;
DROP POLICY IF EXISTS "company_info_read" ON public.company_info;
DROP POLICY IF EXISTS "company_values_admin" ON public.company_values;
DROP POLICY IF EXISTS "company_values_read" ON public.company_values;
DROP POLICY IF EXISTS "cvs_admin_read" ON public.cvs;
DROP POLICY IF EXISTS "cvs_owner" ON public.cvs;
DROP POLICY IF EXISTS "employer_insights_admin" ON public.employer_insights;
DROP POLICY IF EXISTS "employer_insights_read" ON public.employer_insights;
DROP POLICY IF EXISTS "faqs_admin" ON public.faqs;
DROP POLICY IF EXISTS "faqs_read" ON public.faqs;
DROP POLICY IF EXISTS "how_it_works_steps_admin" ON public.how_it_works_steps;
DROP POLICY IF EXISTS "how_it_works_steps_read" ON public.how_it_works_steps;
DROP POLICY IF EXISTS "interview_prep_sessions_admin_read" ON public.interview_prep_sessions;
DROP POLICY IF EXISTS "interview_prep_sessions_owner" ON public.interview_prep_sessions;
DROP POLICY IF EXISTS "interview_questions_admin" ON public.interview_questions;
DROP POLICY IF EXISTS "interview_questions_read" ON public.interview_questions;
DROP POLICY IF EXISTS "job_alerts_admin_read" ON public.job_alerts;
DROP POLICY IF EXISTS "job_alerts_owner" ON public.job_alerts;
DROP POLICY IF EXISTS "jobs_admin" ON public.jobs;
DROP POLICY IF EXISTS "jobs_read" ON public.jobs;
DROP POLICY IF EXISTS "mentor_requests_admin_read" ON public.mentor_requests;
DROP POLICY IF EXISTS "mentor_requests_owner" ON public.mentor_requests;
DROP POLICY IF EXISTS "mentors_admin" ON public.mentors;
DROP POLICY IF EXISTS "mentors_read" ON public.mentors;
DROP POLICY IF EXISTS "notifications_admin_read" ON public.notifications;
DROP POLICY IF EXISTS "notifications_owner" ON public.notifications;
DROP POLICY IF EXISTS "pain_points_admin" ON public.pain_points;
DROP POLICY IF EXISTS "pain_points_read" ON public.pain_points;
DROP POLICY IF EXISTS "platform_features_admin" ON public.platform_features;
DROP POLICY IF EXISTS "platform_features_read" ON public.platform_features;
DROP POLICY IF EXISTS "pricing_plans_admin" ON public.pricing_plans;
DROP POLICY IF EXISTS "pricing_plans_read" ON public.pricing_plans;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "rooms_owner" ON public.room_listings;
DROP POLICY IF EXISTS "rooms_read" ON public.room_listings;
DROP POLICY IF EXISTS "saved_jobs_admin_read" ON public.saved_jobs;
DROP POLICY IF EXISTS "saved_jobs_owner" ON public.saved_jobs;
DROP POLICY IF EXISTS "site_content_admin" ON public.site_content;
DROP POLICY IF EXISTS "site_content_read" ON public.site_content;
DROP POLICY IF EXISTS "subscriptions_owner" ON public.subscriptions;
DROP POLICY IF EXISTS "support_tickets_admin_read" ON public.support_tickets;
DROP POLICY IF EXISTS "support_tickets_owner" ON public.support_tickets;
DROP POLICY IF EXISTS "target_segments_admin" ON public.target_segments;
DROP POLICY IF EXISTS "target_segments_read" ON public.target_segments;
DROP POLICY IF EXISTS "team_members_admin" ON public.team_members;
DROP POLICY IF EXISTS "team_members_read" ON public.team_members;
DROP POLICY IF EXISTS "testimonials_admin" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_read" ON public.testimonials;
DROP POLICY IF EXISTS "uk_guidance_services_admin" ON public.uk_guidance_services;
DROP POLICY IF EXISTS "uk_guidance_services_read" ON public.uk_guidance_services;
DROP POLICY IF EXISTS "usage_owner" ON public.usage_tracking;
DROP POLICY IF EXISTS "visa_deadline_alerts_admin_read" ON public.visa_deadline_alerts;
DROP POLICY IF EXISTS "visa_deadline_alerts_owner" ON public.visa_deadline_alerts;
DROP POLICY IF EXISTS "waitlist_admin_read" ON public.waitlist_submissions;
DROP POLICY IF EXISTS "waitlist_insert" ON public.waitlist_submissions;

-- 2. Harden functions ------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;
-- handle_new_user is a trigger only; remove RPC exposure
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- is_admin is used only inside policies evaluated for signed-in users
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 3. CMS / content tables (public read; admin writes) ----------------------
CREATE POLICY "blog_posts_read" ON public.blog_posts FOR SELECT TO public USING (true);
CREATE POLICY "blog_posts_admin_insert" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "blog_posts_admin_update" ON public.blog_posts FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "blog_posts_admin_delete" ON public.blog_posts FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "company_info_read" ON public.company_info FOR SELECT TO public USING (true);
CREATE POLICY "company_info_admin_insert" ON public.company_info FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "company_info_admin_update" ON public.company_info FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "company_info_admin_delete" ON public.company_info FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "company_values_read" ON public.company_values FOR SELECT TO public USING (true);
CREATE POLICY "company_values_admin_insert" ON public.company_values FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "company_values_admin_update" ON public.company_values FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "company_values_admin_delete" ON public.company_values FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "employer_insights_read" ON public.employer_insights FOR SELECT TO public USING (true);
CREATE POLICY "employer_insights_admin_insert" ON public.employer_insights FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "employer_insights_admin_update" ON public.employer_insights FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "employer_insights_admin_delete" ON public.employer_insights FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "faqs_read" ON public.faqs FOR SELECT TO public USING (true);
CREATE POLICY "faqs_admin_insert" ON public.faqs FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "faqs_admin_update" ON public.faqs FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "faqs_admin_delete" ON public.faqs FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "how_it_works_steps_read" ON public.how_it_works_steps FOR SELECT TO public USING (true);
CREATE POLICY "how_it_works_steps_admin_insert" ON public.how_it_works_steps FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "how_it_works_steps_admin_update" ON public.how_it_works_steps FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "how_it_works_steps_admin_delete" ON public.how_it_works_steps FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "interview_questions_read" ON public.interview_questions FOR SELECT TO public USING (true);
CREATE POLICY "interview_questions_admin_insert" ON public.interview_questions FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "interview_questions_admin_update" ON public.interview_questions FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "interview_questions_admin_delete" ON public.interview_questions FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "jobs_read" ON public.jobs FOR SELECT TO public USING (true);
CREATE POLICY "jobs_admin_insert" ON public.jobs FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "jobs_admin_update" ON public.jobs FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "jobs_admin_delete" ON public.jobs FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "mentors_read" ON public.mentors FOR SELECT TO public USING (true);
CREATE POLICY "mentors_admin_insert" ON public.mentors FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "mentors_admin_update" ON public.mentors FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "mentors_admin_delete" ON public.mentors FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "pain_points_read" ON public.pain_points FOR SELECT TO public USING (true);
CREATE POLICY "pain_points_admin_insert" ON public.pain_points FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "pain_points_admin_update" ON public.pain_points FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "pain_points_admin_delete" ON public.pain_points FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "platform_features_read" ON public.platform_features FOR SELECT TO public USING (true);
CREATE POLICY "platform_features_admin_insert" ON public.platform_features FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "platform_features_admin_update" ON public.platform_features FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "platform_features_admin_delete" ON public.platform_features FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "pricing_plans_read" ON public.pricing_plans FOR SELECT TO public USING (true);
CREATE POLICY "pricing_plans_admin_insert" ON public.pricing_plans FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "pricing_plans_admin_update" ON public.pricing_plans FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "pricing_plans_admin_delete" ON public.pricing_plans FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "site_content_read" ON public.site_content FOR SELECT TO public USING (true);
CREATE POLICY "site_content_admin_insert" ON public.site_content FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "site_content_admin_update" ON public.site_content FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "site_content_admin_delete" ON public.site_content FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "target_segments_read" ON public.target_segments FOR SELECT TO public USING (true);
CREATE POLICY "target_segments_admin_insert" ON public.target_segments FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "target_segments_admin_update" ON public.target_segments FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "target_segments_admin_delete" ON public.target_segments FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "team_members_read" ON public.team_members FOR SELECT TO public USING (true);
CREATE POLICY "team_members_admin_insert" ON public.team_members FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "team_members_admin_update" ON public.team_members FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "team_members_admin_delete" ON public.team_members FOR DELETE TO authenticated USING ((select public.is_admin()));
CREATE POLICY "uk_guidance_services_read" ON public.uk_guidance_services FOR SELECT TO public USING (true);
CREATE POLICY "uk_guidance_services_admin_insert" ON public.uk_guidance_services FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "uk_guidance_services_admin_update" ON public.uk_guidance_services FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "uk_guidance_services_admin_delete" ON public.uk_guidance_services FOR DELETE TO authenticated USING ((select public.is_admin()));

-- announcements (authenticated read; admin writes)
CREATE POLICY "announcements_read" ON public.announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "announcements_admin_insert" ON public.announcements FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "announcements_admin_update" ON public.announcements FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "announcements_admin_delete" ON public.announcements FOR DELETE TO authenticated USING ((select public.is_admin()));

-- testimonials (public sees published; admin full)
CREATE POLICY "testimonials_read" ON public.testimonials FOR SELECT TO public USING (is_published = true);
CREATE POLICY "testimonials_admin_read" ON public.testimonials FOR SELECT TO authenticated USING ((select public.is_admin()));
CREATE POLICY "testimonials_admin_insert" ON public.testimonials FOR INSERT TO authenticated WITH CHECK ((select public.is_admin()));
CREATE POLICY "testimonials_admin_update" ON public.testimonials FOR UPDATE TO authenticated USING ((select public.is_admin())) WITH CHECK ((select public.is_admin()));
CREATE POLICY "testimonials_admin_delete" ON public.testimonials FOR DELETE TO authenticated USING ((select public.is_admin()));

-- room_listings (public sees active; owner + admin manage)
CREATE POLICY "rooms_read" ON public.room_listings FOR SELECT TO public USING (is_active = true);
CREATE POLICY "rooms_owner_read" ON public.room_listings FOR SELECT TO authenticated USING ((select auth.uid()) = posted_by OR (select public.is_admin()));
CREATE POLICY "rooms_owner_insert" ON public.room_listings FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = posted_by OR (select public.is_admin()));
CREATE POLICY "rooms_owner_update" ON public.room_listings FOR UPDATE TO authenticated USING ((select auth.uid()) = posted_by OR (select public.is_admin())) WITH CHECK ((select auth.uid()) = posted_by OR (select public.is_admin()));
CREATE POLICY "rooms_owner_delete" ON public.room_listings FOR DELETE TO authenticated USING ((select auth.uid()) = posted_by OR (select public.is_admin()));

-- 4. User-owned tables (owner CRUD; admin read) ----------------------------
CREATE POLICY "ai_conversations_select" ON public.ai_conversations FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "ai_conversations_insert" ON public.ai_conversations FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "ai_conversations_update" ON public.ai_conversations FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "ai_conversations_delete" ON public.ai_conversations FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "applications_select" ON public.applications FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "applications_insert" ON public.applications FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "applications_update" ON public.applications FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "applications_delete" ON public.applications FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "cvs_select" ON public.cvs FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "cvs_insert" ON public.cvs FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "cvs_update" ON public.cvs FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "cvs_delete" ON public.cvs FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "interview_prep_sessions_select" ON public.interview_prep_sessions FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "interview_prep_sessions_insert" ON public.interview_prep_sessions FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "interview_prep_sessions_update" ON public.interview_prep_sessions FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "interview_prep_sessions_delete" ON public.interview_prep_sessions FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "job_alerts_select" ON public.job_alerts FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "job_alerts_insert" ON public.job_alerts FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "job_alerts_update" ON public.job_alerts FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "job_alerts_delete" ON public.job_alerts FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "mentor_requests_select" ON public.mentor_requests FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "mentor_requests_insert" ON public.mentor_requests FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "mentor_requests_update" ON public.mentor_requests FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "mentor_requests_delete" ON public.mentor_requests FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "notifications_insert" ON public.notifications FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "notifications_update" ON public.notifications FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "notifications_delete" ON public.notifications FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "saved_jobs_select" ON public.saved_jobs FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "saved_jobs_insert" ON public.saved_jobs FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "saved_jobs_update" ON public.saved_jobs FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "saved_jobs_delete" ON public.saved_jobs FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "support_tickets_select" ON public.support_tickets FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "support_tickets_insert" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "support_tickets_update" ON public.support_tickets FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "support_tickets_delete" ON public.support_tickets FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "visa_deadline_alerts_select" ON public.visa_deadline_alerts FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "visa_deadline_alerts_insert" ON public.visa_deadline_alerts FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "visa_deadline_alerts_update" ON public.visa_deadline_alerts FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "visa_deadline_alerts_delete" ON public.visa_deadline_alerts FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

-- profiles
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT TO authenticated USING ((select auth.uid()) = id OR (select public.is_admin()));
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE TO authenticated USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id);

-- subscriptions & usage_tracking (read-only to owner/admin; writes via service role)
CREATE POLICY "subscriptions_select" ON public.subscriptions FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));
CREATE POLICY "usage_select" ON public.usage_tracking FOR SELECT TO authenticated USING ((select auth.uid()) = user_id OR (select public.is_admin()));

-- waitlist_submissions (validated public insert; admin read)
CREATE POLICY "waitlist_insert" ON public.waitlist_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(btrim(full_name)) > 0 AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');
CREATE POLICY "waitlist_admin_read" ON public.waitlist_submissions FOR SELECT TO authenticated USING ((select public.is_admin()));

-- 5. Add covering indexes for foreign keys ---------------------------------
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_alerts_user_id ON public.job_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_mentor_id ON public.mentor_requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_user_id ON public.mentor_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_room_listings_posted_by ON public.room_listings(posted_by);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_job_id ON public.saved_jobs(job_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_visa_deadline_alerts_user_id ON public.visa_deadline_alerts(user_id);
