import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ReservationForm } from "@/components/reservation-form";
import { alternates, getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.meta.reservations, description: t.meta.reservationsDescription, alternates: alternates(params.locale, "/reservations") };
}

export default function ReservationsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDictionary(params.locale);
  const r = t.reservationsPage;
  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={r.title} image="/images/bg-kubideh.jpg" alt={r.heroAlt} position="50% 60%" />
      <section className="container grid gap-16 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="eyebrow mb-5">{r.goodToKnow}</p>
          <ul className="space-y-6 text-lg text-ink-soft">
            <li><span className="block font-display text-2xl text-ink">{t.hours.tueSun}</span>{t.hours.time}. {t.hours.monday}: {t.hours.closed}.</li>
            <li><span className="block font-display text-2xl text-ink">{r.groupsTitle}</span>{r.groupsText}</li>
            <li>
              <span className="block font-display text-2xl text-ink">{r.sameDayTitle}</span>
              {r.sameDayCall} <a className="text-ink underline decoration-line underline-offset-4" dir="ltr" href={`tel:${site.phone.tel}`}>{site.phone.display}</a> {r.sameDayOr}{" "}
              <a className="text-ink underline decoration-line underline-offset-4" href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">{r.whatsapp}</a>.
            </li>
          </ul>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <ReservationForm />
        </Reveal>
      </section>
    </>
  );
}
