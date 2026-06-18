update public.profiles
set display_name = 'Philip Brown',
    bio = 'Philip Brown is the founder of The People''s Ledger, an independent publication dedicated to transparency, civic engagement, and public accountability. His work focuses on policy, governance, institutional effectiveness, and the issues shaping American communities.',
    updated_at = now()
where id = '11111111-1111-1111-1111-111111111111';

update public.profiles
set display_name = 'The Ledger Staff',
    bio = 'The Ledger Staff contributes reporting, research, and analysis on public institutions, civic life, and community accountability.',
    updated_at = now()
where id = '22222222-2222-2222-2222-222222222222';
