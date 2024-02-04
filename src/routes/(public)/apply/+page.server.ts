import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const responseFAQs = await locals.supabase.from("faqs").select();
    const responsePOS = await locals.supabase.from("positions").select();
    if (responseFAQs.error || responsePOS.error) throw responseFAQs.error;
    let openPositions = responsePOS.data?.filter(pos => pos.open === true);
    let visibleFAQs = responseFAQs.data?.filter(faq => faq.visible === true);

    return { faqs: visibleFAQs, positions: openPositions };
};
