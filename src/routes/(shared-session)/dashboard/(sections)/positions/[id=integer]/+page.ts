import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
    const { supabase, person } = await parent();
    const division_id = +params.id;
    let division_data = person.lead_of.find(v => v.id === division_id);
    if (!division_data) {
        const res = await supabase
            .from("divisions")
            .select("name, code")
            .eq("id", division_id);
        if (res.data)
            division_data = {
                id: division_id,
                name: res.data[0].name,
                code: res.data[0].code,
                acting: true,
            };
    }
    if (!division_data) throw redirect(300, "/dashboard");
    // TODO recover code of subteam
    // const code = `${division_data.code}-${division_data.subteam?.code}`;
    const res = await supabase
        .from("positions")
        .select("*")
        .eq("division", division_id)
        .order("number", { ascending: false });
    if (res.error)
        throw error(500, {
            message: "Could not load data",
            details: res.error.message,
        });
    return {
        positions: res.data,
        division: division_data,
    };
};
