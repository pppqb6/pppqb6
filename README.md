# Supabase Web Starter

A small production-oriented foundation for building a web app with:

- Next.js App Router and TypeScript
- Supabase Auth with SSR cookies
- Vercel Analytics and Vercel deployment defaults
- GitHub pull request CI
- Claude Code project memory via `CLAUDE.md`

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with values from your Supabase project:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

Then open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the local Next.js server.
- `npm run typecheck` runs TypeScript checks.
- `npm run build` creates a production build.
- `npm run format` checks formatting with Prettier.

## Project layout

- `src/app` contains App Router routes and server actions.
- `src/lib/supabase` contains browser, server, and proxy Supabase clients.
- `supabase/migrations` contains SQL migrations for Auth-ready tables.
- `.github/workflows/ci.yml` runs typecheck and build on GitHub.
- `docs/setup.md` has the complete GitHub, Vercel, Supabase, and Claude Code checklist.

## Deploy

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add the Supabase environment variables in Vercel for Production, Preview, and Development.
4. Apply `supabase/migrations/0001_app_bootstrap.sql` in Supabase.
5. Configure Supabase Auth redirect URLs for local and Vercel preview domains.
