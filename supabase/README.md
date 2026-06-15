# Supabase

This folder keeps database changes close to the application code.

## Apply the first migration

Use one of these paths:

- Supabase Dashboard: open SQL Editor and run `migrations/0001_app_bootstrap.sql`.
- Supabase CLI: link the project and run `supabase db push`.

After applying the migration, generate TypeScript database types:

```bash
npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" > src/types/database.types.ts
```

On PowerShell:

```powershell
npx supabase gen types typescript --project-id $env:SUPABASE_PROJECT_ID > src/types/database.types.ts
```
