import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */

export async function POST({ request, locals }) {
  const { data } = await request.json();

  const res = await locals.supabase
    .from("positions")
    .delete()
    .eq("id", data.id);

  return json(res);
}
