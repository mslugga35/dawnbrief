import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DawnBrief",
  url: "https://getdawnbrief.com",
  description:
    "Connect Stripe and get a plain-English AI daily briefing. MRR, churn, signups, anomalies — in one email every morning.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "19",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "19",
      priceCurrency: "USD",
      unitText: "MONTH",
    },
    description: "After free trial. Cancel anytime.",
  },
  author: {
    "@type": "Organization",
    name: "DawnBrief",
    url: "https://getdawnbrief.com",
  },
};

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DawnBrief — AI Daily Business Briefing",
  description:
    "Connect Stripe and get a plain-English daily briefing. MRR, churn, signups, anomalies — in one email every morning.",
  metadataBase: new URL("https://getdawnbrief.com"),
  openGraph: {
    title: "DawnBrief — AI Daily Business Briefing",
    description:
      "Connect Stripe and get a plain-English daily briefing. MRR, churn, signups, anomalies — in one email every morning.",
    url: "https://getdawnbrief.com",
    siteName: "DawnBrief",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DawnBrief — AI Daily Business Briefing",
    description:
      "Stop checking five dashboards. One AI email every morning with everything that matters.",
  },
  alternates: { canonical: "https://getdawnbrief.com" },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${plexMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
