import { error, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { session2user, type PersonData } from "$lib/supabase";

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

    const res = await supabase.rpc("get_person_data", { user_uuid: user.id });
    if (res.error)
        throw error(500, {
            message: "Invalid session",
            details: res.error.message,
        });
    if (!res.data.length) return { user };
    const person = res.data[0] as PersonData;

    return {
        user,
        person,
        pic: person.has_pp
            ? supabase.storage
                  .from("people-pics")
                  .getPublicUrl(
                      `${person.id}-${person.last_name.replace(" ", "")}.jpeg`
                  ).data.publicUrl
            : "https://api.dicebear.com/7.x/micah/svg?backgroundColor=transparent&seed=" +
              encodeURI(person.first_name),
    };
};
