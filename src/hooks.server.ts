import { building, dev } from '$app/environment';
import { SUPABASE_READER_EMAIL, SUPABASE_READER_PSW } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { BUILD_cookieOptions, cookieOptions } from '$lib/supabase';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  const dashboard = path.startsWith("/dashboard");
  if(dashboard || path.startsWith("/auth")) {
    const sb = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_KEY,
      event, cookieOptions
    });
    event.locals.supabase = sb;
    event.locals.session = null;
    if(dashboard) {
      try { event.locals.session = (await sb.auth.getSession()).data.session;}
      catch {} // I don't know why, but it throws an error instead of returning it if refresh token is expired
      if(!event.locals.session) throw redirect(303, "/auth/login?redirect="+encodeURI(path));
    }
    return resolve(event, {
      filterSerializedResponseHeaders(name) {
        return name === 'content-range';
      },
    });
  }
  else if(building || dev) {
    const sb = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_KEY,
      event, cookieOptions: BUILD_cookieOptions
    });
    event.locals.supabase = sb;
    event.locals.session = null;
    const session = (await sb.auth.getSession()).data.session;
    if(!session) { 
      console.log("Server sign in")
      const res = await sb.auth.signInWithPassword({ email: SUPABASE_READER_EMAIL, password: SUPABASE_READER_PSW });
    }
    return resolve(event, {
      filterSerializedResponseHeaders(name) {
        return name === 'content-range';
      },
    });
  }
  return resolve(event);
}