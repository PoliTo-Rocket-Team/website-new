import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    pic: async ({ request, locals,  }) => {
        const data = await request.formData();
        const id = data.get("person-id");
        const f = data.get("picture");
        if(typeof id === "string" && f instanceof File && f.type === "image/jpeg" && f.size <= 512000) {
            const res = await locals.supabase.storage.from("people-pic").upload(`${id}.jpeg`, f, { upsert: true });
            if(res.error) return fail(400, {success: false,picture: res.error.message});
            else return {success: true}
        }
        else return fail(400, { success: false, picture: "Invalid data: see requirements" });
    }
};