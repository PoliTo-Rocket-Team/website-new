import type { Database } from "$lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import * as yup from "yup";

export type OrdersData = Database["public"]["Tables"]["orders"]["Row"];

export type ExtendedOrdersData = OrdersData & {
    quote: File | null;
};

export function emptyOrdersData(
    requester: number
): ExtendedOrdersData {
    return {
        name: '',
        description: "",
        price: 0,
        quantity: 0,
        reason: '',
        requester,
        id: -1, // auto-generated
        status: "pending", // auto-generated
        createdAt: new Date().toISOString(), // auto-generated
        quote: null,
    };
}


const supportedFileTypes = [
    "application/pdf",
    "application/zip",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const fields = {
    name: yup.string().label("Item name").required().max(50),
    description: yup.string().label("Long description").required().min(10),
    price: yup
        .number()
        .label("Price")
        .required()
        .integer()
        .moreThan(0),
    quantity: yup.number().required().integer().moreThan(0).label("Quantity"),
    reason: yup.string().label("Reason for purchase").required().min(10),
    requester: yup.number().required().min(1).integer(),
    quote: yup
        .mixed<File>()
        .nullable().label("Quote file")
        .test("fileType", "Unsupported file type", value => {
            if (!value) return true; // Allow null values
            return value && supportedFileTypes.includes(value.type);
        })
        .test("fileSize", "File size is too large", value => {
            if (!value) return true; // Allow null values
            return value && value.size <= 50 * 1024 * 1024; // max file type 50MB
        })
        .label("Quote"),
};

const creation = yup.object().shape({ ...fields });

type SaveResult =
    | { data: null; errors: string[] }
    | { data: OrdersData; errors: [] };

export async function save(
    data: FormData,
    supabase: SupabaseClient<Database>
): Promise<SaveResult> {
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const quantity = data.get("quantity");
    const reason = data.get("reason");
    const quote = data.get("quote");

    try {
        const requester = +(data.get("requester") || 0);
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

        const row = Object.assign(obj, {
            requester,
            status: "pending" as "pending",
            createdAt: new Date().toISOString(),
        });

        // if (quote) {
        //     const file = quote as File;
        //     const filePath = `quotes/${file.name}`;
        //     const { data: uploadData, error: uploadError } =
        //         await supabase.storage
        //             .from("quotes")
        //             .upload(filePath, file, {
        //                 cacheControl: '3600',
        //                 upsert: false,
        //                 // If needed, specify the owner ID
        //                 owner_id: ownerId, // Replace this with the actual owner_id you want to set
        //             }););

        //     if (uploadError) {
        //         return { data: null, errors: [uploadError.message] };
        //     }
    // }
        const res = await supabase.from("orders").insert(row).select("id");

        return res.error
            ? { data: null, errors: [res.error.message] }
            : {
                  data: { ...row, id: res.data[0].id }, errors: [],
              };
    } catch (err) {
        return { data: null, errors: (err as yup.ValidationError).errors };
    }
}
