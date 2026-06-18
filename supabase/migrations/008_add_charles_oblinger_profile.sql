update public.profiles
set display_name = 'Charles Oblinger',
    bio = 'Charles Oblinger is a co-founder of The People''s Ledger, an independent publication dedicated to transparency, civic engagement, and public accountability. His work focuses on civic institutions, public discourse, community affairs, and the issues shaping American life.',
    updated_at = now()
where id = '22222222-2222-2222-2222-222222222222';
