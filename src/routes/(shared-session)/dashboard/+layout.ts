import { error, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { session2user } from "$lib/supabase";

export const load: LayoutLoad = async ({ parent, url }) => {
    let { supabase, user } = await parent();
    if (!user) {
        console.log("dashboard: no user");
        const session = (await supabase.auth.getSession()).data.session;
        if (!session)
            throw redirect(
                303,
                "/auth/login?redirect=" + encodeURI(url.pathname)
            );
        else user = session2user(session);
    }
    const res = await supabase
        .from("people")
        .select("id, first_name, last_name, linkedin")
        .eq("user", user.id);
    if (res.error) {
        // console.log(session);
        throw error(500, {
            message: "Invalid session",
            details: res.error.message,
        });
    }
    if (res.data.length === 0) return { user };
    const person = res.data[0];

    return {
        user,
        person,
        pic: supabase.storage
            .from("people-pics")
            .getPublicUrl(`${person.id}-${person.last_name}.jpeg`).data
            .publicUrl,
        divisions: supabase
            .from("divisions")
            .select(
                "id, name, code, acting:lead_acting, subteam:subteams(name,code)"
            )
            .eq("lead", person.id)
            .then(v => v.data!),
        subteams: supabase
            .from("subteams")
            .select("id, name, code, title:title_name")
            .eq("chief", person.id)
            .then(v => v.data!),
    };
};
