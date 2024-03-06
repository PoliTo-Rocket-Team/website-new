const space_re = / /g;
const accent_a = /[àá]/g;
const accent_e = /[èé]/g;
const accent_i = /[ìíı]/g;
const accent_o = /[òóö]/g;
const accent_u = /[ùúü]/g;
const accent_c = /ç/g;
const accent_s = /ş/g;
const accent_g = /ğ/g;

export function normalize(s: string) {
    return s
        .replace(space_re, "")
        .replace(accent_a, "a")
        .replace(accent_e, "e")
        .replace(accent_i, "i")
        .replace(accent_o, "o")
        .replace(accent_u, "u")
        .replace(accent_c, "c")
        .replace(accent_s, "s")
        .replace(accent_g, "g");
}
