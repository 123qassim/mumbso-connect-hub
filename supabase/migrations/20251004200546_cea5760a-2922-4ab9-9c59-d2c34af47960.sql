-- Drop the public policy that exposes all data
DROP POLICY IF EXISTS "Public can view basic community member info" ON public.community_members;

-- Create admin-only policy for full access to community_members
CREATE POLICY "Admins can view all community member details"
ON public.community_members
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create a public view that excludes sensitive PII (email, phone)
CREATE OR REPLACE VIEW public.community_members_public AS
SELECT 
  id,
  name,
  course,
  year_of_study,
  interests,
  joined_at
FROM public.community_members;

-- Grant SELECT on the public view to everyone
GRANT SELECT ON public.community_members_public TO anon;
GRANT SELECT ON public.community_members_public TO authenticated;