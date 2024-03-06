import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p => {
    const v = +p;
    return Number.isSafeInteger(v) && v >= 0;
}