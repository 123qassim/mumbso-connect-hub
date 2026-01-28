-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Testimonials are viewable by everyone"
ON public.testimonials
FOR SELECT
USING (true);

-- Create policy for admin management
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  category TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing of published posts
CREATE POLICY "Published blog posts are viewable by everyone"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Create policy for authors to manage their own posts
CREATE POLICY "Authors can manage their own posts"
ON public.blog_posts
FOR ALL
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Create policy for admins to manage all posts
CREATE POLICY "Admins can manage all blog posts"
ON public.blog_posts
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create trigger for updating timestamps
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, content, featured) VALUES
('Dr. Sarah Johnson', 'Lecturer - Molecular Biology', 'The students in MUMBSO demonstrate exceptional dedication to advancing biotechnology research. Their initiatives inspire the next generation.', true),
('Michael Chen', 'Alumni - Class of 2023', 'Being part of MUMBSO was transformative. The hands-on research experience and mentorship prepared me for my career in biotech.', true),
('Emily Rodriguez', 'Current Member', 'MUMBSO provides incredible opportunities to engage with cutting-edge research and connect with industry professionals.', false);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_name, category, published, published_at) VALUES
('CRISPR Technology: The Future of Gene Editing', 'crispr-technology-future-gene-editing', 'Exploring how CRISPR-Cas9 is revolutionizing genetic engineering and therapeutic applications.', 'CRISPR technology has opened new frontiers in genetic research...', 'John Smith', 'Research', true, now()),
('Career Paths in Biotechnology', 'career-paths-biotechnology', 'A comprehensive guide to various career opportunities in the biotech industry.', 'The biotechnology field offers diverse career paths from research to industry...', 'Maria Garcia', 'Career', true, now()),
('Recent Advances in Synthetic Biology', 'advances-synthetic-biology', 'Overview of breakthrough developments in synthetic biology and their implications.', 'Synthetic biology continues to push boundaries in creating novel biological systems...', 'David Lee', 'Research', true, now());