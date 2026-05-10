import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Restaurants Near You — Order, Dine-in & Reserve Instantly",
  description:
    "Browse verified restaurants in Bangalore. Filter by cuisine, read reviews, compare menus, and order delivery or reserve tables in seconds.",
  openGraph: {
    title: "Explore Restaurants Near You — DineEase",
    description:
      "Browse verified restaurants in Bangalore. Filter by cuisine, read reviews, and order instantly.",
    url: "https://dineease.in/explore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Restaurants Near You — DineEase",
    description:
      "Browse verified restaurants in Bangalore. Filter by cuisine and order instantly.",
  },
  alternates: {
    canonical: "https://dineease.in/explore",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
