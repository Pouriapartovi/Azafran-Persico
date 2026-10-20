"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MenuSection } from "@/lib/menu";
import { cn } from "@/lib/utils";

// Horizontal rail of menu sections. Scrolls with arrows, trackpad, touch, or drag.
export function MenuRail({ sections }: { sections: MenuSection[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = rail.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el?.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 24), behavior: reduce ? "auto" : "smooth" });
  };

  // Drag with the mouse; touch and trackpads scroll natively.
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const onDown = (e: React.PointerEvent) => { if (e.pointerType !== "mouse") return; drag.current = { down: true, x: e.clientX, left: rail.current!.scrollLeft, moved: false }; };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    rail.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => { drag.current.down = false; };

  return (
    <div>
      <div className="container mb-8 flex justify-end gap-3">
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => step(dir as 1 | -1)}
            disabled={dir === -1 ? atStart : atEnd}
            aria-label={dir === -1 ? "Previous menu sections" : "Next menu sections"}
            className="group flex h-14 w-14 items-center justify-center border border-ink/30 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-30"
          >
            {dir === -1 ? <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" /> : <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />}
          </button>
        ))}
      </div>
      <ul
        ref={rail}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; } }}
        className="flex snap-x snap-mandatory scroll-pl-5 gap-6 overflow-x-auto pb-4 pl-5 pr-5 md:scroll-pl-8 xl:scroll-pl-[max(3rem,calc((100vw-1440px)/2+3rem))] [scrollbar-width:none] md:pl-8 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] [&::-webkit-scrollbar]:hidden"
        aria-label="Menu sections"
      >
        {sections.map((s) => (
          <li key={s.id} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw] xl:w-[26vw] 2xl:max-w-[420px]">
            <Link href={`/menu#${s.id}`} draggable={false} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
                <Image src={s.cover} alt={`${s.title} at Azafrán Pérsico`} fill draggable={false} sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw" className="pointer-events-none object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(43,28,22,0.7)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p lang="fa" dir="rtl" className="font-farsi text-lg text-saffron-light">{s.fa}</p>
                  <p className="font-display text-4xl">{s.titleEs}</p>
                </div>
              </div>
              <p className={cn("mt-4 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.16em] text-ink")}>
                {s.title} · {s.dishes.length} dishes
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1.5" />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
