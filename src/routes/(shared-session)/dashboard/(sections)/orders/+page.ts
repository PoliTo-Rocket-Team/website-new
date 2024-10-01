import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const { supabase, person } = await parent();

    return {
        orders: null,
        requesterId: person.id,
    };
};
