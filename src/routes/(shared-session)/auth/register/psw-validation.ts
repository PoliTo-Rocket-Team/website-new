export const pswCriteria = [
    "have at least 10 characters",
    "contain at least one digit",
    "contain both upper and lower case letters",
    "contain at least one symbol"
];

const d = /\d/;
const l = /[a-z]/;
const u = /[A-Z]/;
const s = /[\(\)\[\]\{\}.:;,!?@#€£$%^&*_-=+<>*|\\\/~`'"°§]/;

export function getPswCriteriaMask(v: string) {
    return 0 | +!(v.length >= 10) | (+!(d.test(v)) << 1) | (+!(l.test(v) && u.test(v)) << 2) | (+!(s.test(v)) << 3);
}