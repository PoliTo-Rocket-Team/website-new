import type { Database } from "$lib/supabase";

import type { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export interface Requester {
    first_name: string;
    last_name: string;
}

export type OrdersData = Omit<
    Database["public"]["Tables"]["orders"]["Row"],
    "requester"
> & {
    requester: Requester;
};

export function emptyOrdersData(requester: Requester): OrdersData {
    return {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        reason: "",
        requester,
        id: -1, // auto-generated
        status: "pending", // auto-generated
        createdAt: new Date().toISOString(), // auto-generated
        quoteName: "",
    };
}

const supportedFileTypes = [
    "application/pdf",
    "application/zip",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const fields = {
    name: yup.string().label("Item name").required().max(30),
    description: yup.string().label("Long description").required().min(10),
    price: yup
        .number()
        .label("Price")
        .required()
        .positive()
        .lessThan(5e4)
        .test({
            name: "max-two-decimals",
            message: "Price must have at most two decimal places",
            test(v, ctx) {
                return Number.isInteger(v * 100);
            },
        }),
    quantity: yup.number().required().integer().moreThan(0).label("Quantity"),
    reason: yup.string().label("Reason for purchase").required().min(10),
    requester: yup.number().required().min(1).integer(),
    quote: yup
        .mixed<File>()
        .nullable()
        .label("Quote file")
        .test("fileType", "Unsupported file type", value => {
            if (!value || !value.name) return true;
            return value && supportedFileTypes.includes(value.type);
        })
        .test("fileSize", "File size is too large", value => {
            if (!value || !value.size) return true;
            return value && value.size <= 50 * 1024 * 1024; // max file type 50MB
        })
        .label("Quote"),
};

const creation = yup.object().shape({ ...fields });

// Function to generate a unique 8-character string
function generateUniqueString(length: number): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

type SaveResult =
    | { data: null; errors: string[] }
    | { data: Omit<OrdersData, "requester">; errors: [] };

export async function save(
    data: FormData,
    supabase: SupabaseClient<Database>
): Promise<SaveResult> {
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const quantity = data.get("quantity");
    const reason = data.get("reason");
    const quote = data.get("quote") as File | null;
    const requester = +(data.get("requester") || 0);

    try {
        const obj = await creation.validate(
            {
                name,
                price,
                description,
                requester,
                quantity,
                reason,
            },
            { abortEarly: false }
        );
        if (!Number.isInteger(requester) || requester < 0)
            return { data: null, errors: ["Invalid requester"] };

        const row = {
            ...obj,
            status: "pending" as "pending",
            createdAt: new Date().toISOString(),
            quoteName: null as string | null,
        };

        if (quote?.name) {
            const file = quote as File;
            const newFileName = `${generateUniqueString(8)}_${file.name}`;
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("quotes")
                    .upload(newFileName, file, {
                        cacheControl: "3600",
                        upsert: true,
                    });

            if (uploadError) {
                return { data: null, errors: [uploadError.message] };
            }

            row.quoteName = newFileName;
        }
        const res = await supabase.from("orders").insert(row).select("id");

        return res.error
            ? { data: null, errors: [res.error.message] }
            : {
                  data: { ...row, id: res.data[0].id },
                  errors: [],
              };
    } catch (err) {
        return { data: null, errors: (err as yup.ValidationError).errors };
    }
}
