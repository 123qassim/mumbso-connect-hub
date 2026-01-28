-- Add community_members table for join subscriptions
CREATE TABLE public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  year_of_study TEXT,
  course TEXT,
  interests TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to join (insert)
CREATE POLICY "Anyone can join as community member" 
ON public.community_members 
FOR INSERT 
WITH CHECK (true);

-- Allow everyone to view community members
CREATE POLICY "Community members are viewable by everyone" 
ON public.community_members 
FOR SELECT 
USING (true);

-- Insert sample gallery images with various categories
INSERT INTO public.gallery (title, image_url, category) VALUES
-- Year 1 students
('Year 1 Lab Session', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800', 'Year 1'),
('First Year Orientation', 'https://images.unsplash.com/photo-1581093458791-9d42e2c08d7d?w=800', 'Year 1'),

-- Year 2 students
('Year 2 Microscopy Workshop', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800', 'Year 2'),
('Molecular Biology Practical', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800', 'Year 2'),

-- Year 3 students
('Year 3 Research Project', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 'Year 3'),
('Genetics Lab Work', 'https://images.unsplash.com/photo-1581093458728-2c3a0c9d9f9c?w=800', 'Year 3'),

-- Year 4 students
('Final Year Thesis Presentation', 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=800', 'Year 4'),
('Senior Project Defense', 'https://images.unsplash.com/photo-1581092160607-ee67f9b9b6f5?w=800', 'Year 4'),

-- Alumni
('Alumni Networking Event', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 'Alumni'),
('Graduate Success Stories', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800', 'Alumni'),

-- Lecturers
('Faculty Seminar', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', 'Lecturers'),
('Guest Lecturer Workshop', 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800', 'Lecturers'),

-- Community Work
('Health Outreach Program', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800', 'Community Work'),
('Village Health Screening', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800', 'Community Work'),
('Medical Camp', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Community Work'),

-- Field Trips
('Genomics Center Visit', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800', 'Field Trips'),
('Industrial Biotechnology Tour', 'https://images.unsplash.com/photo-1581092583537-20d51b2c2f66?w=800', 'Field Trips'),
('Research Institute Visit', 'https://images.unsplash.com/photo-1581093458791-9d42e2c08d7d?w=800', 'Field Trips'),

-- Workshops
('DNA Sequencing Workshop', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', 'Workshops'),
('Bioinformatics Training', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', 'Workshops'),

-- Conferences
('Annual Biotech Conference', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'Conferences'),
('Student Research Symposium', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', 'Conferences');