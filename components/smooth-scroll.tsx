"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Smooth, slightly weighted scrolling. Turned off for people who prefer reduced motion.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: { offset: -80 } });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // New page starts at the top unless the link points at a section.
  useEffect(() => {
    if (window.location.hash) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
