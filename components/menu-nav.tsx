"use client";

import { useEffect, useState } from "react";
import type { MenuSection } from "@/lib/menu";
import { cn } from "@/lib/utils";

// Sticky row of section links that follows you down the menu.
export function MenuNav({ sections }: { sections: Pick<MenuSection, "id" | "titleEs">[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Menu sections" className="sticky top-[72px] z-30 border-y border-gold-line/50 bg-cream-soft/95 backdrop-blur-sm">
      <ul className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "block px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                active === s.id ? "bg-ink text-cream" : "text-ink-soft hover:text-ink"
              )}
            >
              {s.titleEs}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
