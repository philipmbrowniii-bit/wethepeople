insert into public.articles (
  id, title, slug, subtitle, body, excerpt, category_id, author_id, status, is_featured, published_at, reading_time, op_ed_label
)
values
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
    'A Civic Reform Agenda Should Start With Plain Records',
    'civic-reform-agenda-plain-records',
    'Transparency begins when ordinary residents can understand what their government has already decided.',
    $$Public trust does not begin with a slogan. It begins with records that residents can find, read, and compare.

A reform agenda that skips basic disclosure is asking people to believe in a process they cannot inspect. Meeting minutes, budgets, procurement records, and conflict disclosures should be posted in formats that are searchable, durable, and easy to cite.

That standard is not glamorous. It is simply the foundation for accountable self-government.$$,
    'Transparency begins when ordinary residents can understand what their government has already decided.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '11111111-1111-1111-1111-111111111111',
    'published',
    true,
    now() - interval '2 days',
    2,
    'News Analysis'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
    'Local Budgets Need Better Public Explanations',
    'local-budgets-need-better-explanations',
    'A budget is a moral document, but it is also a user interface.',
    $$Residents should not need professional training to understand where public money goes.

Local governments can improve trust by publishing budget explainers that connect dollars to services, timelines, tradeoffs, and outcomes. The goal is not to flatten every hard choice. The goal is to make hard choices legible.

When a city explains its budget plainly, it gives residents a real chance to respond.$$,
    'Residents should not need professional training to understand where public money goes.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa7',
    '22222222-2222-2222-2222-222222222222',
    'published',
    false,
    now() - interval '1 day',
    2,
    'Opinion / Op-Ed'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
    'Civic Education Is Infrastructure',
    'civic-education-is-infrastructure',
    'Democracy relies on habits that have to be taught, practiced, and renewed.',
    $$Civic education is often treated as enrichment, but it is closer to infrastructure.

A society that expects people to deliberate, vote, serve on juries, evaluate public claims, and hold power accountable has to teach those practices with seriousness. That means more than memorizing branches of government. It means learning how institutions work when they are stressed.

The public square is healthier when more people know how to use it.$$,
    'Democracy relies on habits that have to be taught, practiced, and renewed.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6',
    '11111111-1111-1111-1111-111111111111',
    'published',
    false,
    now() - interval '6 hours',
    2,
    'Opinion / Op-Ed'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4',
    'The Public Meeting Is Part of the Public Record',
    'public-meeting-public-record',
    'Access means more than opening the doors; it means preserving what happened inside them.',
    $$Public meetings are where policy becomes visible. They are also where important context can disappear.

Agendas, recordings, supporting documents, and final minutes should be published together in a durable archive. Residents should be able to trace a decision from proposal to vote without assembling the history from scattered files.

Public access is strongest when the record remains useful after the room empties.$$,
    'Public access is strongest when residents can trace a decision from proposal to final vote.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    '22222222-2222-2222-2222-222222222222',
    'published',
    false,
    now() - interval '12 hours',
    2,
    'News Analysis'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb5',
    'Government Contract Data Should Be Searchable by Default',
    'government-contract-data-searchable-default',
    'Public spending becomes accountable only when the public can follow it.',
    $$A contract posted as an isolated PDF technically satisfies disclosure while still frustrating scrutiny.

Useful transparency requires structured information: vendor names, award amounts, amendments, timelines, responsible departments, and links to the underlying documents. Searchable contract data helps residents, journalists, and public servants identify patterns before they become scandals.

The public should not have to reverse-engineer its own government.$$,
    'Useful transparency requires structured information, not isolated PDFs.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
    '11111111-1111-1111-1111-111111111111',
    'published',
    false,
    now() - interval '20 hours',
    2,
    'Opinion / Op-Ed'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6',
    'Accountability Begins Before Election Day',
    'accountability-before-election-day',
    'Citizens need durable ways to evaluate public performance between campaigns.',
    $$Elections matter, but accountability cannot be compressed into a single day every few years.

Public dashboards, accessible meeting records, independent audits, clear ethics disclosures, and responsive records systems give citizens a way to evaluate institutions while decisions are still being made.

Voting is a core democratic act. So is paying attention in the time between votes.$$,
    'Citizens need durable ways to evaluate public performance between campaigns.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '22222222-2222-2222-2222-222222222222',
    'published',
    false,
    now() - interval '30 hours',
    2,
    'Opinion / Op-Ed'
  )
on conflict (id) do update
set title = excluded.title,
    slug = excluded.slug,
    subtitle = excluded.subtitle,
    body = excluded.body,
    excerpt = excluded.excerpt,
    category_id = excluded.category_id,
    author_id = excluded.author_id,
    status = excluded.status,
    is_featured = excluded.is_featured,
    reading_time = excluded.reading_time,
    op_ed_label = excluded.op_ed_label,
    updated_at = now();

insert into public.comments (id, article_id, name, message, status)
values
  ('cccccccc-cccc-cccc-cccc-ccccccccccc1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Dana M.', 'This is the kind of basic reform that would help residents follow decisions before they become controversies.', 'approved'),
  ('cccccccc-cccc-cccc-cccc-ccccccccccc2', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Thomas K.', 'Please cover procurement records in more detail.', 'pending'),
  ('cccccccc-cccc-cccc-cccc-ccccccccccc3', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Lena P.', 'The user interface comparison is exactly right.', 'approved'),
  ('cccccccc-cccc-cccc-cccc-ccccccccccc4', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'A reader', 'Would like to see examples from school districts doing this well.', 'pending')
on conflict (id) do update
set name = excluded.name,
    message = excluded.message,
    status = excluded.status,
    updated_at = now();
