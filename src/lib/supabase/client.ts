import { createBrowserClient } from "@supabase/ssr";
import { getRequiredSupabaseEnv } from "@/lib/env";

export function createClient() {
  const { url, publishableKey } = getRequiredSupabaseEnv();
  return createBrowserClient(url, publishableKey);
}
