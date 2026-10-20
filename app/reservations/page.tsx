import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ReservationForm } from "@/components/reservation-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book a table at Azafrán Pérsico, Carrer de Girona 127, Barcelona. Open Tuesday to Sunday, 11:30 to 00:00.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageHero eyebrow="Reservations" title="Book a table." image="/images/bg-kubideh.jpg" alt="Kebab koobideh with saffron rice on a white plate" position="50% 60%" />
      <section className="container grid gap-16 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="eyebrow mb-5">Good to know</p>
          <ul className="space-y-6 text-lg text-ink-soft">
            <li><span className="block font-display text-2xl text-ink">Tuesday to Sunday</span>11:30 to 00:00. Closed on Mondays.</li>
            <li><span className="block font-display text-2xl text-ink">Bigger groups</span>For more than 12 people, call or message us so we can plan your table.</li>
            <li>
              <span className="block font-display text-2xl text-ink">Same day</span>
              Call <a className="text-ink underline decoration-gold-line underline-offset-4" href={`tel:${site.phone.tel}`}>{site.phone.display}</a> or{" "}
              <a className="text-ink underline decoration-gold-line underline-offset-4" href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.
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
