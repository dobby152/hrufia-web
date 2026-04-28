import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "HRUFIA s.r.o. – Rekonstrukce, malování, stěhování",
    template: "%s | HRUFIA s.r.o.",
  },
  description:
    "Profesionální rekonstrukce bytů, malování a stěhování. HRUFIA s.r.o. – spolehlivá práce, férové ceny, dodržené termíny. Působíme v Praze a Středočeském kraji.",
  keywords: [
    "rekonstrukce bytů",
    "malování",
    "stěhování",
    "rekonstrukce Praha",
    "malování bytů",
    "stěhování Praha",
    "HRUFIA",
    "stavební práce",
    "rekonstrukce koupelny",
    "rekonstrukce kuchyně",
  ],
  authors: [{ name: "HRUFIA s.r.o." }],
  creator: "HRUFIA s.r.o.",
  metadataBase: new URL("https://www.hrufia.cz"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://www.hrufia.cz",
    siteName: "HRUFIA s.r.o.",
    title: "HRUFIA s.r.o. – Rekonstrukce, malování, stěhování",
    description:
      "Profesionální rekonstrukce bytů, malování a stěhování. Spolehlivá práce, férové ceny, dodržené termíny.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.hrufia.cz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#1a2744" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CursorGlow />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "HRUFIA s.r.o.",
              description:
                "Profesionální rekonstrukce bytů, malování a stěhování v Praze a Středočeském kraji.",
              url: "https://www.hrufia.cz",
              telephone: "+420123456789",
              email: "info@hrufia.cz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Na Tribulkách 157, Černé Budy",
                addressLocality: "Sázava",
                postalCode: "285 06",
                addressCountry: "CZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 49.8725,
                longitude: 14.8881,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "07:00",
                closes: "17:00",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Praha",
                },
                {
                  "@type": "State",
                  name: "Středočeský kraj",
                },
              ],
              sameAs: [],
              priceRange: "$$",
              foundingDate: "2018-04-20",
              taxID: "CZ07059744",
            }),
          }}
        />
      </body>
    </html>
  );
}
