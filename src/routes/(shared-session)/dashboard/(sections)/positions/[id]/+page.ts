import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
    const { supabase, divisions } = await parent();
    const division_id = +params.id;
    const division_data = divisions.find(v => v.id === division_id);
    if (!division_data) throw redirect(300, "/dashboard");
    const code = `${division_data.code}-${division_data.subteam?.code}`;
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
        division: {
            code,
            id: division_id,
            name: division_data.name,
        },
    };
};
