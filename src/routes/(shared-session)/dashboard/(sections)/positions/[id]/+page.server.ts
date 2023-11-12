/** @type {import('./$types').PageServerLoad} */

export async function load({ params ,locals  }) {
	const divisions = await locals.supabase.from("divisions").select().eq("id", params.id);
	const subteam = await locals.supabase.from("subteams").select().eq("id", divisions.data[0].subteam);
	const positions = await locals.supabase.from("positions").select().eq("division", params.id);
	if (positions.data.length === 0) {
		//Error 
		// no data or access denied
	}

	return {
		divisions: divisions.data,
		subteam: subteam.data,
		positions: positions.data,

	};

}

