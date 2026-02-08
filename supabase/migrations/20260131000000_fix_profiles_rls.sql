-- Add missing INSERT policy for profiles table
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Add missing column to profiles table if needed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_alumni BOOLEAN DEFAULT false;

-- Update community_members schema to match what's being inserted
ALTER TABLE public.community_members ADD COLUMN IF NOT EXISTS is_alumni BOOLEAN DEFAULT false;
