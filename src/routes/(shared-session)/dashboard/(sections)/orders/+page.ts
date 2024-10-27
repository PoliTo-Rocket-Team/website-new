import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, url }) => {
    const { supabase } = await parent();

    const req = supabase
        .from("orders")
        .select(
            "id, name, quantity, price, description, reason, status, createdAt, quoteName, requester:people!requester(first_name, last_name)"
        )
        .limit(25);

    let latest = true;
    let ascending = false;
    const before = +(url.searchParams.get("before") || -1);
    if (Number.isInteger(before) && before > 0) {
        req.lt("id", before);
        latest = false;
    }
    const after = +(url.searchParams.get("after") || -1);
    if (Number.isInteger(after) && after > 0) {
        req.gt("id", after);
        ascending = true;
    }
    req.order("id", { ascending });

    const res = await req;
    if (res.error) {
        throw error(500, {
            message: "Could not load orders data",
            details: res.error.message,
        });
    }
    if (ascending) {
        if (res.data.length == 0) throw redirect(303, "/dashboard/orders");
        latest = res.data.length < 25;
        res.data.reverse();
    }

    return {
        orders: res.data,
        latest,
    };
};
