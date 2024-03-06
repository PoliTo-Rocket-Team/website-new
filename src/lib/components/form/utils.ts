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

export function signal() {
    const subs = new Set<() => void>();
    return {
        sub(fn: () => void) {
            subs.add(fn);
            return () => subs.delete(fn);
        },
        notify() {
            for (let s of subs) s();
        },
    };
}

export type SignalSub = (fn: () => void) => () => void;
