insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values
  (
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object('sub', '11111111-1111-1111-1111-111111111111', 'email', 'admin@wethepeople.local', 'email_verified', true, 'phone_verified', false),
    'email',
    now(),
    now(),
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object('sub', '22222222-2222-2222-2222-222222222222', 'email', 'writer@wethepeople.local', 'email_verified', true, 'phone_verified', false),
    'email',
    now(),
    now(),
    now()
  )
on conflict (provider, provider_id) do update
set identity_data = excluded.identity_data,
    updated_at = now();
