"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLocale } from "./locale-provider";
import { fill, localHref } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

// Headline on white beside a sliding carousel of dishes.
// `caption` is the index into t.hero.slides (the dish name in each language).
// `mobile` is an optional portrait photo for phones.
export type HeroSlide = { src: string; caption: number; position?: string; mobile?: { src: string; position?: string } };

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 5000;

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();
  const rtl = locale === "fa";
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => setState(([i]) => [(i + step + slides.length) % slides.length, step]), [slides.length]);
  const goTo = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const timer = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, reduce, paused, go, slides.length]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (Math.abs(swipe) < 60) return;
    // Swiping towards the reading direction moves forward.
    go((swipe < 0) !== rtl ? 1 : -1);
  };

  const slide = slides[index];
  const name = t.hero.slides[slide.caption];
  const sign = rtl ? -1 : 1;
  const soft = (line: string) => line.split(/(&|\.)/).map((p, j) => (p === "&" || p === "." ? <span key={j} className="soft-mark">{p}</span> : p));

  return (
    <section className="bg-paper" aria-label={t.hero.eyebrow}>
      <div className="container grid gap-8 pb-12 pt-6 md:pb-16 lg:min-h-[calc(100svh-76px)] lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-10">
        {/* Carousel */}
        <div
          className="relative order-1 lg:order-2 lg:col-span-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label={t.hero.carousel}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist sm:aspect-[4/3] lg:aspect-auto lg:h-[calc(100svh-76px-5rem)] lg:max-h-[820px] lg:min-h-[480px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                custom={direction}
                variants={{
                  enter: (dir: number) => (reduce ? { opacity: 0 } : { x: `${dir * sign * 100}%` }),
                  center: { x: "0%", opacity: 1 },
                  exit: (dir: number) => (reduce ? { opacity: 0 } : { x: `${-dir * sign * 100}%` }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.3 : 0.9, ease: EASE }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onDragEnd}
                role="group"
                aria-roledescription="slide"
                aria-label={fill(t.hero.slideOf, { n: index + 1, total: slides.length })}
              >
                <Image src={slide.src} alt={name} fill priority={index === 0} draggable={false} sizes="(min-width: 1024px) 58vw, 100vw" className={cn("pointer-events-none select-none object-cover", slide.mobile && "hidden sm:block")} style={{ objectPosition: slide.position ?? "50% 50%" }} />
                {slide.mobile && (
                  <Image src={slide.mobile.src} alt={name} fill priority={index === 0} draggable={false} sizes="100vw" className="pointer-events-none select-none object-cover sm:hidden" style={{ objectPosition: slide.mobile.position ?? "50% 50%" }} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Dish name */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`cap-${index}`}
                className="absolute bottom-4 start-4 bg-white px-4 py-2 text-sm font-semibold text-ink md:bottom-6 md:start-6"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.35 }}
                aria-hidden="true"
              >
                {name}
              </motion.p>
            </AnimatePresence>

            {/* Arrows */}
            <div className="absolute bottom-4 end-4 flex gap-2 md:bottom-6 md:end-6">
              <button type="button" onClick={() => go(-1)} aria-label={t.hero.previous} className="flex h-11 w-11 items-center justify-center bg-white text-ink transition-colors hover:bg-brand hover:text-white">
                <ArrowLeft className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.hero.next} className="flex h-11 w-11 items-center justify-center bg-white text-ink transition-colors hover:bg-brand hover:text-white">
                <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Dots with progress */}
          <div className="mt-4 flex gap-2">
            {slides.map((s, i) => (
              <button key={s.src} type="button" onClick={() => goTo(i)} aria-label={fill(t.hero.goTo, { name: t.hero.slides[s.caption] })} aria-current={i === index} className="group flex h-6 flex-1 items-center">
                <span className="relative block h-[3px] w-full overflow-hidden bg-mist-deep">
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 start-0 bg-brand"
                      initial={{ width: reduce || paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce || paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                  {i !== index && <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <motion.p className="eyebrow mb-5" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            {t.hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-hero font-medium text-ink lg:text-[length:clamp(2.6rem,0.5rem+3.3vw,4.6rem)]">
            {t.hero.lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.08 }}>
                  {soft(line)}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}>
            <p className="mt-6 max-w-md text-lg text-ink-soft">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link href={localHref(locale, "/menu")}>{t.hero.seeMenu}</Link></Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
