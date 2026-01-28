-- Drop the problematic view
DROP VIEW IF EXISTS public.community_members_public;

-- Replace with a policy that allows public to read rows (but app will filter columns)
CREATE POLICY "Anyone can view community members"
ON public.community_members
FOR SELECT
USING (true);