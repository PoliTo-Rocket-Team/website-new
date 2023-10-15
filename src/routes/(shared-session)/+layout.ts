import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { cookieOptions, session2user, type Database } from "$lib/supabase";

export const prerender = false;

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')
  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_KEY,
    event: { fetch },
    serverSession: data.session,
    cookieOptions
  })
  const session = (await supabase.auth.getSession()).data.session;
  return { supabase, user: session ? session2user(session) : null }
};