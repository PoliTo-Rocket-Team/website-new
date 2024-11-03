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
    project_manager: Person | null;
    
    leads: (Person & { acting: boolean; division: string })[];
}

export const load: PageServerLoad = async ({ locals }) => {
    const res = await locals.supabase.rpc("get_complete_subteams2");
    if (res.error)
        throw error(500, {
            details: res.error.details,
            message: res.error.message,
        });

    const president = await locals.supabase.rpc("get_latest_president");
    if (president.error) {
        throw error(500, {
            details: president.error.details,
            message: president.error.message,
        });
    }
    const members = await locals.supabase.rpc("get_members");
    if (members.error) {
        throw error(500, {
            details: members.error.details,
            message: members.error.message,
        });
    }
    return {
        subteams: res.data,
        ppBucket: locals.supabase.storage.from("people-pics").getPublicUrl("")
            .data.publicUrl,
        president: president.data[0] as Person,
        members: members.data
    };
};
