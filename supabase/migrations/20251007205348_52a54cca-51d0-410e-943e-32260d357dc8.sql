-- Add image_url column to members table
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS image_url text;

-- Update Christopher Olila's profile with the new image
UPDATE public.members 
SET image_url = '/src/assets/olila-profile.jpg'
WHERE name ILIKE '%olila%';