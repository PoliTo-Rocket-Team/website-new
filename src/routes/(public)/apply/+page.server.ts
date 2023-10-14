import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const res = await locals.supabase.from("faqs").select("question, answer");
    if(res.error) throw res.error;
    return { faqs: res.data }
};