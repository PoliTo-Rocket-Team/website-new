// import type { RequestHandler } from "./$types";
// export const POST: RequestHandler = () => {
//     return
// };

import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const POST: RequestHandler = async ({
  params,
  locals,
  request,
  url,
}) => {
  const positions = await locals.supabase
    .from("positions")
    .select()
    .eq("division", params.id);
  return json(positions);
};
