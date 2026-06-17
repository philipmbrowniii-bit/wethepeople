insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@wethepeople.local', crypt('ChangeMe123!', gen_salt('bf')), now(), now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'writer@wethepeople.local', crypt('ChangeMe123!', gen_salt('bf')), now(), now(), now())
on conflict (id) do nothing;

insert into public.profiles (id, email, display_name, bio, role)
values
  ('11111111-1111-1111-1111-111111111111', 'admin@wethepeople.local', 'Eleanor Hayes', 'Eleanor edits We The People and writes about institutional trust, public accountability, and reform mechanics.', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'writer@wethepeople.local', 'Marcus Reed', 'Marcus covers local governance, civic culture, and the everyday systems that shape public life.', 'writer')
on conflict (id) do update set display_name = excluded.display_name, bio = excluded.bio, role = excluded.role;

insert into public.categories (id, name, slug, description)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Civic Reform', 'civic-reform', 'Ideas for renewing civic institutions and public trust.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Government', 'government', 'Opinion on public administration, representation, and accountability.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Economy', 'economy', 'Arguments about economic policy and public prosperity.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'Law', 'law', 'Commentary on law, courts, rights, and civic obligations.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'Culture', 'culture', 'Essays on civic habits, media, and public life.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6', 'Education', 'education', 'Opinion about schools, knowledge, and democratic preparation.'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa7', 'Local Issues', 'local-issues', 'Local problems and practical reforms.')
on conflict (slug) do update set name = excluded.name, description = excluded.description;

insert into public.articles (id, title, slug, subtitle, body, excerpt, category_id, author_id, status, is_featured, published_at, reading_time)
values
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
    'A Civic Reform Agenda Should Start With Plain Records',
    'civic-reform-agenda-plain-records',
    'Transparency begins when ordinary residents can understand what their government has already decided.',
    'Public trust does not begin with a slogan. It begins with records that residents can find, read, and compare.\n\nA reform agenda that skips basic disclosure is asking people to believe in a process they cannot inspect. Meeting minutes, budgets, procurement records, and conflict disclosures should be posted in formats that are searchable, durable, and easy to cite.\n\nThat standard is not glamorous. It is simply the foundation for accountable self-government.',
    'Transparency begins when ordinary residents can understand what their government has already decided.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '11111111-1111-1111-1111-111111111111',
    'published',
    true,
    now() - interval '2 days',
    2
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
    'Local Budgets Need Better Public Explanations',
    'local-budgets-need-better-explanations',
    'A budget is a moral document, but it is also a user interface.',
    'Residents should not need professional training to understand where public money goes.\n\nLocal governments can improve trust by publishing budget explainers that connect dollars to services, timelines, tradeoffs, and outcomes. The goal is not to flatten every hard choice. The goal is to make hard choices legible.\n\nWhen a city explains its budget plainly, it gives residents a real chance to respond.',
    'A budget is a moral document, but it is also a user interface.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa7',
    '22222222-2222-2222-2222-222222222222',
    'published',
    false,
    now() - interval '1 day',
    2
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
    'Civic Education Is Infrastructure',
    'civic-education-is-infrastructure',
    'Democracy relies on habits that have to be taught, practiced, and renewed.',
    'Civic education is often treated as enrichment, but it is closer to infrastructure.\n\nA society that expects people to deliberate, vote, serve on juries, evaluate public claims, and hold power accountable has to teach those practices with seriousness. That means more than memorizing branches of government. It means learning how institutions work when they are stressed.\n\nThe public square is healthier when more people know how to use it.',
    'Democracy relies on habits that have to be taught, practiced, and renewed.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6',
    '11111111-1111-1111-1111-111111111111',
    'published',
    false,
    now() - interval '6 hours',
    2
  )
on conflict (slug) do update set title = excluded.title, body = excluded.body, status = excluded.status;

insert into public.comments (article_id, name, message, status)
values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Dana M.', 'This is the kind of basic reform that would help residents follow decisions before they become controversies.', 'approved'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Thomas K.', 'Please cover procurement records in more detail.', 'pending'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Lena P.', 'The user interface comparison is exactly right.', 'approved'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'A reader', 'Would like to see examples from school districts doing this well.', 'pending');
