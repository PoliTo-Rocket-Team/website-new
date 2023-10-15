import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

// export const load: PageLoad = async ({ parent }) => {
//     let { supabase, session } = await parent();
//     if(!session) {
//         session = (await supabase.auth.getSession()).data.session;
//         if(!session) throw redirect(303, "/auth/login");
//     }
//     const res = await supabase.from("people").select("id, first_name, last_name, linkedin").eq("user", session!.user.id);
//     if(res.error) {
//         console.log(session);
//         throw error(500, {
//             message: "Invalid session",
//             details: res.error.details
//         });
//     }
//     if(res.data.length === 0) return {person: null}
//     const person = res.data[0];

//     const data = await Promise.all([
//         supabase.from("divisions").select("name, code, acting:lead_acting, subteam:subteams(name,code)").eq("lead", person.id),
//         supabase.from("subteams").select("title:title_name, code").eq("chief", person.id),
//         supabase.from("positions").select("id, name, number, division:divisions(name,code)")
//     ]);

//     return {
//         person, 
//         divisions: data[0].data!,
//         subteams: data[1].data!,
//         positions: data[2].data!,
//     }
// };