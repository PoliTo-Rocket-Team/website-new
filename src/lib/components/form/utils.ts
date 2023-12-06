import type { Schema, ValidationError } from "yup";

const spaces = /\s/g;
export function label2name(v: string) {
    return v.toLowerCase().replace(spaces, "-");
}

function retemptyarr() {
    return [] as string[];
}
function extract(e: ValidationError) {
    return e.errors;
}
export function getErrs(s: Schema, val: any) {
    return s.validate(val, { abortEarly: false }).then(retemptyarr, extract);
}
