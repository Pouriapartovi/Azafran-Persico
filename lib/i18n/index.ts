import { ca } from "./dictionaries/ca";
import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { fa } from "./dictionaries/fa";
import { fr } from "./dictionaries/fr";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, es, ca, fr, fa };
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export type { Dictionary };
export * from "./config";

import { locales as allLocales } from "./config";

// Links a page to its versions in the other languages, for search engines.
export function alternates(locale: Locale, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries([...allLocales.map((l) => [l, `/${l}${path}`]), ["x-default", `/es${path}`]]),
  };
}
