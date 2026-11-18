"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { localeNames, localeShort, locales, type Locale } from "@/lib/i18n/config";
import { useLocale } from "./locale-provider";
import { cn } from "@/lib/utils";

// Same page in another language. Remembers the choice for a year.
export function LanguageSwitcher({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  const pathFor = (l: Locale) => `/${l}${pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "")}`;
  const remember = (l: Locale) => { document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`; };

  return (
    <div ref={box} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${t.nav.language}: ${localeNames[locale]}`}
        className="flex h-11 items-center gap-1.5 px-2 text-sm font-semibold uppercase tracking-[0.12em]"
      >
        {localeShort[locale]}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute end-0 top-full z-50 mt-2 min-w-[160px] py-2 shadow-[0_12px_40px_rgba(43,28,22,0.25)]", onDark ? "bg-night text-paper" : "bg-paper text-ink")}
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={pathFor(l)}
                  hrefLang={l}
                  lang={l}
                  onClick={() => { remember(l); setOpen(false); }}
                  aria-current={l === locale ? "true" : undefined}
                  className={cn("flex items-center justify-between gap-4 px-4 py-2.5 text-base transition-colors hover:bg-brand/15", l === locale && "font-semibold text-brand-deep")}
                >
                  {localeNames[l]}
                  <span className="text-xs opacity-60">{localeShort[l]}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
