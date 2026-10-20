import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { Display } from "@/components/display";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description: "A family that ran restaurants in Tehran, now cooking in Barcelona's Eixample: Persian hospitality with Mediterranean ingredients and saffron from Iran.",
};

const chapters = [
  {
    eyebrow: "Tehran",
    title: "Where we learned to cook.",
    text: "Before Barcelona, our family ran several restaurants in Tehran. There we learned that patience is an ingredient too: rice rinsed and steamed until every grain stands apart, meat left to marinate overnight, stews that take the afternoon.",
    image: "/images/bg-kubideh.jpg",
    alt: "Two skewers of kebab koobideh with saffron rice, grilled tomatoes and green peppers",
    position: "45% 50%",
  },
  {
    eyebrow: "Saffron",
    title: "The name over our door.",
    text: "We bring our saffron in threads from Iran and let it bloom in warm water before it reaches the pan. It turns the rice gold, marinates the chicken and flavours the ice cream. No powder and no colouring.",
    image: "/images/kebab-mixto.jpg",
    alt: "Saffron chicken and koobideh kebab with a dome of saffron rice topped with barberries",
    position: "50% 70%",
  },
  {
    eyebrow: "Barcelona",
    title: "Mediterranean ingredients & a Persian welcome.",
    text: "On the corner of Girona and Mallorca, the Persian plates sit beside the dishes of our new home: tapas to share, fresh fish, seafood paella. In Iran a guest is a gift, and that is how we try to look after every table.",
    image: "/images/paella.jpg",
    alt: "Seafood paella with king prawns and clams on a wooden table",
    position: "50% 50%",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="From Tehran to Barcelona." image="/images/pollo-catalana.jpg" alt="Chicken braised with dried fruit on a bed of mash" position="50% 40%">
        Persian hospitality meeting Mediterranean ingredients, in a calm room in the Eixample.
      </PageHero>

      <section className="container py-24 md:py-40">
        <Reveal className="max-w-4xl">
          <Display as="p" text="We cook the food of two homes & serve it the way we were taught: generously, and without hurry." className="text-display-md text-ink" />
        </Reveal>
      </section>

      {chapters.map((c, i) => (
        <section key={c.eyebrow} className={i % 2 === 0 ? "bg-cream" : ""} aria-labelledby={`chapter-${i}`}>
          <div className="container grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className={i % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:col-start-7 md:row-start-1"}>
              <ParallaxImage src={c.image} alt={c.alt} className="aspect-[4/5]" sizes="(min-width: 768px) 48vw, 100vw" position={c.position} />
            </div>
            <Reveal className={i % 2 === 0 ? "md:col-span-5 md:col-start-8" : "md:col-span-5 md:col-start-1 md:row-start-1"}>
              <p className="eyebrow mb-5">{c.eyebrow}</p>
              <Display as="h2" text={c.title} className="text-display-md text-ink" />
              <p className="mt-6 text-lg text-ink-soft" id={`chapter-${i}`}>{c.text}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="container py-24 text-center md:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <Display as="h2" text="Come & taste it." className="text-display-lg text-ink" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/reservations">Book a table</Link></Button>
            <Button asChild variant="outline"><Link href="/menu">See the menu</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
