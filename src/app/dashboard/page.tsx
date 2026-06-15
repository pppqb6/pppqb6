import Link from "next/link";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/login");
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <strong>Dashboard</strong>
          <span>Protected by Supabase Auth</span>
        </div>
        <nav className="nav" aria-label="Dashboard navigation">
          <Link className="button secondary" href="/">
            Home
          </Link>
          <form action={signOut}>
            <button className="button" type="submit">
              Sign out
            </button>
          </form>
        </nav>
      </header>

      <section className="panel status-panel">
        <span className="tag">Authenticated</span>
        <h1>Your app shell is ready.</h1>
        <p className="lead">
          This route verifies the active Supabase JWT with getClaims before
          rendering. Add product-specific data fetching here.
        </p>
        <ul className="checklist">
          <li>
            <span className="dot ready" aria-hidden="true" />
            <span>User subject: {data.claims.sub}</span>
          </li>
          <li>
            <span className="dot ready" aria-hidden="true" />
            <span>SSR auth refresh is handled by proxy.ts.</span>
          </li>
          <li>
            <span className="dot ready" aria-hidden="true" />
            <span>RLS-ready database migration lives in supabase/migrations.</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
