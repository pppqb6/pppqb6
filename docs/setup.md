# Setup Guide

This project is designed for a GitHub -> Vercel -> Supabase workflow with
Claude Code assisting development from the repository root.

## 1. Local prerequisites

Install:

- Node.js 20 or newer
- Git
- A GitHub account
- A Vercel account connected to GitHub
- A Supabase project
- Claude Code

Then install dependencies:

```bash
npm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Add:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

## 2. Supabase

Create a Supabase project, then copy the Project URL and publishable key from
the project Connect dialog or API settings.

Apply the initial migration:

```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

If you prefer the dashboard, paste `supabase/migrations/0001_app_bootstrap.sql`
into the SQL Editor and run it.

Configure Auth redirect URLs:

- `http://localhost:3000/auth/callback`
- `https://your-production-domain.com/auth/callback`
- `https://*.vercel.app/auth/callback` for previews, if your Supabase plan and
  security policy allow wildcard previews

## 3. GitHub

Initialize and push the repository:

```bash
git init
git add .
git commit -m "Set up web app foundation"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/YOUR_REPO.git
git push -u origin main
```

The CI workflow in `.github/workflows/ci.yml` runs on pull requests and pushes
to `main`.

## 4. Vercel

Import the GitHub repository in Vercel. Vercel should detect the Next.js
framework automatically; `vercel.json` also pins the framework to Next.js.

Add these environment variables in Vercel for Production, Preview, and
Development:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

After deployment, add the Vercel production and preview callback URLs to
Supabase Auth.

## 5. Claude Code

Run Claude Code from the repository root so it reads `CLAUDE.md`:

```bash
claude
```

Keep project-wide rules in `CLAUDE.md`. Use `CLAUDE.local.md` for private notes;
it is ignored by Git.

Good first prompts:

- "Read README.md, docs/setup.md, and CLAUDE.md, then summarize the architecture."
- "Add a protected todos CRUD page using the existing Supabase RLS model."
- "Before editing, run npm run typecheck and explain any current failures."

## 6. Development loop

Use short branches and pull requests:

```bash
git checkout -b feature/todos
npm run dev
npm run typecheck
npm run build
git push -u origin feature/todos
```

Vercel will create a preview deployment for the pull request once the repository
is connected.
