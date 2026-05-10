import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dineease.in"),
  title: {
    default: "DineEase — Discover, Order & Reserve at Trusted Restaurants",
    template: "%s | DineEase",
  },
  description:
    "Explore verified restaurants near you, order delivery in minutes, and reserve tables instantly — all in one simple platform. Trusted by thousands of diners in Bangalore.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dineease.in",
    siteName: "DineEase",
    title: "DineEase — Discover, Order & Reserve at Trusted Restaurants",
    description:
      "Explore verified restaurants near you, order delivery in minutes, and reserve tables instantly — all in one simple platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DineEase — Restaurant Discovery & Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DineEase — Discover, Order & Reserve at Trusted Restaurants",
    description:
      "Explore verified restaurants near you, order delivery in minutes, and reserve tables instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DineEase",
  url: "https://dineease.in",
  description:
    "Discover restaurants, order food, make reservations, and manage your restaurant business.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://dineease.in/explore?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DineEase by Darsh Gupta",
  url: "https://dineease.in",
  logo: "https://dineease.in/logo.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
