"use client";

import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { restaurantInfo } from "@/lib/mock-data";
import { HeroSkeleton } from "./skeleton-sections";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const isLoading = useSimulatedLoading(1000);

  if (isLoading) return <HeroSkeleton />;

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Background Image — uses next/image for optimization and LCP preload */}
      <Image
        src="https://picsum.photos/id/75/1920/1080"
        alt={`${restaurantInfo.name} — ${restaurantInfo.cuisine} restaurant interior`}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-warm-gold opacity-90 animate-fade-in">
          {restaurantInfo.cuisine}
        </p>

        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in animation-delay-200">
          {restaurantInfo.name}
        </h1>

        <p className="mb-8 max-w-lg text-lg text-white/80 sm:text-xl animate-fade-in animation-delay-400">
          {restaurantInfo.tagline}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row animate-fade-in animation-delay-600">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-base"
          >
            Make an Inquiry
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="border-white/30 text-white bg-white/10 hover:bg-white/20 min-h-[44px] px-8 text-base"
          >
            Explore Menu
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <ChevronDown className="size-8" />
      </button>
    </section>
  );
}
