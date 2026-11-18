"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Lenis from "lenis";
import type { GalleryPhoto } from "@/lib/gallery";
import { fill } from "@/lib/i18n/config";
import { useLocale } from "./locale-provider";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Photos keep their own shape (nothing is cropped) in a masonry layout. Tap one to see it large.
export function Gallery({ photos, compact = false }: { photos: GalleryPhoto[]; compact?: boolean }) {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);
  const last = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go]);

  useEffect(() => { if (index === null) last.current?.focus(); }, [index]);

  if (!photos.length) return null;
  const photo = index === null ? null : photos[index];

  return (
    <>
      <ul className={cn("gap-2 md:gap-3", compact ? "columns-3 md:columns-6" : "columns-3 md:columns-4 lg:columns-5 xl:columns-6")}>
        {photos.map((p, i) => (
          <motion.li
            key={p.src}
            className="mb-2 break-inside-avoid md:mb-3"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
          >
            <button
              type="button"
              onClick={(e) => { last.current = e.currentTarget; setIndex(i); }}
              aria-label={fill(t.gallery.openPhoto, { name: p.alt })}
              className="group block w-full overflow-hidden bg-mist-deep"
            >
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1280px) 17vw, (min-width: 768px) 25vw, 33vw" className="h-auto w-full transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]" />
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {photo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && setIndex(null)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photo.src}
                className="relative h-full w-full"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                onClick={(e) => e.target === e.currentTarget && setIndex(null)}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <button ref={closeBtn} type="button" onClick={() => setIndex(null)} aria-label={t.gallery.close} className="absolute end-4 top-4 flex h-12 w-12 items-center justify-center text-paper hover:text-brand">
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t.gallery.previous} className="absolute start-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-paper hover:text-brand md:start-6">
                  <ChevronLeft className="h-8 w-8 rtl:-scale-x-100" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t.gallery.next} className="absolute end-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-paper hover:text-brand md:end-6">
                  <ChevronRight className="h-8 w-8 rtl:-scale-x-100" aria-hidden="true" />
                </button>
              </>
            )}
            <p className="absolute inset-x-0 bottom-4 text-center text-sm text-paper/70" aria-live="polite">{(index ?? 0) + 1} / {photos.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
