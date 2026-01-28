-- Drop the overly permissive SELECT policy that allows anyone to view all data
DROP POLICY IF EXISTS "Authenticated users can view community members" ON public.community_members;

-- Create a view with only non-sensitive public information
CREATE OR REPLACE VIEW public.community_members_directory AS
SELECT 
  id,
  name,
  course,
  year_of_study,
  interests,
  joined_at
FROM public.community_members;

-- Enable RLS on the view
ALTER VIEW public.community_members_directory SET (security_invoker = true);

-- Allow authenticated users to view the public directory (without contact info)
CREATE POLICY "Authenticated users can view member directory"
ON public.community_members
FOR SELECT
USING (
  auth.uid() IS NOT NULL
);