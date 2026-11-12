import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { Display, SectionIntro } from "@/components/display";
import { StoryVideo } from "@/components/story-video";
import { MenuCategories } from "@/components/menu-categories";
import { Gallery } from "@/components/gallery";
import { Reviews } from "@/components/reviews";
import { Button } from "@/components/ui/button";
import { localHref } from "@/lib/i18n/config";
import { fill, getDictionary, isLocale } from "@/lib/i18n";
import { getGalleryPhotos } from "@/lib/gallery";
import { getGoogleReviews } from "@/lib/google-reviews";
import { menu } from "@/lib/menu";
import { site } from "@/lib/site";

// Refresh the page (and its Google reviews) every 6 hours.
export const revalidate = 21600;

const heroSlides = [
  { src: "/images/bg-kubideh.jpg", alt: "Kebab koobideh, saffron rice, grilled tomato and peppers", position: "50% 55%", mobile: { src: "/images/kebab-mixto.jpg", position: "50% 60%" } },
  { src: "/images/bg-paella.jpg", alt: "Seafood paella with king prawns and clams", position: "50% 50%", mobile: { src: "/images/paella.jpg", position: "42% 45%" } },
  { src: "/images/pollo-catalana.jpg", alt: "Pollo a la catalana with dried fruit on mash", position: "50% 45%" },
  { src: "/images/solomillo.jpg", alt: "Beef tenderloin with pepper sauce and fries", position: "60% 50%" },
];

// Photo of the restaurant beside the map. Replace with a photo of the front of the restaurant when you have one.
const restaurantPhoto = { src: "/gallery/dinner-in-the-dining-room.jpg", position: "50% 70%" };

export default async function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);
  const photos = getGalleryPhotos();
  const reviews = await getGoogleReviews(locale);

  return (
    <>
      <Hero slides={heroSlides} />

      {/* Welcome: who we are, then where we are */}
      <section className="container py-24 md:py-36" aria-labelledby="welcome-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">{t.welcome.eyebrow}</p>
            <Display as="h2" text={t.welcome.title} className="text-display-md text-ink" />
            <p className="mt-8 text-lg text-ink-soft">{t.welcome.text}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-gold-line/60 pt-6">
              <div>
                <dt className="text-sm text-ink-soft">{t.welcome.onGoogle}</dt>
                <dd className="font-display text-4xl text-ink" dir="ltr">{reviews?.rating ? reviews.rating.toFixed(1) : site.rating}<span className="soft-mark">.</span></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">{t.welcome.open}</dt>
                <dd className="font-display text-xl leading-snug text-ink">{t.hours.tueSun}<br />{t.hours.time}</dd>
              </div>
            </dl>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <ParallaxImage src={restaurantPhoto.src} alt={t.welcome.photoAlt} className="aspect-[4/5]" sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw" position={restaurantPhoto.position} />
            <Reveal delay={0.12} className="flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-deep">
                <iframe title={t.welcome.mapTitle} src={site.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href={site.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 self-start text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold-line underline-offset-8 hover:decoration-saffron">
                {t.welcome.directions}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story teaser with the kitchen film */}
      <section className="bg-cream" aria-labelledby="story-title">
        <div className="container grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-36">
          <div className="md:col-span-5">
            <StoryVideo src="/videos/kebab.mp4" poster="/videos/kebab-poster.jpg" className="mx-auto aspect-[4/5] max-h-[80svh] w-full" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-5">{t.storyTeaser.eyebrow}</p>
            <Display as="h2" text={t.storyTeaser.title} className="text-display-md text-ink" />
            <span id="story-title" className="sr-only">{t.storyTeaser.eyebrow}</span>
            <p className="mt-6 text-lg text-ink-soft">{t.storyTeaser.text}</p>
            <Button asChild variant="outline" className="mt-10"><Link href={localHref(locale, "/our-story")}>{t.storyTeaser.cta}</Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Every menu section, each opening into its dishes */}
      <section className="container py-24 md:py-36" aria-labelledby="menu-title">
        <Reveal className="mb-12">
          <SectionIntro eyebrow={t.categories.eyebrow} title={t.categories.title}>
            {t.categories.intro}
          </SectionIntro>
          <span id="menu-title" className="sr-only">{t.categories.eyebrow}</span>
        </Reveal>
        <MenuCategories sections={menu} />
      </section>

      {/* Real photos from the restaurant */}
      {photos.length > 0 && (
        <section className="container pb-24 md:pb-36" aria-labelledby="gallery-title">
          <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">{t.gallery.eyebrow}</p>
              <Display as="h2" text={t.gallery.title} className="text-display-md text-ink" />
              <span id="gallery-title" className="sr-only">{t.gallery.eyebrow}</span>
              <p className="mt-4 max-w-md text-lg text-ink-soft">{t.gallery.intro}</p>
            </div>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold-line underline-offset-8 hover:decoration-saffron">
              {site.instagram.handle}
            </a>
          </Reveal>
          <Gallery photos={photos} />
        </section>
      )}

      <Reviews data={reviews} t={t} />

      {/* Reservations call to action */}
      <section className="relative overflow-hidden" aria-labelledby="book-title">
        <ParallaxImage src="/images/bg-paella.jpg" alt="" className="absolute inset-0 h-full" strength={4} />
        <div className="absolute inset-0 bg-earth-deep/65" />
        <div className="container relative py-32 text-cream md:py-44">
          <Reveal className="on-dark max-w-3xl">
            <p className="eyebrow mb-5">{t.booking.eyebrow}</p>
            <Display as="h2" text={t.booking.title} className="text-display-lg text-cream" />
            <span id="book-title" className="sr-only">{t.booking.eyebrow}</span>
            <p className="mt-6 max-w-lg text-lg text-cream/90">{fill(t.booking.text, { phone: site.phone.display })}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link href={localHref(locale, "/reservations")}>{t.nav.book}</Link></Button>
              <Button asChild variant="light"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">{t.booking.whatsapp}</a></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

