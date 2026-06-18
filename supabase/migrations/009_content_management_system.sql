alter table public.profiles
  add column if not exists title text,
  add column if not exists social_links jsonb not null default '{}'::jsonb,
  add column if not exists author_page_url text;

alter table public.articles
  add column if not exists featured_image_url text,
  add column if not exists tags text[] not null default '{}'::text[],
  add column if not exists archived_at timestamptz;

update public.profiles
set title = case
  when id = '11111111-1111-1111-1111-111111111111' then 'Co-Founder & Editor'
  when id = '22222222-2222-2222-2222-222222222222' then 'Co-Founder & Editor'
  else coalesce(title, 'Contributor')
end
where title is null;

create table if not exists public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  site_name text not null default 'The People''s Ledger',
  tagline text not null default 'News for Citizens, Not Consumers.',
  logo_url text,
  favicon_url text,
  footer_text text not null default 'Independent civic journalism and opinion focused on transparency, accountability, public discourse, and reform.',
  social_links jsonb not null default '{}'::jsonb,
  founder_profile_id uuid references public.profiles(id) on delete set null,
  hero_headline text not null default 'Journalism should help citizens understand power.',
  featured_article_id uuid references public.articles(id) on delete set null,
  homepage_sections jsonb not null default '[
    {"key":"latest","title":"Latest News","enabled":true,"position":1},
    {"key":"opinion","title":"Opinion & Editorial","enabled":true,"position":2},
    {"key":"most_read","title":"Most Read","enabled":true,"position":3}
  ]'::jsonb,
  about_mission text not null default 'The People''s Ledger exists to make consequential public issues clearer, more accessible, and harder to ignore.',
  about_history text not null default 'Founded as an independent publication dedicated to civic journalism, public accountability, and useful public discourse.',
  editorial_standards text not null default '## Independence
Editorial decisions are made in service of readers and the public interest.

## Fact-based reporting
Reporting relies on verifiable information, primary documents, and clearly attributed sources.

## Clearly labeled opinion
Opinion and editorial analysis are labeled so readers can distinguish argument from straight reporting.

## Commitment to transparency
We disclose meaningful conflicts, link to public records when practical, and correct factual errors transparently.',
  contact_information text not null default 'Contact the editorial team through the publication''s official channels.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.site_settings (
  id,
  founder_profile_id,
  featured_article_id
)
values (
  'main',
  '11111111-1111-1111-1111-111111111111',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1'
)
on conflict (id) do nothing;

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

drop policy if exists "Writers can manage articles" on public.articles;
drop policy if exists "Admins can manage articles" on public.articles;
drop policy if exists "Writers can create articles" on public.articles;
drop policy if exists "Writers can update articles" on public.articles;
drop policy if exists "Admins can delete articles" on public.articles;
create policy "Writers can create articles" on public.articles for insert
with check (public.current_profile_role() in ('admin', 'writer'));
create policy "Writers can update articles" on public.articles for update
using (public.current_profile_role() in ('admin', 'writer'))
with check (public.current_profile_role() in ('admin', 'writer'));
create policy "Admins can delete articles" on public.articles for delete
using (public.current_profile_role() = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'publication-assets',
  'publication-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/x-icon']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
