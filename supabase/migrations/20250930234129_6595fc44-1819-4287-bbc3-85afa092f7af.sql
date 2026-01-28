-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create news table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create members table
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "News are viewable by everyone" ON public.news FOR SELECT USING (true);
CREATE POLICY "Members are viewable by everyone" ON public.members FOR SELECT USING (true);
CREATE POLICY "Gallery is viewable by everyone" ON public.gallery FOR SELECT USING (true);

-- RLS Policies for public insert on contact forms
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- Insert sample events
INSERT INTO public.events (title, description, event_date, event_type, location) VALUES
('Genomics Workshop 2025', 'Hands-on training in next-generation sequencing and genomic data analysis', '2025-11-15 09:00:00+03', 'Workshop', 'Maseno University Biotech Lab'),
('Annual Biotechnology Conference', 'Bringing together students, researchers, and industry professionals', '2025-12-10 08:00:00+03', 'Conference', 'Maseno University Main Hall'),
('Bioinformatics Bootcamp', 'Introduction to computational biology and data science for biotech students', '2025-10-20 10:00:00+03', 'Training', 'Computer Lab 3');

-- Insert sample news
INSERT INTO public.news (title, excerpt, content, category, published) VALUES
('MUMBSO Wins Research Grant', 'Our organization has been awarded funding for antimicrobial resistance research', 'We are excited to announce that MUMBSO has received a research grant to support student-led projects in antimicrobial resistance surveillance...', 'Achievement', true),
('New Partnership with WHO', 'MUMBSO partners with WHO for genomic epidemiology training', 'The World Health Organization has selected MUMBSO students to participate in their genomic surveillance capacity building program...', 'Partnership', true),
('Student Publishes First Paper', 'MUMBSO member publishes research on point-of-care diagnostics', 'Congratulations to our member who successfully published their undergraduate research on rapid diagnostic tests in a peer-reviewed journal...', 'Research', true);

-- Insert sample members
INSERT INTO public.members (name, position, bio, display_order) VALUES
('Dr. Jane Omondi', 'Faculty Advisor', 'Lecturer in Medical Biotechnology with expertise in molecular diagnostics', 1),
('Peter Kimani', 'President', 'Fourth-year student specializing in genomics and bioinformatics', 2),
('Mary Achieng', 'Vice President', 'Passionate about computational biology and machine learning applications', 3),
('David Otieno', 'Secretary', 'Coordinating outreach programs and community health initiatives', 4),
('Grace Wanjiru', 'Treasurer', 'Managing finances and sponsorships for MUMBSO activities', 5),
('James Ouma', 'Research Lead', 'Leading student research projects in antimicrobial resistance', 6);