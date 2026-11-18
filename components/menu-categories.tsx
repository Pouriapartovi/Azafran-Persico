"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Lenis from "lenis";
import type { MenuSection } from "@/lib/menu";
import { fill, localHref } from "@/lib/i18n/config";
import { Flower } from "./logo";
import { useLocale } from "./locale-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

// Every menu section as a card. A card opens a panel with that section's dishes.
export function MenuCategories({ sections }: { sections: MenuSection[] }) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = sections.find((s) => s.id === openId) ?? null;
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastCard = useRef<HTMLButtonElement | null>(null);
  const count = (n: number) => fill(t.categories.dishes, { n: n.toLocaleString(locale) });

  // While the panel is open: stop page scrolling, close on Escape, return focus to the card afterwards.
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
      lastCard.current?.focus();
    };
  }, [open]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        {sections.map((s, i) => (
          <li key={s.id}>
            <motion.button
              type="button"
              onClick={(e) => { lastCard.current = e.currentTarget; setOpenId(s.id); }}
              aria-haspopup="dialog"
              aria-label={fill(t.categories.open, { name: s.title[locale] })}
              className="group block w-full text-start"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <motion.div layoutId={reduce ? undefined : `cat-${s.id}`} className="relative aspect-[4/5] overflow-hidden bg-mist">
                <Image src={s.cover} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.06]" />
                <span className="absolute start-3 top-3 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-leaf-deep">{count(s.dishes.length)}</span>
              </motion.div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="min-w-0 font-display text-2xl leading-tight text-ink md:text-3xl">{s.title[locale]}</p>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/15 text-ink transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
            <motion.div className="absolute inset-0 bg-ink/50 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setOpenId(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="category-title"
              className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden bg-white shadow-[0_30px_80px_rgba(21,23,28,0.3)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex shrink-0 items-center gap-4 border-b border-line p-4 pe-16 md:gap-6 md:p-6 md:pe-20">
                <motion.div layoutId={reduce ? undefined : `cat-${open.id}`} className="relative h-16 w-16 shrink-0 overflow-hidden bg-mist md:h-20 md:w-20">
                  <Image src={open.cover} alt="" fill sizes="80px" className="object-cover" />
                </motion.div>
                <div className="min-w-0">
                  <h3 id="category-title" className="font-display text-3xl leading-none text-ink md:text-4xl">{open.title[locale]}<span className="soft-mark">.</span></h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-leaf-deep">{count(open.dishes.length)}</p>
                </div>
              </div>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpenId(null)}
                aria-label={t.categories.close}
                className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center bg-mist text-ink transition-colors hover:bg-brand hover:text-white md:end-6 md:top-6"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="overflow-y-auto overscroll-contain p-4 md:p-6" data-lenis-prevent>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 md:gap-x-6">
                  {open.dishes.map((dish, i) => (
                    <motion.li
                      key={dish.id}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.035 }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                        {dish.image ? (
                          <Image src={dish.image} alt="" fill sizes="(min-width: 768px) 320px, 50vw" className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-leaf" title={t.categories.noPhoto}>
                            <Flower className="h-1/3 w-1/3 opacity-60" />
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-2">
                        <p className="min-w-0 font-display text-lg leading-tight text-ink">{dish.name[locale]}</p>
                        <p dir="ltr" className="shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-brand-deep">{dish.price ? `${dish.price} €` : t.categories.askUs}</p>
                      </div>
                      {dish.desc && <p className="mt-1 text-sm leading-snug text-ink-soft">{dish.desc[locale]}</p>}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-end border-t border-line pt-5">
                  <Link href={`${localHref(locale, "/menu")}#${open.id}`} onClick={() => setOpenId(null)} className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-deep">
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
