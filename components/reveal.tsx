"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

// Fades a block up as it enters the viewport, once.
export function Reveal({ delay = 0, y = 40, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
