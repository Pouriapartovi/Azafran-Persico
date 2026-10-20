import Link from "next/link";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { Display, SectionIntro } from "@/components/display";
import { MenuRail } from "@/components/menu-rail";
import { DishCard } from "@/components/dish-card";
import { GalleryStrip } from "@/components/gallery-strip";
import { Button } from "@/components/ui/button";
import { menu, signatureDishes } from "@/lib/menu";
import { site } from "@/lib/site";

const heroSlides = [
  { src: "/images/bg-kubideh.jpg", alt: "Kebab koobideh with saffron rice, grilled tomato and peppers", position: "50% 55%" },
  { src: "/images/bg-paella.jpg", alt: "Seafood paella with king prawns and clams", position: "50% 50%" },
  { src: "/images/pollo-catalana.jpg", alt: "Pollo a la catalana braised with dried fruit on mash", position: "50% 45%" },
  { src: "/images/solomillo.jpg", alt: "Beef tenderloin with pepper sauce and hand-cut fries", position: "60% 50%" },
];

const gallery = [
  { src: "/images/kebab-mixto.jpg", alt: "Saffron chicken and koobideh kebab with Persian rice" },
  { src: "/images/kashk-bademjan.jpg", alt: "Kashk-e bademjan with walnuts" },
  { src: "/images/paella.jpg", alt: "Seafood paella" },
  { src: "/images/alitas.jpg", alt: "Glazed chicken wings with sesame" },
  { src: "/images/olivieh.jpg", alt: "Persian Olivier salad with toasts" },
  { src: "/images/steak-tartar.jpg", alt: "Steak tartare on bone marrow" },
  { src: "/images/gyozas.jpg", alt: "Gyozas with soy dipping sauce" },
  { src: "/images/pollo-catalana.jpg", alt: "Pollo a la catalana" },
];

export default function Home() {
  return (
    <>
      <Hero slides={heroSlides} />

      {/* Intro */}
      <section className="container py-24 md:py-40" aria-labelledby="intro-title">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="eyebrow mb-6">Welcome</p>
            <Display as="h2" text="Two kitchens. One table in the Eixample." className="text-display-lg text-ink" />
          </Reveal>
          <Reveal className="md:col-span-4 md:self-end" delay={0.15}>
            <p className="text-lg text-ink-soft">
              On the corner of Girona and Mallorca, the Persian dishes we grew up with sit beside Barcelona&apos;s tapas, fresh fish and paella. Most of the Persian plates are cooked with real saffron from Iran.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-gold-line/60 pt-6">
              <div>
                <dt className="text-sm text-ink-soft">On Google</dt>
                <dd className="font-display text-4xl text-ink">{site.rating}<span className="soft-mark">.</span></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Open</dt>
                <dd className="font-display text-2xl leading-tight text-ink">Tue to Sun<br />11:30 to 00:00</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Story teaser */}
      <section className="bg-cream" aria-labelledby="story-title">
        <div className="container grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-36">
          <div className="md:col-span-6">
            <ParallaxImage src="/images/kebab-mixto.jpg" alt="Saffron chicken and koobideh kebab with Persian rice and grilled vegetables" className="aspect-[4/5]" sizes="(min-width: 768px) 48vw, 100vw" position="50% 55%" />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="eyebrow mb-5">Our story</p>
            <h2 id="story-title" className="sr-only">Our story</h2>
            <Display as="p" text="From Tehran to Barcelona." className="text-display-md text-ink" />
            <p className="mt-6 text-lg text-ink-soft">
              Before the Eixample, our family ran restaurants in Tehran. We brought that way of cooking with us: rice that takes its time, meat marinated overnight, saffron left to bloom before it reaches the pan.
            </p>
            <Button asChild variant="outline" className="mt-10"><Link href="/our-story">Read our story</Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Menu rail */}
      <section className="py-24 md:py-36" aria-labelledby="menu-title">
        <div className="container mb-6 md:mb-0">
          <Reveal>
            <SectionIntro eyebrow="The menu" title="Saffron, smoke & the sea.">
              Persian recipes come first in every section of the carta. Swipe through, or open the full menu.
            </SectionIntro>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <MenuRail sections={menu} />
        </Reveal>
      </section>

      {/* Signature plates */}
      <section className="container pb-24 md:pb-36" aria-labelledby="plates-title">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">From the kitchen</p>
            <Display as="h2" text="Plates we are proud of." className="text-display-md text-ink" />
          </div>
          <Link href="/menu" className="text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold-line underline-offset-8 hover:decoration-saffron">Full menu</Link>
        </Reveal>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {signatureDishes.slice(0, 6).map((dish, i) => (
            <Reveal key={dish.id} delay={(i % 3) * 0.08}>
              <DishCard dish={dish} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reservations call to action */}
      <section className="relative overflow-hidden" aria-labelledby="book-title">
        <ParallaxImage src="/images/bg-paella.jpg" alt="" className="absolute inset-0 h-full" strength={10} />
        <div className="absolute inset-0 bg-earth-deep/60" />
        <div className="container relative py-32 text-cream md:py-48">
          <Reveal className="on-dark max-w-3xl">
            <p className="eyebrow mb-5">Reservations</p>
            <h2 id="book-title" className="font-display text-display-lg font-medium">
              Keep a table for us<span className="soft-mark !text-saffron-light">.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-cream/90">Tuesday to Sunday, from 11:30 until midnight. Book online, or call or message us on WhatsApp at {site.phone.display}.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link href="/reservations">Book a table</Link></Button>
              <Button asChild variant="light"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28" aria-labelledby="gallery-title">
        <div className="container mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4">On the table</p>
            <h2 id="gallery-title" className="font-display text-display-md text-ink">
              Come hungry<span className="soft-mark">.</span>
            </h2>
          </Reveal>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold-line underline-offset-8 hover:decoration-saffron sm:inline">
            {site.instagram.handle}
          </a>
        </div>
        <GalleryStrip images={gallery} />
      </section>
    </>
  );
}
