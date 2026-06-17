create extension if not exists "pgcrypto";

create type public.profile_role as enum ('admin', 'writer');
create type public.article_status as enum ('draft', 'published');
create type public.comment_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text not null,
  bio text,
  role public.profile_role not null default 'writer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text,
  body text not null,
  excerpt text not null,
  category_id uuid not null references public.categories(id),
  author_id uuid not null references public.profiles(id),
  status public.article_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reading_time integer not null default 1,
  op_ed_label text not null default 'Opinion / Op-Ed'
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  name text not null,
  message text not null,
  status public.comment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger articles_updated_at before update on public.articles for each row execute function public.set_updated_at();
create trigger comments_updated_at before update on public.comments for each row execute function public.set_updated_at();

create or replace function public.current_profile_role()
returns public.profile_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.comments enable row level security;

create policy "Public can read writer profiles"
on public.profiles for select
using (role in ('admin', 'writer'));

create policy "Admins can update profiles"
on public.profiles for update
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

create policy "Public can read categories"
on public.categories for select
using (true);

create policy "Admins can manage categories"
on public.categories for all
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

create policy "Public can read published articles"
on public.articles for select
using (status = 'published');

create policy "Writers can manage articles"
on public.articles for all
using (public.current_profile_role() in ('admin', 'writer'))
with check (public.current_profile_role() in ('admin', 'writer'));

create policy "Public can read approved comments"
on public.comments for select
using (status = 'approved');

create policy "Public can submit pending comments"
on public.comments for insert
with check (status = 'pending');

create policy "Admins can manage comments"
on public.comments for all
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_category_id_idx on public.articles(category_id);
create index comments_article_status_idx on public.comments(article_id, status);
