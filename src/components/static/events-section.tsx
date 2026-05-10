"use client";

import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { eventSpaces } from "@/lib/mock-data";
import { EventsSkeleton } from "./skeleton-sections";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2 } from "lucide-react";

export function EventsSection() {
  // Lazy load delay: 300-500ms
  const isLoading = useSimulatedLoading(350);

  if (isLoading) return <EventsSkeleton />;

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Celebrate With Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Private Dining & Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            From intimate dinners to grand celebrations, our bespoke event spaces offer
            the perfect backdrop for every occasion.
          </p>
        </div>

        {/* Event Spaces - full-width cards on mobile */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {eventSpaces.map((space) => (
            <Card
              key={space.id}
              className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-background/80 backdrop-blur-sm text-foreground gap-1.5">
                    <Users className="size-3" />
                    {space.capacity}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <h3 className="text-lg font-semibold">{space.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {space.description}
                </p>
                <ul className="space-y-2">
                  {space.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Interested in hosting your next event with us?{" "}
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-medium text-primary hover:underline min-h-[44px] inline-flex items-center"
            >
              Contact us to plan your event
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
