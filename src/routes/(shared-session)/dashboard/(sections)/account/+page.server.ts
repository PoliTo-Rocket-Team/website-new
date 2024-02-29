import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

const url_regexp =
    /^(?:https:\/\/)?(?:www\.)?linkedin\.(?:it|com)\/in\/([\w-]+)\/?(?:\?.*)?$/;
const username_regexp = /^[\w-]+$/;

export const actions: Actions = {
    pic: async ({ request, locals }) => {
        const data = await request.formData();
        const id = data.get("person-id");
        const f = data.get("picture");
        const last_name = data.get("person-last-name");
        if (
            typeof id === "string" &&
            f instanceof File &&
            f.type === "image/jpeg" &&
            f.size <= 512000
        ) {
            const res = await locals.supabase.storage
                .from("people-pic")
                .upload(`${id}-${last_name}.jpeg`, f, { upsert: true });
            if (res.error)
                return fail(400, {
                    success: false,
                    picture: res.error.message,
                });
            else return { success: true };
        } else
            return fail(400, {
                success: false,
                picture: "Invalid data: see requirements",
            });
    },
    linkedin: async ({ request, locals }) => {
        // retrieve linkedin form data
        const data = await request.formData();
        const person = data.get("person-id");
        if (typeof person !== "string" || Number.isNaN(+person))
            return fail(400, { success: false, linkedin: "Missing person id" });

        const v = data.get("username");
        if (typeof v !== "string")
            return fail(400, { success: false, linkedin: "Invalid Input" });
        const match = url_regexp.exec(v);
        const linkedin = match ? match[1] : username_regexp.test(v) ? v : null;
        // update linkedin in database
        const res = await locals.supabase
            .from("people")
            .update({ linkedin })
            .eq("id", +person);
        if (res.error)
            return fail(400, { success: false, linkedin: res.error.message });
        else return { success: true };
    },
};
