import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        if(typeof email === "string" && typeof password === "string") {
            const res = await locals.supabase.auth.signInWithPassword({email,password});
            if(res.error) return ({ email, password, success: false });
            const goto = data.get("redirect");
            throw redirect(303, typeof goto === "string" && goto.startsWith('/') ? goto : "/admin");
        }   
        else return ({ email: '', password: '', success: false });
    }
};