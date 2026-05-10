import type { MetadataRoute } from "next";
import { restaurants } from "@/lib/platform-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dineease.in";

  const restaurantRoutes: MetadataRoute.Sitemap = restaurants.map(
    (restaurant) => ({
      url: `${baseUrl}/restaurant/${restaurant.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/static`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reservations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/loyalty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...restaurantRoutes,
  ];
}
