import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";

const pages = ["", "/menu", "/our-story", "/reservations", "/contact"];

// Every page in every language, each listing its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/menu" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    }))
  );
}
