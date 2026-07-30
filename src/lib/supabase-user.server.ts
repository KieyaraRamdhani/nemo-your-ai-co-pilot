import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function supabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    // New-format sb_ keys are opaque strings, not bearer JWTs.
    if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

/**
 * Builds a Supabase client that acts as the signed-in user (RLS applies),
 * from a raw bearer token. Returns null when the token is missing/invalid.
 */
export async function supabaseFromBearer(authHeader: string | null) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice("Bearer ".length);
  if (token.split(".").length !== 3) return null;

  const client = createClient<Database>(url, key, {
    global: { fetch: supabaseFetch(key), headers: { Authorization: `Bearer ${token}` } },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;

  return { client, userId: data.claims.sub as string };
}
