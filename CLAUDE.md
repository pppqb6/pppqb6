# Claude Code Instructions

## Project

This is a Next.js App Router web app using TypeScript, Supabase Auth, Vercel,
and GitHub pull request CI.

## Commands

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Typecheck: `npm run typecheck`
- Production build: `npm run build`
- Format check: `npm run format`

## Architecture

- Routes and server actions live under `src/app`.
- Supabase client helpers live under `src/lib/supabase`.
- `proxy.ts` refreshes Supabase Auth cookies with `supabase.auth.getClaims()`.
- Database migrations live under `supabase/migrations`.
- Generated Supabase database types belong in `src/types/database.types.ts`.

## Conventions

- Prefer Server Components for data reads.
- Use Server Actions or Route Handlers for mutations and auth flows.
- Never expose Supabase secret keys to the browser.
- Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for public client operations.
- Keep Row Level Security enabled on user-owned tables.
- Run `npm run typecheck` before handing off code changes.

## Deployment

- GitHub pull requests should pass `.github/workflows/ci.yml`.
- Vercel owns production and preview deployments.
- Vercel environment variables must match `.env.example`.
- Supabase Auth redirect URLs must include local, production, and preview
  callback URLs.
