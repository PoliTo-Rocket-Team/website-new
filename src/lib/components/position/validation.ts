import type { Database } from "$lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export type PositionData = Database["public"]["Tables"]["positions"]["Row"];

export function emptyPositionData(
    division: number,
    num: number = 0
): PositionData {
    return {
        id: -1,
        division,
        name: "",
        description: "",
        desirable: [],
        required: [],
        number: num,
        form: "",
        open: true,
    };
}

const indexRegExp = /\["(\d)"\]/;

function extractIndex(arg: any) {
    const m = indexRegExp.exec(arg.path);
    return m ? +m[1] : 0;
}

function emptyErrorInArray(arg: any) {
    // https://github.com/jquense/yup/issues/830#issuecomment-1156152181
    const m = indexRegExp.exec(arg.path);
    const i = m ? +m[1] + 1 : 1;
    let suffix = "th";
    switch (i % 10) {
        case 1:
            suffix = "st";
            break;
        case 2:
            suffix = "nd";
            break;
        case 3:
            suffix = "rd";
            break;
    }
    return `${i}${suffix} item is empty`;
}

export const fields = {
    name: yup.string().label("The position name").required().min(10),
    description: yup.string().label("The description").required().min(40),
    desirable: yup
        .array()
        .required()
        .of(yup.string().required(emptyErrorInArray))
        .min(1),
    required: yup
        .array()
        .label("Required skills")
        .of(yup.string().required(emptyErrorInArray))
        .defined()
        .nullable()
        .min(0),
    form: yup
        .string()
        .label("The Google form ID")
        .defined()
        .nullable()
        .length(17, "Google form IDs are 17 characters long"),
    open: yup.boolean().required(),
};

const creationFields = {
    number: yup.number().required().integer().moreThan(0),
    division: yup.number().required().min(1).integer(),
};

const update = yup.object().shape(fields);
const creation = yup.object().shape({ ...fields, ...creationFields });

type SaveResult =
    | { data: null; errors: string[] }
    | { data: PositionData; errors: [] };

export async function save(
    data: FormData,
    supabase: SupabaseClient<Database>
): Promise<SaveResult> {
    const id = +(data.get("id") || 0);
    const name = data.get("name");
    const description = data.get("description") || null;
    const desirable = data.getAll("desirable");
    const required = data.getAll("required");
    const form = data.get("form") || null;
    const open = data.has("open");

    try {
        if (id > 0) {
            const obj = await update.validate(
                {
                    name,
                    description,
                    desirable,
                    required,
                    form,
                    open,
                },
                { abortEarly: false }
            );
            const res = await supabase
                .from("positions")
                .update(obj)
                .eq("id", id)
                .select("id, number, division");
            if (res.error) return { data: null, errors: [res.error.message] };
            if (!res.data.length)
                return { data: null, errors: ["No such position exists"] };
            return {
                errors: [],
                data: Object.assign(obj, res.data[0]),
            };
        } else {
            const number = +(data.get("number") || 0);
            const division = +(data.get("division") || 0);
            const obj = await creation.validate(
                {
                    name,
                    number,
                    division,
                    description,
                    desirable,
                    required,
                    form,
                    open,
                },
                { abortEarly: false }
            );
            if (!Number.isInteger(division) || division < 0)
                return { data: null, errors: ["Invalid division"] };
            const row = Object.assign(obj, { division });
            const res = await supabase
                .from("positions")
                .insert(row)
                .select("id");
            return res.error
                ? { data: null, errors: [res.error.message] }
                : { data: Object.assign(row, res.data[0]), errors: [] };
        }
    } catch (err) {
        return { data: null, errors: (err as yup.ValidationError).errors };
    }
}
