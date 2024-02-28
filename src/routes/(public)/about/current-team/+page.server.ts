import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const subteams = await locals.supabase.from("subteams").select();
    if (subteams.error)
        throw error(500, {
            details: subteams.error.details,
            message: subteams.error.message,
        });

    const divisions = await locals.supabase.from("divisions").select();
    if (divisions.error)
        throw error(500, {
            details: divisions.error.details,
            message: divisions.error.message,
        });

    return {
        subteams: subteams.data,
        divisions: divisions.data,
    };
};
