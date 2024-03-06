import type { Actions } from "./$types";
import { askAddition } from "./logic";

export const actions: Actions = {
    default: async ({ params, request, locals }) =>
        askAddition(+params.id, await request.formData(), locals.supabase),
};
