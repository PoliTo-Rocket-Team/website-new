import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

const re = /^[^@]+(@politorocketteam\.it)?$/;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        if(typeof username === "string" && typeof password === "string") {
            const r = re.exec(username);
            if(!r) return { username, success: false };
            const email = r[1] ? username : (username + "@politorocketteam.it");
            const res = await locals.supabase.auth.signInWithPassword({email,password});
            if(res.error) return { username, success: false };
            const goto = data.get("redirect");
            throw redirect(303, typeof goto === "string" && goto.startsWith('/') ? goto : "/admin");
        }   
        else return { username: '', success: false };
    }
};