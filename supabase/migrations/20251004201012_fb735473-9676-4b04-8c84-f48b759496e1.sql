-- Remove the public access policy
DROP POLICY IF EXISTS "Anyone can view community members" ON public.community_members;

-- Create policy for authenticated users to view basic info
-- (Application will filter columns, but this prevents direct DB access)
CREATE POLICY "Authenticated users can view community members"
ON public.community_members
FOR SELECT
TO authenticated
USING (true);

-- The existing admin policy already gives admins full access
-- Policy: "Admins can view all community member details"