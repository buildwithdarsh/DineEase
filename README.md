> This project is made with the help of Claude (1M context).

# DineEase

Restaurant discovery, ordering, and reservation platform — trusted by thousands of diners in Bangalore.

## Overview

DineEase helps diners find and book verified restaurants, order delivery, reserve tables, and manage dining preferences in one app. Emphasizes verified listings and instant reservations with a clean, exploration-first UX.

## Features

- **Restaurant discovery** — Search and explore verified restaurants
- **Delivery ordering** — Integrated ordering flow
- **Table reservations** — Instant booking with availability checks
- **User profiles** — Saved preferences and dining history
- **Verification badges** — Trust signals on every listing
- **Order tracking** — Real-time status updates
- **Reservation management** — View, modify, and cancel bookings

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4 + Base UI + shadcn
- **Animation:** tw-animate-css
- **Variants:** class-variance-authority
- **Icons:** Lucide React
- **Images:** Unsplash, Picsum integration

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The home route redirects to `/explore`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

Live: [dineease.work.withdarsh.com](https://dineease.work.withdarsh.com)
