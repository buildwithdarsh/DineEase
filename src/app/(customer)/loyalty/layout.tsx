import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewards & Loyalty Program — Earn Points on Every Order",
  description:
    "Earn DineEase Points with every order and redeem them for free delivery, discounts, and exclusive dining perks. Join the loyalty program today.",
  openGraph: {
    title: "DineEase Rewards & Loyalty Program",
    description:
      "Earn points on every order, unlock tier benefits, and redeem rewards at your favorite restaurants.",
    url: "https://dineease.in/loyalty",
  },
  alternates: {
    canonical: "https://dineease.in/loyalty",
  },
};

export default function LoyaltyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
