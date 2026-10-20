import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/our-story", "/reservations", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
