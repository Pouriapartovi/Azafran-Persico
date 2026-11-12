// The five languages of the site. Spanish is the default for visitors whose browser doesn't ask for another.
export const locales = ["es", "en", "ca", "fr", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
  fr: "Français",
  fa: "فارسی",
};
export const localeShort: Record<Locale, string> = { es: "ES", en: "EN", ca: "CA", fr: "FR", fa: "فا" };
export const ogLocale: Record<Locale, string> = { es: "es_ES", en: "en_GB", ca: "ca_ES", fr: "fr_FR", fa: "fa_IR" };

export const isLocale = (v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "fa" ? "rtl" : "ltr");

// Replaces {name} placeholders in a dictionary string.
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

// Builds a link inside a language, e.g. localHref("fa", "/menu") -> "/fa/menu".
export const localHref = (locale: Locale, path: string) => `/${locale}${path === "/" ? "" : path}`;
