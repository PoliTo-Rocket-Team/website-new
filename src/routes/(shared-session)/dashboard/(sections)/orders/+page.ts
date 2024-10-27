import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, url }) => {
    const { supabase } = await parent();

    const req = supabase
        .from("orders")
        .select(
            "id, name, quantity, price, description, reason, status, createdAt, quoteName, requester:people!requester(first_name, last_name)"
        )
        .order("id", { ascending: false })
        .limit(25);

    const before = url.searchParams.get("before");
    if (before) {
        const id = +before;
        if (Number.isInteger(id) && id > 0) req.lt("id", +before);
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
