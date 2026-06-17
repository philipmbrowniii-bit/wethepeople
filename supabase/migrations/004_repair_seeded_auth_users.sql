update auth.users
set raw_app_meta_data = jsonb_build_object('provider', 'email', 'providers', array['email']),
    raw_user_meta_data = '{}'::jsonb,
    updated_at = now()
where email in ('admin@wethepeople.local', 'writer@wethepeople.local')
  and (raw_app_meta_data is null or raw_user_meta_data is null);
