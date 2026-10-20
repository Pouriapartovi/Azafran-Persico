"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Starts transparent over the hero photo and turns solid cream once you scroll.
export function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,height] duration-500 ease-soft",
          solid && !open ? "bg-cream-soft/95 text-ink shadow-[0_1px_0_rgba(55,42,40,0.08)] backdrop-blur-sm" : "bg-transparent text-cream"
        )}
      >
        <div className={cn("container flex items-center justify-between gap-6 transition-[height] duration-500 ease-soft", solid ? "h-[72px]" : "h-[92px]")}>
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo className={cn("w-auto transition-[height] duration-500 ease-soft", solid ? "h-11" : "h-14")} />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="group relative py-1 text-sm font-semibold uppercase tracking-[0.16em]"
              >
                {item.label}
                <span className={cn("absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100", pathname === item.href && "scale-x-100")} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant={light ? "saffron" : "dark"} className="hidden sm:inline-flex">
              <Link href="/reservations">Book a table</Link>
            </Button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-soft", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-soft", open && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-earth-deep px-5 pb-10 pt-32 text-cream md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/reservations", label: "Book a table" }].map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={item.href} className={cn("font-display text-5xl", item.href === "/reservations" && "text-saffron")}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-1 text-cream/80">
              <p>{site.address.street}, Barcelona</p>
              <p>{site.phone.display}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
