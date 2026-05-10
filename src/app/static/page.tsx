import type { Metadata } from "next";
import { Navbar } from "@/components/static/navbar";
import { HeroSection } from "@/components/static/hero-section";
import { AboutSection } from "@/components/static/about-section";
import { MenuSection } from "@/components/static/menu-section";
import { GallerySection } from "@/components/static/gallery-section";
import { ChefSection } from "@/components/static/chef-section";
import { EventsSection } from "@/components/static/events-section";
import { TestimonialsSection } from "@/components/static/testimonials-section";
import { FAQSection } from "@/components/static/faq-section";
import { ContactSection } from "@/components/static/contact-section";
import { Footer } from "@/components/static/footer";
import { MobileBottomNav } from "@/components/static/mobile-bottom-nav";
import { restaurantInfo, chef, faqItems } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Saffron & Sage — Modern Indian Fine Dining in Koramangala, Bangalore",
  description:
    "Award-winning modern Indian fine dining by Chef Arjun Malhotra. Farm-to-table cuisine, private dining, and rooftop events in Koramangala, Bangalore. Reserve your table today.",
  openGraph: {
    title: "Saffron & Sage — Modern Indian Fine Dining in Koramangala, Bangalore",
    description:
      "Award-winning modern Indian fine dining by Chef Arjun Malhotra. Farm-to-table cuisine in Koramangala, Bangalore.",
    url: "https://dineease.in/static",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saffron & Sage — Modern Indian Fine Dining",
    description:
      "Award-winning modern Indian fine dining by Chef Arjun Malhotra in Koramangala, Bangalore.",
  },
  alternates: {
    canonical: "https://dineease.in/static",
  },
};

function StaticPageJsonLd() {
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantInfo.name,
    description: restaurantInfo.description,
    url: "https://dineease.in/static",
    telephone: restaurantInfo.phone,
    email: restaurantInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, 12th Cross Road, Koramangala 4th Block",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9352,
      longitude: 77.6245,
    },
    servesCuisine: "Modern Indian",
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "19:00",
        closes: "23:30",
      },
    ],
    founder: {
      "@type": "Person",
      name: chef.name,
      jobTitle: chef.title,
      description: chef.bio,
    },
    sameAs: [
      restaurantInfo.socials.instagram,
      restaurantInfo.socials.zomato,
      restaurantInfo.socials.google,
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dineease.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Saffron & Sage",
        item: "https://dineease.in/static",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

export default function StaticPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <ChefSection />
        <EventsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomNav />
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 lg:hidden" />
      <StaticPageJsonLd />
    </div>
  );
}
