import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { Display } from "@/components/display";
import { Button } from "@/components/ui/button";
import { alternates, getDictionary, isLocale, localHref } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.meta.story, description: t.meta.storyDescription, alternates: alternates(params.locale, "/our-story") };
}

// Photo for each chapter, in the same order as the chapters in the dictionaries.
const chapterPhotos = [
  { image: "/images/bg-kubideh.jpg", position: "45% 50%", shape: "aspect-[4/3]" },
  { image: "/images/kebab-mixto.jpg", position: "50% 70%", shape: "aspect-[4/5]" },
  { image: "/images/paella.jpg", position: "50% 50%", shape: "aspect-[4/3]" },
];

export default function OurStoryPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);
  const s = t.storyPage;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} image="/images/pollo-catalana.jpg" alt={s.heroAlt} position="50% 40%">
        {s.intro}
      </PageHero>

      <section className="container py-24 md:py-40">
        <Reveal className="max-w-4xl">
          <Display as="p" text={s.lead} className="text-display-md text-ink" />
        </Reveal>
      </section>

      {s.chapters.map((c, i) => (
        <section key={c.eyebrow} className={i % 2 === 0 ? "bg-cream" : ""} aria-labelledby={`chapter-${i}`}>
          <div className="container grid items-center gap-12 py-24 md:gap-16 lg:grid-cols-12 md:py-32">
            <div className={i % 2 === 0 ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-7 lg:row-start-1"}>
              <ParallaxImage src={chapterPhotos[i].image} alt={c.alt} className={chapterPhotos[i].shape} sizes="(min-width: 1024px) 48vw, 100vw" position={chapterPhotos[i].position} />
            </div>
            <Reveal className={i % 2 === 0 ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:col-start-1 lg:row-start-1"}>
              <p className="eyebrow mb-5">{c.eyebrow}</p>
              <Display as="h2" text={c.title} className="text-display-md text-ink" />
              <p className="mt-6 text-lg text-ink-soft" id={`chapter-${i}`}>{c.text}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="container py-24 text-center md:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <Display as="h2" text={s.ctaTitle} className="text-display-lg text-ink" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild><Link href={localHref(locale, "/reservations")}>{t.nav.book}</Link></Button>
            <Button asChild variant="outline"><Link href={localHref(locale, "/menu")}>{s.seeMenu}</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
