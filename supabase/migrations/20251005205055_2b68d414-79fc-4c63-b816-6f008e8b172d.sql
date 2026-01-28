-- Create research_publications table
CREATE TABLE public.research_publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  author_names TEXT NOT NULL,
  publication_date DATE,
  publication_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.research_publications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Research publications are viewable by everyone" 
ON public.research_publications 
FOR SELECT 
USING (true);

-- Create policies for admin insert/update/delete
CREATE POLICY "Admins can insert research publications" 
ON public.research_publications 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update research publications" 
ON public.research_publications 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete research publications" 
ON public.research_publications 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_research_publications_updated_at
BEFORE UPDATE ON public.research_publications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Users can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can cancel their own registrations" 
ON public.event_registrations 
FOR DELETE 
USING (user_email = auth.jwt()->>'email');

-- Insert sample research publications
INSERT INTO public.research_publications (title, description, author_names, publication_date, publication_url, category, featured) VALUES
('Antimicrobial Resistance Patterns in Kenyan Hospitals', 'Analysis of antibiotic resistance trends using machine learning algorithms across 15 hospitals in Kenya.', 'Dr. Jane Mwangi, Dr. Peter Ochieng', '2024-03-15', 'https://example.com/research1', 'Antimicrobial Resistance', true),
('Point-of-Care Diagnostic Development for Malaria', 'Novel biosensor technology for rapid malaria detection in rural settings.', 'Dr. Sarah Kimani, Dr. Michael Otieno', '2024-01-20', 'https://example.com/research2', 'Diagnostics', true),
('Genomic Surveillance of COVID-19 Variants', 'Whole genome sequencing analysis of SARS-CoV-2 variants circulating in East Africa.', 'Dr. David Maina, Dr. Grace Wambui', '2023-11-10', 'https://example.com/research3', 'Genomics', false);