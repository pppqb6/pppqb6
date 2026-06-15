import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/env";
import { signInWithOtp } from "./actions";

type LoginSearchParams = Promise<{
  sent?: string;
  error?: string;
}>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const params = await searchParams;
  const isConfigured = hasSupabaseEnv();

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <strong>Login</strong>
          <span>Supabase magic link auth</span>
        </div>
        <Link className="button secondary" href="/">
          Home
        </Link>
      </header>

      <section className="panel status-panel">
        <h1>Sign in</h1>
        <p className="lead">
          Enter your email address and Supabase will send a one-time sign-in link.
        </p>

        {!isConfigured ? (
          <p className="notice">
            Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local first.
          </p>
        ) : null}

        {params.sent ? (
          <p className="notice success">Check your inbox for the magic link.</p>
        ) : null}

        {params.error ? <p className="notice">{params.error}</p> : null}

        <form className="form" action={signInWithOtp}>
          <label className="label">
            Email
            <input
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              disabled={!isConfigured}
            />
          </label>
          <button className="button" type="submit" disabled={!isConfigured}>
            Send magic link
          </button>
        </form>
      </section>
    </main>
  );
}
