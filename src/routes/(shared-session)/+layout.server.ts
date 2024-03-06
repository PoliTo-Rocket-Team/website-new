import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async e => ({ session: e.locals.session });