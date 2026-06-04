-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Favorites (saved destinations — works for curated slugs OR any geocoded place)
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- "curated" | "place"
  kind text not null check (kind in ('curated','place')),
  -- For curated: slug. For place: "Name|country" or geocoded display string.
  ref text not null,
  name text not null,
  country text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref)
);

grant select, insert, delete on public.favorites to authenticated;
grant all on public.favorites to service_role;

alter table public.favorites enable row level security;

create policy "Users read own favorites"
  on public.favorites for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own favorites"
  on public.favorites for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own favorites"
  on public.favorites for delete to authenticated using (auth.uid() = user_id);

-- Saved AI Itineraries
create table public.saved_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination text not null,
  days int not null,
  budget text not null,
  itinerary jsonb not null,
  created_at timestamptz not null default now()
);

grant select, insert, delete on public.saved_trips to authenticated;
grant all on public.saved_trips to service_role;

alter table public.saved_trips enable row level security;

create policy "Users read own saved trips"
  on public.saved_trips for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own saved trips"
  on public.saved_trips for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own saved trips"
  on public.saved_trips for delete to authenticated using (auth.uid() = user_id);

create index favorites_user_idx on public.favorites(user_id);
create index saved_trips_user_idx on public.saved_trips(user_id);
