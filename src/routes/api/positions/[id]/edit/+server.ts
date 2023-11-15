
// import { description } from '$lib/components/apply-page/Position.svelte';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */





export async function POST({ request , locals }) {
	const { data }= await request.json();
		// console.log(data);

	const { error  } = await locals.supabase.from("positions").update({description:data.description,desirable:data.desirable,required:data.required}).eq("id", data.id);
	console.log(error);
	return json("hey boy");
}