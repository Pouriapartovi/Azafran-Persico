import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

const display = localFont({
  src: [
    { path: "./fonts/fraunces.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/fraunces-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({ src: "./fonts/figtree.woff2", weight: "300 900", variable: "--font-sans", display: "swap" });
const farsi = localFont({ src: "./fonts/vazirmatn-arabic.woff2", weight: "100 900", variable: "--font-farsi", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Persian & Mediterranean restaurant in Barcelona`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} · Barcelona`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#4A3226" };

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${farsi.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-saffron focus:px-4 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
