"use client";

import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { chef } from "@/lib/mock-data";
import { ChefSkeleton } from "./skeleton-sections";
import { Badge } from "@/components/ui/badge";
import { Award, Quote } from "lucide-react";

export function ChefSection() {
  // Lazy load delay: 300-500ms
  const isLoading = useSimulatedLoading(400);

  if (isLoading) return <ChefSkeleton />;

  return (
    <section id="chef" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            The Mastermind
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Chef&apos;s Story
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
          {/* Chef Image */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={chef.image}
                alt={chef.name}
                width={600}
                height={750}
                className="w-full object-cover aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">{chef.name}</h3>
                <p className="text-sm text-white/80">{chef.title}</p>
              </div>
            </div>
          </div>

          {/* Chef Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quote */}
            <div className="relative rounded-xl bg-card border p-6">
              <Quote className="absolute top-4 left-4 size-8 text-primary/20" />
              <blockquote className="pl-8 text-lg italic leading-relaxed text-foreground/80">
                &ldquo;{chef.quote}&rdquo;
              </blockquote>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                About
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {chef.bio}
              </p>
            </div>

            {/* Journey */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Culinary Journey
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {chef.journey}
              </p>
            </div>

            {/* Awards */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Awards & Recognition
              </h4>
              <div className="flex flex-wrap gap-2">
                {chef.awards.map((award) => (
                  <Badge
                    key={award}
                    variant="secondary"
                    className="gap-1.5 py-1.5 px-3"
                  >
                    <Award className="size-3 text-warm-gold" />
                    {award}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
