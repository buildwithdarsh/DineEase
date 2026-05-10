import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table Reservations — Book Instantly at Verified Restaurants",
  description:
    "Reserve tables at verified restaurants in Bangalore. Choose your date, party size, and seating preference — confirmed in seconds.",
  openGraph: {
    title: "Reserve a Table — DineEase",
    description:
      "Book tables instantly at verified restaurants in Bangalore.",
    url: "https://dineease.in/reservations",
  },
  alternates: {
    canonical: "https://dineease.in/reservations",
  },
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
