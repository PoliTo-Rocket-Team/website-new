import type { Database } from "$lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export async function save(formdata: any, supabase: any) {
    const data = Object.fromEntries(formdata.entries());

    const res = await supabase.from("Orders").insert({
        Requester: data.requester,
        Description: data.description,
        Quantity: data.quantity,
        Price: data.price,
        Status: data.Status,
        Reason: data.reason,
        quote: "data.quote",
    });
    if (res.error) {
        console.log("---- error ----");
    }
    return res;
}
