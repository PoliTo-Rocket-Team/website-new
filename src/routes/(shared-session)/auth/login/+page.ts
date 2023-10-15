import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, url }) => {
    let path = url.searchParams.get("redirect");
    path = path && path.startsWith('/') ? decodeURI(path) : "/dashboard"
    const { user } = await parent();
    if(user) {
        console.log("login: user found");
        throw redirect(303, path);
    }
    return ({ goto: path });
};