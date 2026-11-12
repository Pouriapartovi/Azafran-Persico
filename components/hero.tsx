"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useLocale } from "./locale-provider";
import { localHref } from "@/lib/i18n/config";

// A slow crossfade between real dishes. Pass `video` (a muted MP4 in /public) to use a film instead.
// `mobile` is an optional portrait version shown on phones, so a wide photo is not cut down to a sliver.
export type HeroSlide = { src: string; alt: string; position?: string; mobile?: { src: string; position?: string } };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ slides, video }: { slides: HeroSlide[]; video?: string }) {
  const { locale, t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  useEffect(() => {
    if (reduce || video || slides.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [reduce, video, slides.length]);

  const slide = slides[index];
  const soft = (line: string) => line.split(/(&|\.)/).map((p, j) => (p === "&" || p === "." ? <span key={j} className="soft-mark !text-saffron-light">{p}</span> : p));

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-earth-deep text-cream" aria-label={t.hero.eyebrow}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        {video ? (
          <video className="h-full w-full object-cover" src={video} poster={slides[0]?.src} autoPlay muted loop playsInline />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeInOut" }}>
              <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className={`animate-kenburns object-cover ${slide.mobile ? "hidden md:block" : ""}`} style={{ objectPosition: slide.position ?? "50% 50%" }} />
              {slide.mobile && (
                <Image src={slide.mobile.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="animate-kenburns object-cover md:hidden" style={{ objectPosition: slide.mobile.position ?? "50% 50%" }} />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Two layers of shade: one from the bottom, one from the side where the text sits. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,19,14,0.35)_0%,rgba(30,19,14,0.1)_30%,rgba(30,19,14,0.45)_62%,rgba(30,19,14,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(30,19,14,0.7)_0%,rgba(30,19,14,0.35)_45%,transparent_75%)] rtl:bg-[linear-gradient(270deg,rgba(30,19,14,0.7)_0%,rgba(30,19,14,0.35)_45%,transparent_75%)]" />

      <motion.div className="container relative flex h-full flex-col justify-end pb-12 pt-28 md:pb-16" style={reduce ? undefined : { opacity: fade }}>
        <motion.p className="eyebrow mb-5 !text-saffron-light [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
          {t.hero.eyebrow}
        </motion.p>
        <h1 className="font-display text-hero font-medium [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]">
          {t.hero.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.09 }}>
                {soft(line)}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        >
          <p className="max-w-md text-lg text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">{t.hero.sub}</p>
          <Button asChild variant="light" className="self-start sm:self-auto">
            <Link href={localHref(locale, "/menu")}>{t.hero.seeMenu}</Link>
          </Button>
        </motion.div>
        {!video && slides.length > 1 && (
          <div className="mt-8 flex gap-2" aria-hidden="true">
            {slides.map((s, i) => (
              <span key={s.src} className="h-[2px] w-10 overflow-hidden bg-cream/25">
                {i === index && <motion.span className="block h-full bg-saffron" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: reduce ? 0 : 6.5, ease: "linear" }} />}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
