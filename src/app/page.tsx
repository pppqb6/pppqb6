import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getAuthStatus() {
  if (!hasSupabaseEnv()) {
    return {
      ready: false,
      label: "Supabase env vars are not set",
      detail: "Copy .env.example to .env.local and add the project URL and publishable key.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    return {
      ready: true,
      label: "Supabase is configured",
      detail: "No active auth session yet. Use the login page to send a magic link.",
    };
  }

  return {
    ready: true,
    label: "Signed in with Supabase Auth",
    detail: `Session subject: ${data.claims.sub}`,
  };
}

export default async function Home() {
  const auth = await getAuthStatus();

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <strong>Supabase Web Starter</strong>
          <span>GitHub + Vercel + Claude Code</span>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <Link className="button secondary" href="/login">
            Login
          </Link>
          <Link className="button" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Production-oriented starter</span>
          <h1>Build the app, keep the workflow boring.</h1>
          <p className="lead">
            A small Next.js foundation with Supabase SSR auth, Vercel Analytics,
            GitHub CI, and Claude Code project memory already wired in.
          </p>
          <div className="actions">
            <Link className="button" href="/login">
              Try auth
            </Link>
            <a className="button secondary" href="https://supabase.com/dashboard">
              Open Supabase
            </a>
          </div>
        </div>

        <aside className="panel status-panel" aria-labelledby="status-heading">
          <h2 id="status-heading">Setup status</h2>
          <ul className="status-list">
            <li className="status-item">
              <span className="dot ready" aria-hidden="true" />
              <span>Next.js App Router is ready.</span>
            </li>
            <li className="status-item">
              <span className={auth.ready ? "dot ready" : "dot"} aria-hidden="true" />
              <span>
                {auth.label}
                <br />
                <span className="muted">{auth.detail}</span>
              </span>
            </li>
            <li className="status-item">
              <span className="dot ready" aria-hidden="true" />
              <span>Vercel Analytics is mounted in the root layout.</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="sections" aria-label="Included workflow">
        <article className="panel section">
          <span className="tag">GitHub</span>
          <h2>Pull request checks</h2>
          <p className="muted">
            The CI workflow installs dependencies, typechecks the app, and builds
            it before changes merge.
          </p>
        </article>
        <article className="panel section">
          <span className="tag">Vercel</span>
          <h2>Preview deployments</h2>
          <p className="muted">
            Import the GitHub repository into Vercel, set the same environment
            variables, and every pull request gets a preview.
          </p>
        </article>
        <article className="panel section">
          <span className="tag">Claude Code</span>
          <h2>Shared project memory</h2>
          <p className="muted">
            CLAUDE.md captures commands, architecture, and rules so future agent
            sessions start with the same context.
          </p>
        </article>
      </section>
    </main>
  );
}
