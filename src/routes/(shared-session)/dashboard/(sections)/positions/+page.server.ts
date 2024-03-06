import { save } from "$lib/components/position/validation";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        return save(data, locals.supabase);
    },
};
