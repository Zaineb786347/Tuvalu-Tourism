-- Seed helper for Tuvalu Tourism (run after schema.sql)
-- 1) Register a user via the app (Auth > Register) using your email.
-- 2) Replace YOUR_EMAIL@example.com below with that email and run.

-- Promote this account to provider
UPDATE public.profiles
SET role = 'provider', full_name = COALESCE(full_name, 'Demo Provider')
WHERE email = 'YOUR_EMAIL@example.com';

-- Insert a sample listing for the provider using the 'homestays' category
INSERT INTO public.listings (
  provider_id,
  category_id,
  title,
  slug,
  description,
  short_description,
  price,
  currency,
  location,
  max_capacity,
  images,
  amenities,
  is_active,
  featured
)
SELECT
  p.id as provider_id,
  c.id as category_id,
  'Beachfront Family Homestay' as title,
  'beachfront-family-homestay' as slug,
  'Experience authentic Tuvaluan hospitality right by the beach. Includes meals and guided village tour.' as description,
  'Authentic homestay by the beach' as short_description,
  65.00 as price,
  'USD' as currency,
  'Funafuti, Tuvalu' as location,
  4 as max_capacity,
  ARRAY[
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    'https://images.unsplash.com/photo-1470214304380-aadaedcfff62'
  ]::text[] as images,
  ARRAY['WiFi','Meals Included','Beach Access','Airport Pickup']::text[] as amenities,
  true as is_active,
  true as featured
FROM public.profiles p
CROSS JOIN LATERAL (
  SELECT id FROM public.categories WHERE slug = 'homestays' LIMIT 1
) c
WHERE p.email = 'YOUR_EMAIL@example.com'
ON CONFLICT (slug) DO NOTHING;
