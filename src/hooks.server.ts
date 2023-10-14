import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const sb = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_KEY,
    event,
  });
  event.locals.supabase = sb;
  event.locals.session = null;

  const path = event.url.pathname;
  if(path.startsWith("/admin")) {
    const res = await sb.auth.getSession();
    event.locals.session = res.data.session;
    if(!event.locals.session) throw redirect(303, "/login?redirect="+encodeURI(path));
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}