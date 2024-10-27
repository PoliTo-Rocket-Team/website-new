import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, url }) => {
    const { supabase } = await parent();

    const req = supabase
        .from("orders")
        .select(
            "id, name, quantity, price, description, reason, status, createdAt, quoteName, requester:people!requester(first_name, last_name)"
        )
        .order("id", {ascending: true})
        .limit(3);

        const before = url.searchParams.get("previous");
        if (before) {
            const id = +before;
            if (Number.isInteger(id) && id > 0) req.gt("id", id);
        }
        const after = url.searchParams.get("next");
        if (after) {
            const id = +after;
            if (Number.isInteger(id) && id > 0) req.lt("id", id);
        }
        
    const res = await req;
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
