import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const faqs = await locals.supabase
        .from("faqs")
        .select()
        .eq("visible", true);
    if (faqs.error)
        throw error(500, {
            details: faqs.error.details,
            message: faqs.error.message,
        });

    const positions = await locals.supabase.rpc("get_open_positions");
    if (positions.error)
        throw error(500, {
            details: positions.error.details,
            message: positions.error.message,
        });

    return { faqs: faqs.data, positions: positions.data };
};
