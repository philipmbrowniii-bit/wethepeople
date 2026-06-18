drop policy if exists "Writers can manage articles" on public.articles;
drop policy if exists "Writers can create articles" on public.articles;
drop policy if exists "Writers can update articles" on public.articles;
drop policy if exists "Admins can delete articles" on public.articles;

create policy "Writers can create articles"
on public.articles for insert
with check (public.current_profile_role() in ('admin', 'writer'));

create policy "Writers can update articles"
on public.articles for update
using (public.current_profile_role() in ('admin', 'writer'))
with check (public.current_profile_role() in ('admin', 'writer'));

create policy "Admins can delete articles"
on public.articles for delete
using (public.current_profile_role() = 'admin');
