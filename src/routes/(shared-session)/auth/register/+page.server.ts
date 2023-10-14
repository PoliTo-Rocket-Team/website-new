import type { Actions, PageServerLoad } from "./$types";
import { fail, error, redirect } from "@sveltejs/kit";
import { getPswCriteriaMask } from "./psw-validation";


export const load: PageServerLoad = async ({ url, locals }) => {
    const token_hash = url.searchParams.get("token");
    if(!token_hash) throw error(400, {
        message: "Bad request",
        details: "Token parameter is missing: cannot perform OTP"
    })  
    const res = await locals.supabase.auth.verifyOtp({token_hash, type: "invite"});
    if(res.error) throw error(401, {
        message: "Invalid OTP code",
        details: res.error.message
    });
    locals.session = res.data.session;
    if(!locals.session) throw error(401, {
        message: "Unauthenticated",
        details: "No user session is related to the provided OTP code"
    });
    return { email: locals.session.user.email };
};


export const actions: Actions = {
    default: async ({ request, locals }) => {
        if(!locals.session) throw error(401, {
            message: "Unauthenticated",
            details: "Cannot perform password change because a valid session is missing"
        });
        const data = await request.formData();
        const password = data.get("password");
        if(typeof password !== "string") return fail(400, { error: "Invalid password value type", password: '' });
        if(getPswCriteriaMask(password)) return fail(400, { error: "Submitted password does not satisfy requirements", password } );
        locals.supabase.auth.updateUser({password});
        redirect(303, "/admin");
    }
};