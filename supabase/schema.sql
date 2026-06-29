-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. PROFILES ---------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by the owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by the owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper used inside policies to check if the current user is an admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer set search_path = public;

-- 2. CATEGORIES ---------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Categories are viewable by authenticated users"
  on public.categories for select
  using (auth.role() = 'authenticated');

create policy "Categories are writable by admins"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- 3. COMPONENTS ---------------------------------------------------------------
create table if not exists public.components (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  best_use_case text,
  specs jsonb not null default '{}'::jsonb,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.components enable row level security;

create policy "Components are viewable by authenticated users"
  on public.components for select
  using (auth.role() = 'authenticated');

create policy "Components are writable by admins"
  on public.components for all
  using (public.is_admin())
  with check (public.is_admin());

-- 4. STORAGE -------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('component-images', 'component-images', true)
on conflict (id) do nothing;

create policy "Component images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'component-images');

create policy "Admins can upload component images"
  on storage.objects for insert
  with check (bucket_id = 'component-images' and public.is_admin());

create policy "Admins can update component images"
  on storage.objects for update
  using (bucket_id = 'component-images' and public.is_admin());

create policy "Admins can delete component images"
  on storage.objects for delete
  using (bucket_id = 'component-images' and public.is_admin());

-- 5. SKETCHES (Coding Zone) ----------------------------------------------------
create table if not exists public.sketches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'Untitled sketch',
  code text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sketches enable row level security;

create policy "Users can read their own sketches"
  on public.sketches for select
  using (auth.uid() = user_id);

create policy "Users can create their own sketches"
  on public.sketches for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sketches"
  on public.sketches for update
  using (auth.uid() = user_id);

create policy "Users can delete their own sketches"
  on public.sketches for delete
  using (auth.uid() = user_id);

-- 6. PROMOTE YOURSELF TO ADMIN -------------------------------------------------
-- After you sign up on the site once with your own email, run this
-- (replace the email) to make your account an admin:
--
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';
