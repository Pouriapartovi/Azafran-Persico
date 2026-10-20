"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";

// Until a hero film exists, the hero is a slow crossfade between real dishes from the kitchen.
// To use a video instead, pass `video` (a muted MP4 in /public) and keep `slides[0]` as its poster.
export type HeroSlide = { src: string; alt: string; position?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ slides, video }: { slides: HeroSlide[]; video?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  useEffect(() => {
    if (reduce || video || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [reduce, video, slides.length]);

  const lines = ["Persian soul", "& Mediterranean", "table."];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-earth-deep text-cream" aria-label="Welcome">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        {video ? (
          <video className="h-full w-full object-cover" src={video} poster={slides[0]?.src} autoPlay muted loop playsInline />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeInOut" }}>
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="animate-kenburns object-cover"
                style={{ objectPosition: slides[index].position ?? "50% 50%" }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
      {/* Shade so the headline stays readable on any photo */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(43,28,22,0.55)_0%,rgba(43,28,22,0.05)_32%,rgba(43,28,22,0.15)_55%,rgba(43,28,22,0.82)_100%)]" />

      <motion.div className="container relative flex h-full flex-col justify-end pb-14 md:pb-20" style={reduce ? undefined : { opacity: fade }}>
        <motion.p className="eyebrow mb-6 !text-saffron-light" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
          Persian &amp; Mediterranean · Eixample, Barcelona
        </motion.p>
        <h1 className="font-display text-display-xl font-medium">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.09 }}
              >
                {line.split(/(&|\.)/).map((p, j) => (p === "&" || p === "." ? <span key={j} className="soft-mark !text-saffron-light">{p}</span> : p))}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        >
          <p className="max-w-md text-lg text-cream/90">Saffron kebabs and Persian stews beside tapas and paella. Real saffron from Iran, cooked by a family from Tehran.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link href="/reservations">Book a table</Link></Button>
            <Button asChild variant="light"><Link href="/menu">See the menu</Link></Button>
          </div>
        </motion.div>
        {!video && slides.length > 1 && (
          <div className="mt-10 flex gap-2" aria-hidden="true">
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
