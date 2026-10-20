import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tell tailwind-merge that text-display-* are font sizes, not colours,
// so they survive next to colour classes like text-ink.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["display-xl", "display-lg", "display-md"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
