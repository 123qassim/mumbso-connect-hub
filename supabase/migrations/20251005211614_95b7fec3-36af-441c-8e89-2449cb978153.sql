-- Create membership tiers table
CREATE TABLE public.membership_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 12,
  benefits JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.membership_tiers(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  qr_code TEXT,
  membership_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  payment_method TEXT NOT NULL CHECK (payment_method IN ('stripe', 'mpesa', 'paypal')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  transaction_id TEXT,
  receipt_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Membership tiers policies
CREATE POLICY "Membership tiers viewable by everyone"
ON public.membership_tiers FOR SELECT
USING (active = true);

CREATE POLICY "Admins can manage membership tiers"
ON public.membership_tiers FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Memberships policies
CREATE POLICY "Users can view own membership"
ON public.memberships FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own membership"
ON public.memberships FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all memberships"
ON public.memberships FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update memberships"
ON public.memberships FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Payments policies
CREATE POLICY "Users can view own payments"
ON public.payments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments"
ON public.payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
ON public.payments FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_memberships_updated_at
BEFORE UPDATE ON public.memberships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate membership number
CREATE OR REPLACE FUNCTION generate_membership_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.memberships;
  new_number := 'MUMBSO-' || LPAD(counter::TEXT, 6, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate membership number
CREATE OR REPLACE FUNCTION set_membership_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.membership_number IS NULL THEN
    NEW.membership_number := generate_membership_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_membership_number
BEFORE INSERT ON public.memberships
FOR EACH ROW
EXECUTE FUNCTION set_membership_number();

-- Insert sample membership tiers
INSERT INTO public.membership_tiers (name, description, price, duration_months, benefits) VALUES
('Student', 'Full access to all MUMBSO events and resources', 500.00, 12, '{"events": true, "resources": true, "workshops": true, "networking": true}'::jsonb),
('Professional', 'Premium membership for alumni and professionals', 2000.00, 12, '{"events": true, "resources": true, "workshops": true, "networking": true, "mentorship": true, "priority_access": true}'::jsonb),
('Institutional', 'Partnership membership for organizations', 10000.00, 12, '{"events": true, "resources": true, "workshops": true, "networking": true, "mentorship": true, "priority_access": true, "branding": true, "sponsorship": true}'::jsonb);