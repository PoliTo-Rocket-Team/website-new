import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

let fileName: string | undefined = undefined;

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
    for (const order of res.data) {
        const quoteUrl = order.quote_url ?? undefined;
        const { data, error } = await supabase.storage
            .from("quotes")
            .list("", { search: quoteUrl });

        if (error) {
            console.error("Error fetching file name:", error);
        } else if (data && data.length > 0) {
            fileName = data[0].name;
        }
    }

    return {
        orders: res.data,
        requesterId: person.id,
        requesterName: person.first_name + " " + person.last_name,
        fileName: fileName,
    };
};
