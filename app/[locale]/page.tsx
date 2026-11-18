import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { Display } from "@/components/display";
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

// Dishes in the header carousel. `caption` points to the dish name in t.hero.slides.
const heroSlides = [
  { src: "/images/bg-paella.jpg", caption: 0, position: "50% 50%", mobile: { src: "/images/paella.jpg", position: "42% 45%" } },
  { src: "/images/solomillo.jpg", caption: 1, position: "60% 50%" },
  { src: "/images/pollo-catalana.jpg", caption: 2, position: "50% 45%" },
  { src: "/images/bg-kubideh.jpg", caption: 3, position: "50% 55%", mobile: { src: "/images/kebab-mixto.jpg", position: "50% 60%" } },
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

      {/* Welcome: who we are */}
      <section className="container py-20 md:py-28" aria-labelledby="welcome-title">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-6">{t.welcome.eyebrow}</p>
            <Display as="h2" text={t.welcome.title} className="text-display-md text-ink" />
            <span id="welcome-title" className="sr-only">{t.welcome.eyebrow}</span>
            <p className="mt-8 text-lg text-ink-soft">{t.welcome.text}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="text-sm text-ink-soft">{t.welcome.onGoogle}</dt>
                <dd className="font-display text-4xl text-ink" dir="ltr">{reviews?.rating ? reviews.rating.toFixed(1) : site.rating}<span className="soft-mark"> ★</span></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">{t.welcome.open}</dt>
                <dd className="font-display text-xl leading-snug text-ink">{t.hours.tueSun}<br />{t.hours.time}</dd>
              </div>
            </dl>
          </Reveal>
          <div className="lg:col-span-6">
            <ParallaxImage src={restaurantPhoto.src} alt={t.welcome.photoAlt} className="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" position={restaurantPhoto.position} />
          </div>
        </div>
      </section>

      {/* Every menu section, each opening into its dishes */}
      <section className="bg-mist py-20 md:py-28" aria-labelledby="menu-title">
        <div className="container">
          <Reveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">{t.categories.eyebrow}</p>
              <Display as="h2" text={t.categories.title} className="text-display-md text-ink" />
              <span id="menu-title" className="sr-only">{t.categories.eyebrow}</span>
              <p className="mt-4 max-w-md text-lg text-ink-soft">{t.categories.intro}</p>
            </div>
            <Link href={localHref(locale, "/menu")} className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep underline decoration-line underline-offset-8 hover:decoration-brand">
              {t.categories.fullMenu}
            </Link>
          </Reveal>
          <MenuCategories sections={menu} />
        </div>
      </section>

      {/* Story teaser with the kitchen film */}
      <section aria-labelledby="story-title">
        <div className="container grid items-center gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-28">
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

      {/* A few real photos; the rest live on the gallery page */}
      {photos.length > 0 && (
        <section className="container pb-20 md:pb-28" aria-labelledby="gallery-title">
          <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">{t.gallery.eyebrow}</p>
              <Display as="h2" text={t.gallery.title} className="text-display-md text-ink" />
              <span id="gallery-title" className="sr-only">{t.gallery.eyebrow}</span>
            </div>
            <Link href={localHref(locale, "/gallery")} className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep underline decoration-line underline-offset-8 hover:decoration-brand">
              {t.gallery.seeAll}
            </Link>
          </Reveal>
          <Gallery photos={photos.slice(0, 6)} compact />
        </section>
      )}

      <Reviews data={reviews} t={t} />

      {/* Reservations call to action */}
      <section className="bg-brand text-white" aria-labelledby="book-title">
        <div className="container grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="on-dark md:col-span-7">
            <p className="eyebrow mb-5">{t.booking.eyebrow}</p>
            <Display as="h2" text={t.booking.title} className="text-display-lg text-white [&_.soft-mark]:text-white" />
            <span id="book-title" className="sr-only">{t.booking.eyebrow}</span>
            <p className="mt-6 max-w-lg text-lg text-white/90">{fill(t.booking.text, { phone: site.phone.display })}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="dark"><Link href={localHref(locale, "/reservations")}>{t.nav.book}</Link></Button>
              <Button asChild variant="light"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">{t.booking.whatsapp}</a></Button>
            </div>
          </Reveal>
          <div className="md:col-span-5">
            <ParallaxImage src="/images/paella.jpg" alt="" className="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 100vw" strength={4} />
          </div>
        </div>
      </section>

      {/* Where we are: the map sits at the end of the page */}
      <section className="container py-20 md:py-28" aria-labelledby="find-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">{t.findUs.eyebrow}</p>
            <Display as="h2" text={t.findUs.title} className="text-display-md text-ink" />
            <span id="find-title" className="sr-only">{t.findUs.eyebrow}</span>
            <address className="mt-8 not-italic text-lg leading-relaxed text-ink">
              {site.address.street}
              <br />
              {t.contactPage.corner}
              <br />
              {site.address.city}
            </address>
            <p className="mt-4 text-ink-soft">{t.hours.tueSun} · {t.hours.time}<br />{t.hours.monday}: {t.hours.closed}</p>
            <Button asChild className="mt-8"><a href={site.mapsLink} target="_blank" rel="noopener noreferrer">{t.welcome.directions}</a></Button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist md:aspect-[16/9]">
              <iframe title={t.welcome.mapTitle} src={site.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
