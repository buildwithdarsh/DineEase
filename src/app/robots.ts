import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/cart", "/orders", "/profile"],
      },
    ],
    sitemap: "https://dineease.in/sitemap.xml",
  };
}
