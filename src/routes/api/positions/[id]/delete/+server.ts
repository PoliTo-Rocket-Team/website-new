
// import { description } from '$lib/components/apply-page/Position.svelte';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */





export async function POST({ request , locals }) {
	const { data }= await request.json();
	const res = await locals.supabase.from("positions").delete().eq('id', data.id)
	// console.log("inside position",data.id);
	// console.log(res);
	// return json("delete response");
}