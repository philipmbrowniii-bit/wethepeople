# The People's Ledger

News for Citizens, Not Consumers.

The People's Ledger is an independent civic journalism and opinion publication focused on transparency, accountability, public discourse, and civic reform. It uses the Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Features

- Newspaper-inspired public homepage
- Published op-ed article pages with author boxes
- Category and author pages
- Moderated public comments
- Supabase-protected admin dashboard
- Article create, edit, publish, unpublish, feature, and delete controls
- Category management
- Comment approval, rejection, and deletion
- Author bio editing
- Markdown article editor
- Row Level Security policies for public and admin access

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Copy the values from Project Settings > API into `.env.local`.
3. Run the SQL files in order:

```text
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_seed_data.sql
```

The seed creates two local test users:

- `admin@wethepeople.local` / `ChangeMe123!`
- `writer@wethepeople.local` / `ChangeMe123!`

Change those passwords before production use.

## Environment variables

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Only `NEXT_PUBLIC_*` variables may be exposed to the browser. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.

## Development commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Vercel deployment

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Add the environment variables above in Vercel Project Settings.
4. Deploy.

The initial deployment can use a Vercel project URL and later move to a custom publication domain.

## Custom domain

When ready, add the publication domain in Vercel Project Settings > Domains. Update DNS at the registrar using Vercel's provided records, then set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Redeploy after changing the site URL.
