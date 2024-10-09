import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const { supabase, person } = await parent();

    const res = await supabase
        .from("orders")
        .select("*")
        .order("createdAt", { ascending: false });

    if (res.error) {
        throw error(500, {
            message: "Could not load orders data",
            details: res.error.message,
        });
    }

    return {
        orders: res.data,
        requesterId: person.id,
        requester: person.first_name + " " + person.last_name,
    };
};