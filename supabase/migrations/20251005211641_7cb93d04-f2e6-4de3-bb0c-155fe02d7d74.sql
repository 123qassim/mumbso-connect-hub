-- Fix function search path for generate_membership_number
CREATE OR REPLACE FUNCTION generate_membership_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.memberships;
  new_number := 'MUMBSO-' || LPAD(counter::TEXT, 6, '0');
  RETURN new_number;
END;
$$;

-- Fix function search path for set_membership_number
CREATE OR REPLACE FUNCTION set_membership_number()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.membership_number IS NULL THEN
    NEW.membership_number := generate_membership_number();
  END IF;
  RETURN NEW;
END;
$$;