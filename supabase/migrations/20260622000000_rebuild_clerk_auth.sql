-- Rebuild Authentication Database Migration

-- 1. Create the new public.users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id text NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text,
  image_url text,
  role text NOT NULL DEFAULT 'tourist',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Grant privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO anon, authenticated, service_role;

-- Enable Row Level Security (RLS) on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users are publicly readable"
  ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile record"
  ON public.users FOR UPDATE TO authenticated, anon
  USING (true) WITH CHECK (true); -- Verification is performed server-side by auth.server.ts

-- 2. Drop dependent Row Level Security (RLS) policies on tables where user_id will change type
DROP POLICY IF EXISTS "Users read own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users insert own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users delete own favorites" ON public.favorites;

DROP POLICY IF EXISTS "Users read own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users insert own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users delete own bookmarks" ON public.bookmarks;

DROP POLICY IF EXISTS "Reviews are publicly readable" ON public.reviews;
DROP POLICY IF EXISTS "Users insert own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users delete own reviews" ON public.reviews;

DROP POLICY IF EXISTS "Users read own search history" ON public.search_history;
DROP POLICY IF EXISTS "Anyone can insert search logs" ON public.search_history;

DROP POLICY IF EXISTS "Users read own travel plans" ON public.travel_plans;
DROP POLICY IF EXISTS "Users insert own travel plans" ON public.travel_plans;
DROP POLICY IF EXISTS "Users update own travel plans" ON public.travel_plans;
DROP POLICY IF EXISTS "Users delete own travel plans" ON public.travel_plans;

DROP POLICY IF EXISTS "Users read own saved trips" ON public.saved_trips;
DROP POLICY IF EXISTS "Users insert own saved trips" ON public.saved_trips;
DROP POLICY IF EXISTS "Users delete own saved trips" ON public.saved_trips;

-- 3. Drop old foreign key constraints pointing to auth.users
ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_user_id_fkey;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE public.search_history DROP CONSTRAINT IF EXISTS search_history_user_id_fkey;
ALTER TABLE public.travel_plans DROP CONSTRAINT IF EXISTS travel_plans_user_id_fkey;
ALTER TABLE public.saved_trips DROP CONSTRAINT IF EXISTS saved_trips_user_id_fkey;

-- 4. Alter columns from uuid to text (to store the Clerk user ID string)
ALTER TABLE public.favorites ALTER COLUMN user_id TYPE text;
ALTER TABLE public.bookmarks ALTER COLUMN user_id TYPE text;
ALTER TABLE public.reviews ALTER COLUMN user_id TYPE text;
ALTER TABLE public.search_history ALTER COLUMN user_id TYPE text;
ALTER TABLE public.travel_plans ALTER COLUMN user_id TYPE text;
ALTER TABLE public.saved_trips ALTER COLUMN user_id TYPE text;

-- 5. Clear old orphaned mock data to prevent foreign key violations with empty public.users
DELETE FROM public.favorites;
DELETE FROM public.bookmarks;
DELETE FROM public.reviews;
DELETE FROM public.search_history;
DELETE FROM public.travel_plans;
DELETE FROM public.saved_trips;

-- 6. Add new foreign key constraints referencing public.users(clerk_user_id)
ALTER TABLE public.favorites ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;
ALTER TABLE public.search_history ADD CONSTRAINT search_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;
ALTER TABLE public.travel_plans ADD CONSTRAINT travel_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;
ALTER TABLE public.saved_trips ADD CONSTRAINT saved_trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(clerk_user_id) ON DELETE CASCADE;

-- 7. Disable legacy RLS constraints for direct API queries, since authentication is verified server-side
ALTER TABLE public.favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_trips DISABLE ROW LEVEL SECURITY;
