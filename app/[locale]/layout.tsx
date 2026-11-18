import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LocaleProvider } from "@/components/locale-provider";
import { alternates, dirOf, getDictionary, isLocale, locales, ogLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

const display = localFont({
  src: [
    { path: "../fonts/fraunces.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({ src: "../fonts/figtree.woff2", weight: "300 900", variable: "--font-sans", display: "swap" });
const farsi = localFont({ src: "../fonts/vazirmatn-arabic.woff2", weight: "100 900", variable: "--font-farsi", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: `%s · ${site.name}` },
    description: t.meta.description,
    alternates: alternates(params.locale, ""),
    openGraph: { type: "website", locale: ogLocale[params.locale], siteName: site.name, title: `${site.name} · Barcelona`, description: t.meta.description },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#FFFFFF" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: ["Persian", "Mediterranean", "Spanish"],
  priceRange: "€€",
  telephone: site.phone.tel,
  url: site.url,
  sameAs: [site.instagram.url],
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: "Barcelona", postalCode: "08037", addressCountry: "ES" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "11:30", closes: "23:59" }],
  acceptsReservations: "True",
};

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);
  return (
    <html lang={locale} dir={dirOf(locale)} className={`${display.variable} ${sans.variable} ${farsi.variable}`}>
      <body>
        <LocaleProvider locale={locale} t={t}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-brand focus:px-4 focus:py-3 focus:text-ink">
            {t.nav.skip}
          </a>
          <SmoothScroll />
          <Nav />
          <main id="main" className="pt-[76px]">{children}</main>
          <Footer />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
