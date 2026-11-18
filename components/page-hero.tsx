"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Header for inner pages: title on white beside a photo.
export function PageHero({ title, eyebrow, image, alt, position = "50% 50%", children }: { title: string; eyebrow: string; image: string; alt: string; position?: string; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const parts = title.split(/(&|\.)/);

  return (
    <section className="bg-mist">
      <div className="container grid items-center gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <motion.p className="eyebrow mb-5" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            {eyebrow}
          </motion.p>
          <h1 className="overflow-hidden pb-[0.06em] font-display text-display-lg font-medium text-ink">
            <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
              {parts.map((p, i) => (p === "&" || p === "." ? <span key={i} className="soft-mark">{p}</span> : p))}
            </motion.span>
          </h1>
          {children && (
            <motion.div className="mt-6 max-w-xl text-lg text-ink-soft" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}>
              {children}
            </motion.div>
          )}
        </div>
        <motion.div
          className="relative aspect-[16/10] overflow-hidden bg-mist-deep lg:col-span-6"
          initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        >
          <Image src={image} alt={alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="animate-kenburns object-cover" style={{ objectPosition: position }} />
        </motion.div>
      </div>
    </section>
  );
}
