import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
    const id = +params.id;
    const { supabase, subteams } = await parent();
    const subteam = subteams.find(s => s.id === id);
    if (!subteam) throw redirect(300, "/dashboard");
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
        (res.data[i].lead ? open : closed).push(res.data[i]);
    return { subteam, open, closed };
};
