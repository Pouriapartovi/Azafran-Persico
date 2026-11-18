import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { Reveal } from "@/components/reveal";
import { Display } from "@/components/display";
import { alternates, getDictionary, isLocale } from "@/lib/i18n";
import { getGalleryPhotos } from "@/lib/gallery";
import { site } from "@/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.meta.gallery, description: t.meta.galleryDescription, alternates: alternates(params.locale, "/gallery") };
}

export default function GalleryPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDictionary(params.locale);
  const photos = getGalleryPhotos();
  return (
    <section className="container py-14 md:py-20" aria-labelledby="gallery-page-title">
      <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">{t.gallery.eyebrow}</p>
          <Display as="h1" text={t.gallery.title} className="text-display-lg text-ink" />
          <span id="gallery-page-title" className="sr-only">{t.gallery.eyebrow}</span>
          <p className="mt-4 max-w-md text-lg text-ink-soft">{t.gallery.intro}</p>
        </div>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep underline decoration-line underline-offset-8 hover:decoration-brand">
          {site.instagram.handle}
        </a>
      </Reveal>
      <Gallery photos={photos} />
    </section>
  );
}
