-- Fix event_registrations RLS to allow public inserts
DROP POLICY IF EXISTS "Users can register for events" ON public.event_registrations;

CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);
