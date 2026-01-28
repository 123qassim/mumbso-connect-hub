-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;

-- Create a new policy that only allows users to view their own registrations
CREATE POLICY "Users can view own registrations"
ON public.event_registrations
FOR SELECT
USING (
  auth.jwt() ->> 'email' = user_email
);

-- Allow admins to view all registrations
CREATE POLICY "Admins can view all registrations"
ON public.event_registrations
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
);