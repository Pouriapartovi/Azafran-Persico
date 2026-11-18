"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import { localHref } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

// Always a clean white bar; it gains a hairline once the page scrolls.
export function Nav() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/menu", label: t.nav.menu },
    { href: "/our-story", label: t.nav.story },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
  ];

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

  const isCurrent = (href: string) => pathname === localHref(locale, href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ease-soft",
          "bg-white/95 text-ink backdrop-blur-sm",
          solid && !open && "shadow-[0_1px_0_rgba(21,23,28,0.08)]"
        )}
      >
        <div className={cn("container relative flex items-center justify-between gap-4 transition-[height] duration-500 ease-soft", "h-[76px]")}>
          <Link href={localHref(locale, "/")} aria-label={`${site.name}, ${t.nav.home}`} className="shrink-0">
            <Logo className={cn("w-auto transition-[height] duration-500 ease-soft", "h-12")} />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={localHref(locale, item.href)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className="group relative py-1 text-sm font-semibold uppercase tracking-[0.16em]"
              >
                {item.label}
                <span className={cn("absolute inset-x-0 -bottom-0.5 h-px origin-[inline-end] scale-x-0 bg-current transition-transform duration-500 ease-soft group-hover:origin-[inline-start] group-hover:scale-x-100", isCurrent(item.href) && "scale-x-100")} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher onDark={false} />
            <Button asChild size="sm"  className="hidden sm:inline-flex">
              <Link href={localHref(locale, "/reservations")}>{t.nav.book}</Link>
            </Button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute start-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-soft", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 start-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-soft", open && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-5 pb-10 pt-32 text-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {[{ href: "/", label: t.nav.home }, ...links, { href: "/reservations", label: t.nav.book }].map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={localHref(locale, item.href)} className={cn("font-display text-5xl", item.href === "/reservations" && "text-brand")}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-1 text-ink-soft">
              <p>{site.address.street}, Barcelona</p>
              <p dir="ltr" className="text-start">{site.phone.display}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
