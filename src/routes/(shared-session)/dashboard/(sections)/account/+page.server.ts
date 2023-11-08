import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { session2user } from "$lib/supabase";

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
    },
    linkedin: async ({ request, locals,  }) => {
        // retrieve linkedin form data
        const data = await request.formData();
        const v = data.get("username");
        if(typeof v === "string"){
                    // retrieve user id 
        const session = (await locals.supabase.auth.getSession()).data.session;
        const user = session2user(session);
        const res2 = await locals.supabase.from("people").select("id").eq("user", user.id);
        const id = res2.data[0].id;
        // update linkedin in database
        const res = await locals.supabase.from("people").update({ linkedin: ''+v }).eq("id", id);
        if(res.error) return fail(400, {success: false,username: res.error.message});
        else return {success: true}
        }
        else return fail(400, { success: false, username: "Invalid Input" });


}
};