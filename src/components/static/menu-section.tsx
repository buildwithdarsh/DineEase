"use client";

import { useState } from "react";
import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { menuItems, menuCategories } from "@/lib/mock-data";
import { MenuSkeleton } from "./skeleton-sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, Flame, Star, Leaf } from "lucide-react";

export function MenuSection() {
  // Page load delay: 800-1200ms
  const isLoading = useSimulatedLoading(1100);
  const [activeCategory, setActiveCategory] = useState("starters");

  if (isLoading) return <MenuSkeleton />;

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  const activeInfo = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Signature Dishes
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Menu Highlights
          </h2>
          <p className="mt-3 text-muted-foreground">
            A curated selection from our seasonal menu
          </p>
        </div>

        {/* Category Tabs - scrollable on mobile with 44px touch targets */}
        <div className="mb-10 flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-all min-h-[44px]",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border text-muted-foreground hover:text-foreground hover:bg-card/80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {activeInfo && (
          <p className="mb-8 text-center text-muted-foreground italic">
            {activeInfo.description}
          </p>
        )}

        {/* Menu Items Grid - full-width cards on mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Tags overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isChefSpecial && (
                    <Badge className="bg-primary/90 text-primary-foreground text-xs gap-1">
                      <Sparkles className="size-3" />
                      Chef&apos;s Special
                    </Badge>
                  )}
                  {item.isBestseller && (
                    <Badge className="bg-warm-gold text-warm-gold-foreground text-xs gap-1">
                      <Flame className="size-3" />
                      Bestseller
                    </Badge>
                  )}
                  {item.isNew && (
                    <Badge className="bg-green-600 text-white text-xs gap-1">
                      <Star className="size-3" />
                      New
                    </Badge>
                  )}
                </div>
                {/* Dietary indicator */}
                {(item.dietaryTag === "veg" || item.dietaryTag === "vegan") && (
                  <div className="absolute top-3 right-3">
                    <div className="flex size-7 items-center justify-center rounded-full bg-green-600/90 text-white">
                      <Leaf className="size-3.5" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <p className="mt-12 text-center text-muted-foreground">
          Visit us for our full menu.{" "}
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-medium text-primary hover:underline min-h-[44px] inline-flex items-center"
          >
            Make an inquiry
          </button>{" "}
          to learn more.
        </p>
      </div>
    </section>
  );
}
