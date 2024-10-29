import type { Database } from "$lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export async function save(formdata: any, supabase: any) {
    const data = Object.fromEntries(formdata.entries());

    const res = await supabase.from("orders").insert({
        requester: data.requester,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        reason: data.reason,
        // quote: "data.quote",
    });
    if (res.error) {
        console.log("---- error ----");
    }
    return res;
}

