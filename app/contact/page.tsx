import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Azafrán Pérsico, Carrer de Girona 127, corner of Mallorca, 08037 Barcelona. Phone and WhatsApp 665 42 12 88.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Find us in the Eixample." image="/images/solomillo.jpg" alt="Beef tenderloin with pepper sauce and fries" position="60% 50%" />
      <section className="container grid gap-16 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="space-y-10 md:col-span-5">
          <div>
            <h2 className="eyebrow mb-3">Address</h2>
            <address className="font-display text-3xl not-italic leading-snug text-ink">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
            <p className="mt-2 text-ink-soft">On the {site.address.corner}.</p>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Hours</h2>
            <dl className="space-y-2 text-lg">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-gold-line/50 pb-2">
                  <dt>{h.days}</dt>
                  <dd className="tabular-nums text-ink-soft">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Phone and WhatsApp</h2>
            <a href={`tel:${site.phone.tel}`} className="font-display text-3xl text-ink hover:text-saffron-deep">{site.phone.display}</a>
          </div>
          {site.email && (
            <div>
              <h2 className="eyebrow mb-3">Email</h2>
              <a href={`mailto:${site.email}`} className="text-lg text-ink underline decoration-gold-line underline-offset-4">{site.email}</a>
            </div>
          )}
          <div>
            <h2 className="eyebrow mb-3">Instagram</h2>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-lg text-ink underline decoration-gold-line underline-offset-4 hover:decoration-saffron">{site.instagram.handle}</a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild><a href={site.mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a></Button>
            <Button asChild variant="outline"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep md:aspect-auto md:h-full md:min-h-[520px]">
            <iframe
              title="Map showing Azafrán Pérsico at Carrer de Girona 127, Barcelona"
              src={site.mapsEmbed}
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%] sepia-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
