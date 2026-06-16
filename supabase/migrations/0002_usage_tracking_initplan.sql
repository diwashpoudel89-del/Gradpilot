-- Fix auth_rls_initplan on usage_tracking write policies (Base44-managed table).
-- Note: Base44 re-syncs RLS on its tables, so these may be regenerated upstream.
DROP POLICY IF EXISTS "usage_insert" ON public.usage_tracking;
DROP POLICY IF EXISTS "usage_update" ON public.usage_tracking;
CREATE POLICY "usage_insert" ON public.usage_tracking FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "usage_update" ON public.usage_tracking FOR UPDATE TO authenticated
  USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
