import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const { person } = await parent();
    if (!person.is_president) throw redirect(300, "/dashboard");
};
