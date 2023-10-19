import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
    const res = await parent();
    if(!res.person) throw redirect(300, "/dashboard");
    else return ({ pic: res.pic, person: res.person, divisions: res.divisions, subteams: res.subteams });
};