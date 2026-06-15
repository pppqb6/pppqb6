export type SupabaseEnv = {
  url: string;
  publishableKey: string;
};

export function getSupabaseEnv(): Partial<SupabaseEnv> {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
}

export function hasSupabaseEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.publishableKey);
}

export function getRequiredSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv();

  if (!env.url || !env.publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return {
    url: env.url,
    publishableKey: env.publishableKey,
  };
}
