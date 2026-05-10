import type { Metadata } from "next";
import { restaurants } from "@/lib/platform-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug) || restaurants[0];

  return {
    title: `${restaurant.name} — ${restaurant.cuisines.join(", ")} in ${restaurant.area}, Bangalore`,
    description: `${restaurant.description}. Rated ${restaurant.rating}/5 by ${restaurant.reviewCount.toLocaleString()} diners. ${restaurant.priceRange} — average INR ${restaurant.averageCost} for two. Order delivery or reserve a table now.`,
    openGraph: {
      title: `${restaurant.name} — ${restaurant.cuisines.join(", ")}`,
      description: restaurant.description,
      url: `https://dineease.in/restaurant/${restaurant.slug}`,
      type: "website",
      images: [
        {
          url: restaurant.coverImage,
          width: 1200,
          height: 675,
          alt: `${restaurant.name} — ${restaurant.cuisines.join(", ")} restaurant in ${restaurant.area}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: restaurant.name,
      description: restaurant.description,
      images: [restaurant.coverImage],
    },
    alternates: {
      canonical: `https://dineease.in/restaurant/${restaurant.slug}`,
    },
  };
}

function RestaurantJsonLd({ slug }: { slug: string }) {
  const restaurant = restaurants.find((r) => r.slug === slug) || restaurants[0];

  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    url: `https://dineease.in/restaurant/${restaurant.slug}`,
    telephone: restaurant.phone,
    email: restaurant.email,
    image: restaurant.coverImage,
    servesCuisine: restaurant.cuisines,
    priceRange: restaurant.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: restaurant.city,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating,
      reviewCount: restaurant.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHours: restaurant.openingHours,
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
        name: "Explore",
        item: "https://dineease.in/explore",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: restaurant.name,
        item: `https://dineease.in/restaurant/${restaurant.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      {children}
      <RestaurantJsonLd slug={slug} />
    </>
  );
}
