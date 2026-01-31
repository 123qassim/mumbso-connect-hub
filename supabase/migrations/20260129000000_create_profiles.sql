-- Create profiles table for user profile information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  surname TEXT,
  email TEXT,
  phone TEXT,
  year_of_study TEXT,
  course TEXT,
  interests TEXT,
  is_alumni BOOLEAN DEFAULT false,
  avatar_url TEXT,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow administrators to view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create community_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  year_of_study TEXT,
  course TEXT,
  interests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for community_members
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_members
CREATE POLICY "Community members are viewable by everyone" ON public.community_members
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert community member" ON public.community_members
  FOR INSERT WITH CHECK (true);