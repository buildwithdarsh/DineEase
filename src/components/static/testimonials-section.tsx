"use client";

import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { testimonials } from "@/lib/mock-data";
import { TestimonialsSkeleton } from "./skeleton-sections";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  // Page load delay: 800-1200ms
  const isLoading = useSimulatedLoading(900);

  if (isLoading) return <TestimonialsSkeleton />;

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            What Our Guests Say
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Testimonials
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stories from our dining table to yours
          </p>
        </div>

        {/* Testimonials Grid - full-width cards on mobile */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6 space-y-4">
                {/* Quote icon */}
                <Quote className="size-6 text-primary/20" />

                {/* Text */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < testimonial.rating
                          ? "fill-warm-gold text-warm-gold"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover size-10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {testimonial.occasion}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
