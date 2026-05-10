"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Clock,
  Bike,
  Percent,
  Flame,
  Sparkles,
  TrendingUp,
  Soup,
  CookingPot,
  Container,
  Pizza,
  Fish,
  Wheat,
  Beef,
  Sandwich,
  Coffee,
  CakeSlice,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { restaurants, collections } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { RestaurantCardSkeleton } from "@/components/shared/loading-skeleton";
import type { CuisineType, Restaurant } from "@/types";

const cuisineFilters: { label: string; icon: LucideIcon; value: CuisineType }[] = [
  { label: "North Indian", icon: Soup, value: "North Indian" },
  { label: "South Indian", icon: CookingPot, value: "South Indian" },
  { label: "Chinese", icon: Container, value: "Chinese" },
  { label: "Italian", icon: Pizza, value: "Italian" },
  { label: "Japanese", icon: Fish, value: "Japanese" },
  { label: "Biryani", icon: Wheat, value: "Biryani" },
  { label: "Burger", icon: Beef, value: "Burger" },
  { label: "Street Food", icon: Sandwich, value: "Street Food" },
  { label: "Cafe", icon: Coffee, value: "Cafe" },
  { label: "Desserts", icon: CakeSlice, value: "Desserts" },
];

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm active:scale-[0.98]">
        <div className="relative">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="h-40 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {restaurant.isPromoted && (
            <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px]">
              <Sparkles className="size-3 mr-0.5" /> Promoted
            </Badge>
          )}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
                Currently Closed
              </span>
            </div>
          )}
          {restaurant.activeOffers.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
              <span className="text-white text-xs font-medium flex items-center gap-1">
                <Percent className="size-3" />
                {restaurant.activeOffers[0].title}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base truncate">{restaurant.name}</h3>
            <span className="flex items-center gap-0.5 rounded-md bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white shrink-0">
              {restaurant.rating} <Star className="size-2.5 fill-white" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {restaurant.cuisines.join(", ")}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" /> {restaurant.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> {restaurant.deliveryTime} min
            </span>
            <span>{restaurant.priceRange}</span>
            <span className="text-foreground font-medium ml-auto">
              INR {restaurant.averageCost} for two
            </span>
          </div>
          {restaurant.dietaryOptions.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {restaurant.dietaryOptions.slice(0, 3).map((tag) => (
                <DietaryBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ExplorePage() {
  const loading = useLoading(1000);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase())) ||
      r.area.toLowerCase().includes(search.toLowerCase());
    const matchCuisine =
      !selectedCuisine || r.cuisines.includes(selectedCuisine);
    return matchSearch && matchCuisine;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-warm-gold/10 py-6 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
              Discover your next <span className="text-primary">favorite meal</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Order delivery, reserve tables, or dine in at top-rated restaurants near you
            </p>
            <div className="flex gap-2" id="search">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-11 bg-background text-base"
                />
              </div>
              <Button variant="outline" size="lg" className="gap-1.5 shrink-0 min-w-[44px] min-h-[44px]">
                <SlidersHorizontal className="size-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-10">
        {/* Cuisine Quick Filters */}
        <section className="-mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-none snap-x snap-mandatory">
            {cuisineFilters.map((cuisine) => (
              <button
                key={cuisine.value}
                onClick={() =>
                  setSelectedCuisine(
                    selectedCuisine === cuisine.value ? null : cuisine.value
                  )
                }
                className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-medium transition-all shrink-0 min-w-[72px] min-h-[72px] snap-start active:scale-95 ${
                  selectedCuisine === cuisine.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <cuisine.icon className="size-6" />
                {cuisine.label}
              </button>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Curated Collections</h2>
              <p className="text-sm text-muted-foreground">Handpicked restaurant lists for every mood</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              See all <ChevronRight className="size-3.5" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
            {collections.slice(0, 4).map((collection) => (
              <Link key={collection.id} href={`/explore?collection=${collection.slug}`} className="group relative rounded-xl overflow-hidden shrink-0 w-[70vw] sm:w-auto snap-start active:scale-[0.98] transition-transform">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-semibold">{collection.title}</h3>
                  <p className="text-white/70 text-xs">{collection.restaurantCount} places</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-5 text-primary" />
            <h2 className="text-xl font-bold">Trending Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {restaurants
              .filter((r) => r.isPromoted)
              .map((r) => (
                <Link key={r.id} href={`/restaurant/${r.slug}`} className="shrink-0 w-64">
                  <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <img src={r.coverImage} alt={r.name} className="h-32 w-full object-cover" />
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm truncate">{r.name}</h3>
                      <p className="text-xs text-muted-foreground">{r.cuisines.slice(0, 2).join(", ")}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs">
                        <span className="flex items-center gap-0.5 text-green-600 font-medium">
                          <Star className="size-3 fill-green-600" /> {r.rating}
                        </span>
                        <span className="text-muted-foreground">{r.deliveryTime} min</span>
                        {r.activeOffers[0] && (
                          <span className="text-primary font-medium ml-auto">{r.activeOffers[0].title}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        {/* All Restaurants */}
        <section>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Restaurants Near You</h2>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-initial">All</TabsTrigger>
                <TabsTrigger value="delivery" className="flex-1 sm:flex-initial">Delivery</TabsTrigger>
                <TabsTrigger value="dine-in" className="flex-1 sm:flex-initial">Dine-in</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <RestaurantCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                  {filteredRestaurants.length === 0 && (
                    <div className="col-span-full text-center py-16">
                      <Search className="size-12 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-1">No restaurants found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="delivery">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.filter(r => r.isOpen).map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="dine-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.filter(r => r.totalTables > 0).map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
