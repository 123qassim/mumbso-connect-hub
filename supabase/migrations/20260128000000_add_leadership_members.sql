-- Add leadership members that were missing from initial seed data
-- This migration adds the complete leadership structure as requested

-- First, update any existing Collins Ouma entry to have correct title and position
UPDATE public.members
SET name = 'Prof. Collins Ouma',
    position = 'Patron',
    bio = 'Distinguished patron and faculty advisor providing strategic guidance to MUMBSO',
    category = 'patron'
WHERE name LIKE '%Collins%Ouma%' OR (name LIKE '%Collins%' AND position LIKE '%Faculty%');

-- Update Dr. Jane Omondi to be Prof. Collins Ouma (Patron) if it exists
UPDATE public.members
SET name = 'Prof. Collins Ouma',
    position = 'Patron',
    bio = 'Distinguished patron and faculty advisor providing strategic guidance to MUMBSO',
    category = 'patron'
WHERE name = 'Dr. Jane Omondi' AND position = 'Faculty Advisor';

-- If the above doesn't match, insert Prof. Collins Ouma as Patron
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Prof. Collins Ouma', 'Patron', 'Distinguished patron and faculty advisor providing strategic guidance to MUMBSO', 0, 'patron'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name LIKE '%Collins%' AND position = 'Patron'
);

-- Update or insert Chair (Christopher Olila)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Christopher Olila', 'Chair', 'Leading MUMBSO with vision and dedication', 1, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Christopher Olila' AND position = 'Chair'
);

-- Update or insert Vice Chair (June Siata)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'June Siata', 'Vice Chair', 'Supporting organizational leadership and initiatives', 2, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'June Siata' AND position = 'Vice Chair'
);

-- Update or insert Secretary General (Edward Kireu)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Edward Kireu', 'Secretary General', 'Managing organizational communications and records', 3, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Edward Kireu' AND position = 'Secretary General'
);

-- Insert Deputy Secretary General (Brian Junior)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Brian Junior', 'Deputy Secretary General', 'Assisting in organizational management and coordination', 4, 'deputy'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Brian Junior' AND position = 'Deputy Secretary General'
);

-- Update or insert Organizing Secretary (Festus Kiptoo)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Festus Kiptoo', 'Organizing Secretary', 'Coordinating events and organizational activities', 5, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Festus Kiptoo' AND position = 'Organizing Secretary'
);

-- Update or insert Secretary (Alice Odero)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Alice Odero', 'Secretary', 'Managing administrative and secretarial duties', 6, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Alice Odero' AND position = 'Secretary'
);

-- Update or insert Treasurer (Edwin Ogutu)
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'Edwin Ogutu', 'Treasurer', 'Managing financial operations and budgets', 7, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'Edwin Ogutu' AND position = 'Treasurer'
);

-- Add James Ouma as Research Lead only if it doesn't conflict with our updates
INSERT INTO public.members (name, position, bio, display_order, category)
SELECT 'James Ouma', 'Research Lead', 'Leading student research projects in antimicrobial resistance', 8, 'executive'
WHERE NOT EXISTS (
  SELECT 1 FROM public.members WHERE name = 'James Ouma' AND position = 'Research Lead'
);
