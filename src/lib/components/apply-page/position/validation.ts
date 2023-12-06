import type { Database } from "$lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export type PositionData = Database["public"]["Tables"]["positions"]["Row"];

export const fields = {
    name: yup.string().required().min(10),
    number: yup.number().required().integer().moreThan(0),
    description: yup
        .string()
        .required()
        .min(40, "Must be more than 40 characters"),
    desirable: yup.array().required().of(yup.string().required()).min(1),
    required: yup.array().of(yup.string().required()),
    form: yup
        .string()
        .required()
        .length(17, "Google form IDs are 17 characters long"),
    open: yup.boolean().required(),
    division: yup.number().required().min(1).integer(),
};

const whole = yup.object().shape(fields);

export async function save(data: FormData, supabase: SupabaseClient<Database>) {
    const id = +(data.get("id") || 0);
    const name = data.get("name");
    const number = +(data.get("number") || 0);
    const description = data.get("description");
    const desirable = data.getAll("desirable");
    const required = data.getAll("required");
    const form = data.get("form");
    const open = data.has("open");
    const division = +(data.get("division") || 0);

    try {
        const obj = await whole.validate(
            {
                name,
                number,
                description,
                desirable,
                required,
                form,
                open,
                division,
            },
            { abortEarly: false }
        );
        if (id >= 0) {
            const res = await supabase
                .from("positions")
                .insert(obj)
                .select("id");
            if (res.error) return { data: null, errors: [res.error.message] };
            return { data: Object.assign(obj, res.data) };
        } else {
            const res = await supabase
                .from("positions")
                .update(obj)
                .eq("id", id);
            return res.error
                ? { data: null, errors: [res.error.message] }
                : Object.assign(obj, { id });
        }
    } catch (err) {
        return { data: null, errors: (err as yup.ValidationError).errors };
    }
}
