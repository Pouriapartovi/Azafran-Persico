import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-earth-deep text-cream" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Contact and location</h2>
      <div className="container grid gap-14 py-20 lg:grid-cols-12 md:py-28">
        <div className="lg:col-span-5">
          <Logo className="h-24 w-auto text-cream md:h-28" />
          <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-cream/90">
            Persian hospitality <span className="soft-mark">&amp;</span> Mediterranean ingredients, in the heart of the Eixample<span className="soft-mark">.</span>
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 className="eyebrow !text-saffron-light">Find us</h3>
            <address className="mt-4 not-italic leading-relaxed text-cream/85">
              {site.address.street}
              <br />
              {site.address.corner}
              <br />
              {site.address.city}
            </address>
            <a href={site.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-cream/40 pb-0.5 text-sm hover:border-saffron hover:text-saffron">
              Get directions
            </a>
          </div>
          <div>
            <h3 className="eyebrow !text-saffron-light">Hours</h3>
            <dl className="mt-4 space-y-2 text-cream/85">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-sm text-cream/60">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="eyebrow !text-saffron-light">Talk to us</h3>
            <ul className="mt-4 space-y-2 text-cream/85">
              <li><a href={`tel:${site.phone.tel}`} className="hover:text-saffron">{site.phone.display}</a></li>
              <li><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-saffron">WhatsApp</a></li>
              <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="break-words hover:text-saffron">Instagram<span className="block text-sm text-cream/60">{site.instagram.handle}</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container flex flex-col gap-4 py-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/" className="hover:text-cream">Home</Link>
            {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-cream">{n.label}</Link>)}
            <Link href="/reservations" className="hover:text-cream">Reservations</Link>
          </nav>
          <p>© {new Date().getFullYear()} {site.name} · Barcelona</p>
        </div>
      </div>
    </footer>
  );
}
