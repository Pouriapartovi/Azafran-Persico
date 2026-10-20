"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  strength?: number; // how far the photo drifts, in % of its frame
  position?: string; // object-position, to keep the dish in view
};

// A photo that drifts gently against the scroll inside a fixed frame, and wipes in on entry.
export function ParallaxImage({ src, alt, className, sizes = "100vw", priority, strength = 8, position = "50% 50%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden bg-cream-deep", className)}
      initial={reduce ? false : { clipPath: "inset(12% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-[-10%_0]" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </motion.div>
  );
}
