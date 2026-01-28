-- Update existing tiers with new pricing
UPDATE public.membership_tiers 
SET price = 200, duration_months = 12, name = 'Student (Annual)'
WHERE name = 'Student';

UPDATE public.membership_tiers 
SET price = 500, duration_months = 12, name = 'Alumni (Annual)'
WHERE name = 'Professional';

UPDATE public.membership_tiers 
SET price = 5000, duration_months = 12, name = 'Institutional (Annual)'
WHERE name = 'Institutional';

-- Insert semester payment options (6 months, half price)
INSERT INTO public.membership_tiers (name, price, duration_months, description, benefits, active)
VALUES 
  ('Student (Semester)', 100, 6, 'Student membership - Semester payment', 
   '{"workshops": true, "events": true, "networking": true, "resources": true}'::jsonb, true),
  ('Alumni (Semester)', 250, 6, 'Alumni membership - Semester payment', 
   '{"workshops": true, "events": true, "networking": true, "resources": true, "mentorship": true, "priority_access": true}'::jsonb, true),
  ('Institutional (Semester)', 2500, 6, 'Institutional partnership - Semester payment', 
   '{"workshops": true, "events": true, "networking": true, "resources": true, "mentorship": true, "priority_access": true, "sponsorship": true, "branding": true}'::jsonb, true)
ON CONFLICT DO NOTHING;