-- Bookmarks Table
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ref text not null, -- curated slug or dynamic place reference
  name text not null,
  country text,
  created_at timestamptz not null default now(),
  unique (user_id, ref)
);

grant select, insert, delete on public.bookmarks to authenticated;
grant all on public.bookmarks to service_role;

alter table public.bookmarks enable row level security;

create policy "Users read own bookmarks"
  on public.bookmarks for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own bookmarks"
  on public.bookmarks for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own bookmarks"
  on public.bookmarks for delete to authenticated using (auth.uid() = user_id);

create index bookmarks_user_idx on public.bookmarks(user_id);


-- Reviews & Ratings Table
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  place_ref text not null, -- Name|country or curated slug
  rating int not null check (rating >= 1 and rating <= 5),
  content text not null,
  display_name text, -- Cache reviewer name
  created_at timestamptz not null default now()
);

grant select on public.reviews to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;

alter table public.reviews enable row level security;

create policy "Reviews are publicly readable"
  on public.reviews for select using (true);
create policy "Users insert own reviews"
  on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own reviews"
  on public.reviews for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own reviews"
  on public.reviews for delete to authenticated using (auth.uid() = user_id);

create index reviews_place_idx on public.reviews(place_ref);


-- Search History Table
create table public.search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade, -- Nullable for guest search logging
  query text not null,
  created_at timestamptz not null default now()
);

grant select, insert on public.search_history to authenticated, anon;
grant all on public.search_history to service_role;

alter table public.search_history enable row level security;

create policy "Users read own search history"
  on public.search_history for select to authenticated using (auth.uid() = user_id);
create policy "Anyone can insert search logs"
  on public.search_history for insert to authenticated, anon with check (
    (auth.uid() is null and user_id is null) or (auth.uid() = user_id)
  );

create index search_history_user_idx on public.search_history(user_id);
create index search_history_query_idx on public.search_history(query);


-- Travel Plans Table (Extending or supplementing saved_trips)
create table public.travel_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination text not null,
  start_date date,
  end_date date,
  itinerary jsonb not null,
  budget_preference text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.travel_plans to authenticated;
grant all on public.travel_plans to service_role;

alter table public.travel_plans enable row level security;

create policy "Users read own travel plans"
  on public.travel_plans for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own travel plans"
  on public.travel_plans for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own travel plans"
  on public.travel_plans for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own travel plans"
  on public.travel_plans for delete to authenticated using (auth.uid() = user_id);

create index travel_plans_user_idx on public.travel_plans(user_id);
