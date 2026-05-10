"use client";

import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { restaurantInfo } from "@/lib/mock-data";
import { AboutSkeleton } from "./skeleton-sections";
import { Award, Leaf, Clock, BookOpen } from "lucide-react";

const statIcons = [Clock, Award, Leaf, BookOpen];

export function AboutSection() {
  // Page load delay: 800-1200ms
  const isLoading = useSimulatedLoading(1000);

  if (isLoading) return <AboutSkeleton />;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Story
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About {restaurantInfo.name}
          </h2>
        </div>

        {/* Two-column layout with image */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
            <Image
              src="https://picsum.photos/id/57/800/600"
              alt="Saffron & Sage restaurant interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {restaurantInfo.description}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground/80">
              {restaurantInfo.heritage}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {restaurantInfo.stats.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 sm:p-6 text-center transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
