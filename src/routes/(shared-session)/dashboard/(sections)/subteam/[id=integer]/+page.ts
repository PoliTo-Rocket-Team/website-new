import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
    const id = +params.id;
    const { supabase, person } = await parent();
    if (!person.chief_of) throw redirect(300, "/dashboard");
    const res = await supabase
        .from("divisions")
        .select("id, name, code, end, lead:people(first_name, last_name)")
        .eq("subteam", id);
    if (res.error)
        throw error(500, {
            message: "Could not load data",
            details: res.error.details,
        });
    const open: typeof res.data = [];
    const closed: typeof res.data = [];
    for (var i = 0; i < res.data.length; i++)
        (res.data[i].end ? closed : open).push(res.data[i]);
    return { subteam: person.chief_of, open, closed };
};
