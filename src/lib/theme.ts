import { derived, writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

const RECORD = "PRT-theme";

let system: Writable<Theme>;
let preference: Writable<ThemePreference>;

if (!browser) {
  system = writable("light");
  preference = writable("system");
} else {
  const theme_media = matchMedia("(prefers-color-scheme: dark)");
  system = writable(theme_media.matches ? "dark" : "light");
  theme_media.addEventListener("change", (e) =>
    system.set(e.matches ? "dark" : "light"),
  );
  preference = writable(
    (localStorage.getItem(RECORD) as ThemePreference) || "system",
  );
  preference.subscribe((v) => localStorage.setItem(RECORD, v));
}

export { system, preference };

export const theme = derived([preference, system], ([p, s]) =>
  p === "system" ? s : p,
);
