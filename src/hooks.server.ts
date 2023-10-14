import { building, dev } from '$app/environment';
import { SUPABASE_READER_EMAIL, SUPABASE_READER_PSW } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  const admin = path.startsWith("/admin");
  if(admin || path.startsWith("/auth")) {
    const sb = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_KEY,
      event,
    });
    event.locals.supabase = sb;
    event.locals.session = null;
    if(path.startsWith("/admin")) {
      const res = await sb.auth.getSession();
      event.locals.session = res.data.session;
      if(!event.locals.session) throw redirect(303, "/auth/login?redirect="+encodeURI(path));
    }
    return resolve(event, {
      filterSerializedResponseHeaders(name) {
        return name === 'content-range';
      },
    });
  }
  if(building || dev) {
    const sb = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_KEY,
      event,
    });
    event.locals.supabase = sb;
    const session = (await sb.auth.getSession()).data.session;
    if(!session) { 
      console.log("Server sign in")
      const res = await sb.auth.signInWithPassword({ email: SUPABASE_READER_EMAIL, password: SUPABASE_READER_PSW });
      event.locals.session = res.data.session;
    }
    else if(session.user.email !== SUPABASE_READER_EMAIL) {
      console.log("Server sign in after session change");
      await sb.auth.signOut();
      const res = await sb.auth.signInWithPassword({ email: SUPABASE_READER_EMAIL, password: SUPABASE_READER_PSW });
      event.locals.session = res.data.session;
    }
    else event.locals.session = session;
    return resolve(event, {
      filterSerializedResponseHeaders(name) {
        return name === 'content-range';
      },
    });
  }
  return resolve(event);
}