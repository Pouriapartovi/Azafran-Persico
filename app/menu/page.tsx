import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { MenuNav } from "@/components/menu-nav";
import { Reveal } from "@/components/reveal";
import { Flower } from "@/components/logo";
import { cafe, menu, type Dish } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "The full carta at Azafrán Pérsico: Persian recipes with saffron from Iran, tapas, fish, paella, meat and desserts. Prices include VAT.",
};

function DishRow({ dish }: { dish: Dish }) {
  return (
    <article className="group grid grid-cols-[88px_minmax(0,1fr)] gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-7">
      <div className="relative aspect-square overflow-hidden bg-cream-deep">
        {dish.image ? (
          <Image src={dish.image} alt={`${dish.en} at Azafrán Pérsico`} fill sizes="132px" className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center bg-earth text-saffron-light" role="img" aria-label={`Photo of ${dish.en} coming soon`}>
            <Flower className="h-1/2 w-1/2 opacity-70" />
          </div>
        )}
      </div>
      <div className="border-b border-gold-line/50 pb-6">
        <p lang="fa" dir="rtl" className="text-right font-farsi text-lg text-saffron-deep sm:text-left">{dish.fa}</p>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h3 className="min-w-0 font-display text-xl leading-tight text-ink sm:text-2xl">
            {dish.persian && <span className="mr-2 text-base text-gold" aria-label="Persian recipe">◆</span>}
            {dish.es}
          </h3>
          {dish.price ? (
            <p className="shrink-0 font-display text-lg tabular-nums text-ink sm:text-xl">{dish.price} €</p>
          ) : (
            <p className="shrink-0 text-sm text-ink-soft">Ask us</p>
          )}
        </div>
        <p className="mt-1 text-sm font-semibold text-ink-soft">{dish.en}</p>
        {dish.description && <p className="mt-2 text-ink-soft">{dish.description}</p>}
      </div>
    </article>
  );
}

function PriceList({ title, items, note }: { title: string; items: { name: string; price: string }[]; note?: string }) {
  return (
    <div>
      <h3 className="font-display text-3xl text-ink">{title}</h3>
      {note && <p className="mt-1 text-sm text-ink-soft">{note}</p>}
      <ul className="mt-6 space-y-3">
        {items.map((i) => (
          <li key={i.name} className="flex items-baseline justify-between gap-4 border-b border-gold-line/40 pb-3">
            <span>{i.name}</span>
            <span className="shrink-0 tabular-nums text-ink-soft">{i.price} €</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="La carta" title="The menu." image="/images/bg-paella.jpg" alt="Seafood paella with king prawns and clams">
        Persian recipes come first in every section and carry the ◆ mark. Prices in euros, VAT included.
      </PageHero>

      <MenuNav sections={menu} />

      <div className="container py-16 md:py-24">
        {menu.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-40 py-12 md:py-20" aria-labelledby={`${section.id}-title`}>
            <Reveal className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p lang="fa" dir="rtl" className="mb-2 text-left font-farsi text-2xl text-saffron-deep">{section.fa}</p>
                <h2 id={`${section.id}-title`} className="font-display text-display-md font-medium text-ink">
                  {section.titleEs}
                  <span className="soft-mark">.</span>
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">{section.title}</p>
              </div>
            </Reveal>
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
              {section.dishes.map((dish, i) => (
                <Reveal key={dish.id} delay={(i % 2) * 0.06} y={28}>
                  <DishRow dish={dish} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <section id="cafe" className="scroll-mt-40 border-t border-gold-line/60 py-16 md:py-24" aria-labelledby="cafe-title">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">From 11:30</p>
            <h2 id="cafe-title" className="font-display text-display-md font-medium text-ink">
              Café, bocadillos <span className="soft-mark">&amp;</span> bollería<span className="soft-mark">.</span>
            </h2>
          </Reveal>
          <div className="grid gap-14 md:grid-cols-3">
            <Reveal><PriceList title="Café y té" items={cafe.coffee} /></Reveal>
            <Reveal delay={0.08}><PriceList title="Bocadillos" items={cafe.bocadillos} note="Whole / half" /></Reveal>
            <Reveal delay={0.16}><PriceList title="Bollería" items={cafe.bolleria} /></Reveal>
          </div>
        </section>

        <p className="mt-6 text-center text-ink-soft">
          <span className="text-gold">◆</span> Persian recipe · Please ask our team about allergens.
        </p>
      </div>
    </>
  );
}
