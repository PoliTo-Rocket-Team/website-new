import type { Database } from "$lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export const schema_name = yup
    .string()
    .label("Division's name")
    .required()
    .min(5);

export const schema_code = yup
    .string()
    .label("Division's code")
    .required()
    .length(3)
    .uppercase();

export async function askAddition(
    subteam: number,
    data: FormData,
    supabase: SupabaseClient<Database>
) {
    const name = data.get("name");
    const code = data.get("code");
    if (!schema_name.isValidSync(name) || !schema_code.isValidSync(code))
        return "Division name or code is invalid";
    const res1 = await supabase
        .from("divisions")
        .insert({ name, code, subteam, lead: null, end: null });
    if (res1.error)
        return `Could not create a new division: ${res1.error.message}`;

    return null;
}
