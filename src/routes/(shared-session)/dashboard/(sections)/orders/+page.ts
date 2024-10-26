import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const { supabase, person } = await parent();

    const res = await supabase
        .from("orders")
        .select(
            "id, name, quantity, price, description, reason, status, createdAt, quoteName, requester:people!requester(first_name, last_name)"
        )
        .order("createdAt", { ascending: false });

    if (res.error) {
        throw error(500, {
            message: "Could not load orders data",
            details: res.error.message,
        });
    }

    return {
        orders: res.data,
    };
};
