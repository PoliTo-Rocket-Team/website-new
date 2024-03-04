import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Person {
    first_name: string;
    last_name: string;
    linkedin: string;
    /** id of the person if they have a profile picture, otherwise null */
    id4pp: number | null;
}

interface CompleteSubteam {
    name: string;
    code: string;
    chief: Person & { title: string };
    coordinator1: Person | null;
    coordinator2: Person | null;
    leads: (Person & { acting: boolean; division: string })[];
}

export const load: PageServerLoad = async ({ locals }) => {
    const res = await locals.supabase.rpc("get_complete_subteams");
    if (res.error)
        throw error(500, {
            details: res.error.details,
            message: res.error.message,
        });
    return {
        subteams: res.data as unknown as CompleteSubteam[],
        ppBucket: locals.supabase.storage.from("people-pics").getPublicUrl("")
            .data.publicUrl,
    };
};
