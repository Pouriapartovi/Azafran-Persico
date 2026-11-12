"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Lenis from "lenis";
import { dishName, dishSubName, type MenuSection } from "@/lib/menu";
import { fill } from "@/lib/i18n/config";
import { Flower } from "./logo";
import { useLocale } from "./locale-provider";
import { localHref } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
// Layout of the tiles on wide screens: two large on top, three below.
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

// Every menu section as a photo tile. A tile grows into a panel with that section's dishes.
export function MenuCategories({ sections }: { sections: MenuSection[] }) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = sections.find((s) => s.id === openId) ?? null;
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastTile = useRef<HTMLButtonElement | null>(null);

  // While the panel is open: stop page scrolling, close on Escape, return focus to the tile afterwards.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => closeBtn.current?.focus(), 50);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
      lastTile.current?.focus();
    };
  }, [open]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {sections.map((s, i) => (
          <li key={s.id} className={cn(SPANS[i] ?? "lg:col-span-2", i === 0 && "sm:col-span-2 lg:col-span-3")}>
            <motion.button
              type="button"
              onClick={(e) => { lastTile.current = e.currentTarget; setOpenId(s.id); }}
              aria-haspopup="dialog"
              aria-label={fill(t.categories.open, { name: s.title[locale] })}
              className="group block w-full text-start"
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <motion.div layoutId={reduce ? undefined : `cat-${s.id}`} className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
                <Image src={s.cover} alt="" fill sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(30,19,14,0.78)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-cream md:p-8">
                  <div>
                    {locale !== "fa" && <p lang="fa" dir="rtl" className="font-farsi text-lg text-saffron-light">{s.title.fa}</p>}
                    <p className="font-display text-4xl leading-none md:text-5xl">{s.title[locale]}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-cream/60 transition-colors duration-500 group-hover:border-saffron group-hover:bg-saffron group-hover:text-ink">
                    <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
                  </span>
                </div>
              </motion.div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">{fill(t.categories.dishes, { n: s.dishes.length.toLocaleString(locale) })}</p>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
            <motion.div className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} onClick={() => setOpenId(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="category-title"
              className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden bg-cream-soft shadow-[0_30px_80px_rgba(30,19,14,0.45)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.div layoutId={reduce ? undefined : `cat-${open.id}`} className="relative h-40 shrink-0 overflow-hidden sm:h-56">
                <Image src={open.cover} alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,19,14,0.2)_0%,rgba(30,19,14,0.75)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream md:p-8">
                  {locale !== "fa" && <p lang="fa" dir="rtl" className="font-farsi text-lg text-saffron-light">{open.title.fa}</p>}
                  <h3 id="category-title" className="font-display text-4xl leading-none md:text-5xl">{open.title[locale]}<span className="soft-mark !text-saffron-light">.</span></h3>
                </div>
              </motion.div>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpenId(null)}
                aria-label={t.categories.close}
                className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center bg-cream-soft/90 text-ink transition-colors hover:bg-saffron"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="overflow-y-auto overscroll-contain px-6 py-6 md:px-8" data-lenis-prevent>
                <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {open.dishes.map((dish, i) => (
                    <motion.li
                      key={dish.id}
                      className="grid grid-cols-[96px_minmax(0,1fr)] gap-4"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.04 }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
                        {dish.image ? (
                          <Image src={dish.image} alt="" fill sizes="96px" className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-earth text-saffron-light" title={t.categories.noPhoto}>
                            <Flower className="h-1/2 w-1/2 opacity-70" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 border-b border-gold-line/50 pb-4">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="min-w-0 font-display text-lg leading-tight text-ink">
                            {dish.persian && <span className="me-1.5 text-sm text-gold" title={t.categories.persianRecipe}>◆</span>}
                            {dishName(dish, locale)}
                          </p>
                          <p dir="ltr" className="shrink-0 font-display text-base tabular-nums text-ink">{dish.price ? `${dish.price} €` : t.categories.askUs}</p>
                        </div>
                        <p lang={locale === "es" ? "fa" : "es"} className="mt-0.5 text-sm text-saffron-deep">{dishSubName(dish, locale)}</p>
                        {dish.desc && <p className="mt-1 text-sm text-ink-soft">{dish.desc[locale]}</p>}
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-end">
                  <Link href={`${localHref(locale, "/menu")}#${open.id}`} onClick={() => setOpenId(null)} className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold-line underline-offset-8 hover:decoration-saffron">
                    {t.categories.fullMenu}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
