import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { alternates, getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.meta.contact, description: t.meta.contactDescription, alternates: alternates(params.locale, "/contact") };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDictionary(params.locale);
  const c = t.contactPage;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} image="/images/solomillo.jpg" alt={c.heroAlt} position="60% 50%" />
      <section className="container grid gap-16 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="space-y-10 md:col-span-5">
          <div>
            <h2 className="eyebrow mb-3">{c.address}</h2>
            <address className="font-display text-3xl not-italic leading-snug text-ink" dir="ltr">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
            <p className="mt-2 text-ink-soft">{c.corner}</p>
          </div>
          <div>
            <h2 className="eyebrow mb-3">{c.hours}</h2>
            <dl className="space-y-2 text-lg">
              <div className="flex justify-between gap-6 border-b border-line pb-2"><dt>{t.hours.monday}</dt><dd className="text-ink-soft">{t.hours.closed}</dd></div>
              <div className="flex justify-between gap-6 border-b border-line pb-2"><dt>{t.hours.tueSun}</dt><dd className="tabular-nums text-ink-soft">{t.hours.time}</dd></div>
            </dl>
          </div>
          <div>
            <h2 className="eyebrow mb-3">{c.phone}</h2>
            <a href={`tel:${site.phone.tel}`} dir="ltr" className="font-display text-3xl text-ink hover:text-brand-deep">{site.phone.display}</a>
          </div>
          {site.email && (
            <div>
              <h2 className="eyebrow mb-3">{c.email}</h2>
              <a href={`mailto:${site.email}`} className="text-lg text-ink underline decoration-line underline-offset-4">{site.email}</a>
            </div>
          )}
          <div>
            <h2 className="eyebrow mb-3">{c.instagram}</h2>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-lg text-ink underline decoration-line underline-offset-4 hover:decoration-brand">{site.instagram.handle}</a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild><a href={site.mapsLink} target="_blank" rel="noopener noreferrer">{c.directions}</a></Button>
            <Button asChild variant="outline"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">{c.whatsapp}</a></Button>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist-deep md:aspect-auto md:h-full md:min-h-[520px]">
            <iframe title={t.welcome.mapTitle} src={site.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
