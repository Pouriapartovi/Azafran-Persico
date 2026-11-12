import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";

// Every photo in /public/gallery appears in the home page gallery, in alphabetical order.
// To add one, upload a JPG, PNG or WebP to that folder. Name it with words and hyphens
// (e.g. "terrace-at-night.jpg"): the name becomes its description for screen readers.
// Start a name with a number ("01-...") to choose the order.
export type GalleryPhoto = { src: string; alt: string; width: number; height: number };

export function getGalleryPhotos(): GalleryPhoto[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((file) => {
      const { width = 1200, height = 900 } = sizeOf(fs.readFileSync(path.join(dir, file)));
      const words = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
      return { src: `/gallery/${file}`, alt: words.charAt(0).toUpperCase() + words.slice(1), width, height };
    });
}
