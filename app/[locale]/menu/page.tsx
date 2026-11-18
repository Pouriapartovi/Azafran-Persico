import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { MenuNav } from "@/components/menu-nav";
import { Reveal } from "@/components/reveal";
import { Flower } from "@/components/logo";
import { alternates, fill, getDictionary, isLocale, type Dictionary, type Locale } from "@/lib/i18n";
import { cafe, menu, type Dish, type PriceItem } from "@/lib/menu";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.meta.menu, description: t.meta.menuDescription, alternates: alternates(params.locale, "/menu") };
}

function DishRow({ dish, locale, t }: { dish: Dish; locale: Locale; t: Dictionary }) {
  const name = dish.name[locale];
  return (
    <article className="group grid grid-cols-[104px_minmax(0,1fr)] gap-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-7">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist-deep">
        {dish.image ? (
          <Image src={dish.image} alt={fill(t.menuPage.photoOf, { name })} fill sizes="(min-width: 640px) 160px, 104px" className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center bg-mist text-leaf" role="img" aria-label={t.categories.noPhoto}>
            <Flower className="h-1/2 w-1/2 opacity-70" />
          </div>
        )}
      </div>
      <div className="border-b border-line pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="min-w-0 font-display text-xl leading-tight text-ink sm:text-2xl">
            {name}
          </h3>
          <p dir="ltr" className="shrink-0 font-display text-lg tabular-nums text-brand-deep sm:text-xl">{dish.price ? `${dish.price} €` : t.categories.askUs}</p>
        </div>
        {dish.desc && <p className="mt-2 text-ink-soft">{dish.desc[locale]}</p>}
      </div>
    </article>
  );
}

function PriceList({ title, items, note, locale }: { title: string; items: PriceItem[]; note?: string; locale: Locale }) {
  return (
    <div>
      <h3 className="font-display text-3xl text-ink">{title}</h3>
      {note && <p className="mt-1 text-sm text-ink-soft">{note}</p>}
      <ul className="mt-6 space-y-3">
        {items.map((i) => (
          <li key={i.name.es} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <span>{i.name[locale]}</span>
            <span dir="ltr" className="shrink-0 tabular-nums text-ink-soft">{i.price} €</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MenuPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);
  const cafeTitle = t.menuPage.cafeTitle.split(/(&|\.)/);

  return (
    <>
      <PageHero eyebrow={t.menuPage.eyebrow} title={t.menuPage.title} image="/images/bg-paella.jpg" alt="">
        {t.menuPage.intro}
      </PageHero>

      <MenuNav sections={[...menu.map((s) => ({ id: s.id, label: s.title[locale] })), { id: "cafe", label: t.menuPage.coffee }]} />

      <div className="container py-16 md:py-24">
        {menu.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-40 py-12 md:py-20" aria-labelledby={`${section.id}-title`}>
            <Reveal className="mb-12">
              <h2 id={`${section.id}-title`} className="font-display text-display-md font-medium text-ink">
                {section.title[locale]}
                <span className="soft-mark">.</span>
              </h2>
            </Reveal>
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
              {section.dishes.map((dish, i) => (
                <Reveal key={dish.id} delay={(i % 2) * 0.06} y={28}>
                  <DishRow dish={dish} locale={locale} t={t} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <section id="cafe" className="scroll-mt-40 border-t border-line py-16 md:py-24" aria-labelledby="cafe-title">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">{t.menuPage.cafeEyebrow}</p>
            <h2 id="cafe-title" className="font-display text-display-md font-medium text-ink">
              {cafeTitle.map((p, i) => (p === "&" || p === "." ? <span key={i} className="soft-mark">{p}</span> : p))}
            </h2>
          </Reveal>
          <div className="grid gap-14 md:grid-cols-3">
            <Reveal><PriceList title={t.menuPage.coffee} items={cafe.coffee} locale={locale} /></Reveal>
            <Reveal delay={0.08}><PriceList title={t.menuPage.bocadillos} items={cafe.bocadillos} locale={locale} note={t.menuPage.bocadillosNote} /></Reveal>
            <Reveal delay={0.16}><PriceList title={t.menuPage.bolleria} items={cafe.bolleria} locale={locale} /></Reveal>
          </div>
        </section>

        <p className="mt-6 text-center text-ink-soft">
          {t.menuPage.legend}
        </p>
      </div>
    </>
  );
}
