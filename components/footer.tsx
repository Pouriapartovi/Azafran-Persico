"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { useLocale } from "./locale-provider";
import { localHref } from "@/lib/i18n/config";

export function Footer() {
  const { locale, t } = useLocale();
  const tagline = t.footer.tagline.split(/(&|\.)/);
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/our-story", label: t.nav.story },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
    { href: "/reservations", label: t.footer.reservations },
  ];
  return (
    <footer className="bg-mist text-ink" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">{t.footer.title}</h2>
      <div className="container grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo className="h-24 w-auto text-ink md:h-28" />
          <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ink">
            {tagline.map((p, i) => (p === "&" || p === "." ? <span key={i} className="soft-mark">{p}</span> : p))}
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 className="eyebrow">{t.footer.findUs}</h3>
            <address className="mt-4 not-italic leading-relaxed text-ink-soft">
              {site.address.street}
              <br />
              {t.contactPage.corner}
              <br />
              {site.address.city}
            </address>
            <a href={site.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-ink/30 pb-0.5 text-sm hover:border-brand-deep hover:text-brand-deep">
              {t.footer.directions}
            </a>
          </div>
          <div>
            <h3 className="eyebrow">{t.footer.hours}</h3>
            <dl className="mt-4 space-y-2 text-ink-soft">
              <div><dt className="text-sm text-ink-soft">{t.hours.monday}</dt><dd>{t.hours.closed}</dd></div>
              <div><dt className="text-sm text-ink-soft">{t.hours.tueSun}</dt><dd>{t.hours.time}</dd></div>
            </dl>
          </div>
          <div>
            <h3 className="eyebrow">{t.footer.talk}</h3>
            <ul className="mt-4 space-y-2 text-ink-soft">
              <li><a href={`tel:${site.phone.tel}`} dir="ltr" className="hover:text-brand-deep">{site.phone.display}</a></li>
              <li><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-deep">WhatsApp</a></li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="break-words hover:text-brand-deep">
                  Instagram<span dir="ltr" className="block text-sm text-ink-soft">{site.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container flex flex-col gap-4 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((n) => <Link key={n.href} href={localHref(locale, n.href)} className="hover:text-ink">{n.label}</Link>)}
          </nav>
          <p>© {new Date().getFullYear()} {site.name} · Barcelona</p>
        </div>
      </div>
    </footer>
  );
}
