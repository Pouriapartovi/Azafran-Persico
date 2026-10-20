"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Shorter hero for inner pages: photo with parallax, title set large at the lower left.
export function PageHero({ title, eyebrow, image, alt, position = "50% 50%", children }: { title: string; eyebrow: string; image: string; alt: string; position?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parts = title.split(/(&|\.)/);

  return (
    <section ref={ref} className="relative h-[72svh] min-h-[460px] overflow-hidden bg-earth-deep text-cream">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <Image src={image} alt={alt} fill priority sizes="100vw" className="animate-kenburns object-cover" style={{ objectPosition: position }} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(43,28,22,0.55)_0%,rgba(43,28,22,0.1)_35%,rgba(43,28,22,0.8)_100%)]" />
      <div className="container relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <motion.p className="eyebrow mb-5 !text-saffron-light" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          {eyebrow}
        </motion.p>
        <h1 className="overflow-hidden pb-[0.06em] font-display text-display-lg font-medium">
          <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}>
            {parts.map((p, i) => (p === "&" || p === "." ? <span key={i} className="soft-mark !text-saffron-light">{p}</span> : p))}
          </motion.span>
        </h1>
        {children && (
          <motion.div className="mt-6 max-w-xl text-lg text-cream/90" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
