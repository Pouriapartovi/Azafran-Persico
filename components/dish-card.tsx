"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Dish } from "@/lib/menu";
import { Flower } from "./logo";
import { cn } from "@/lib/utils";

// Photo card that leans toward the pointer and zooms the dish slightly on hover.
export function DishCard({ dish, className, showFarsi = true }: { dish: Dish; className?: string; showFarsi?: boolean }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.article
      className={cn("group [perspective:1000px]", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div style={reduce ? undefined : { rotateX, rotateY }} className="will-change-transform">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
          {dish.image ? (
            <Image
              src={dish.image}
              alt={`${dish.en} at Azafrán Pérsico`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
              className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.07]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-earth text-saffron-light">
              <Flower className="h-1/3 w-1/3 opacity-80" />
            </div>
          )}
          {dish.persian && (
            <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-saffron-light">◆ Persian recipe</span>
          )}
        </div>
      </motion.div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          {showFarsi && <p lang="fa" dir="rtl" className="font-farsi text-base text-saffron-deep">{dish.fa}</p>}
          <h3 className="font-display text-2xl leading-tight text-ink">{dish.es}</h3>
          <p className="mt-1 text-sm text-ink-soft">{dish.en}</p>
        </div>
        {dish.price && <p className="shrink-0 font-display text-xl text-ink tabular-nums">{dish.price} €</p>}
      </div>
    </motion.article>
  );
}
