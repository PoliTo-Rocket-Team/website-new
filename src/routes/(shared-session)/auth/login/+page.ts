import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, url }) => {
    const { session } = await parent();
    if(session) throw redirect(303, "/admin");
    const goto = url.searchParams.get("redirect");
    return ({ goto: goto ? decodeURI(goto) : "/admin" });
};