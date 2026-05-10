"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Share2,
  Heart,
  Bike,
  ShoppingBag,
  Plus,
  Minus,
  Info,
  ChevronRight,
  AlertTriangle,
  Percent,
  CalendarDays,
  Users,
  Wifi,
  Car,
  Dog,
  Music,
  TreePine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { restaurants, platformMenuCategories, reviews } from "@/lib/platform-data";
import { StarRating } from "@/components/shared/star-rating";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { RestaurantCardSkeleton, Skeleton } from "@/components/shared/loading-skeleton";
import type { MenuItem } from "@/types";

const amenityIcons: Record<string, React.ElementType> = {
  "Wi-Fi": Wifi,
  Parking: Car,
  "Valet Parking": Car,
  "Pet-Friendly": Dog,
  "Live Music": Music,
  "Outdoor Seating": TreePine,
};

function MenuItemCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}) {
  return (
    <div className="flex gap-3 sm:gap-4 py-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
          <DietaryBadge tag={item.dietaryTag} />
          {item.isBestseller && (
            <Badge variant="secondary" className="text-[10px] h-4 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              Bestseller
            </Badge>
          )}
          {item.isNew && (
            <Badge variant="secondary" className="text-[10px] h-4 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              New
            </Badge>
          )}
          {item.isChefSpecial && (
            <Badge variant="secondary" className="text-[10px] h-4 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
              Chef&apos;s Special
            </Badge>
          )}
        </div>
        <h4 className="font-semibold text-sm">{item.name}</h4>
        <p className="text-sm font-medium mt-0.5">INR {item.price}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Star className="size-3 fill-amber-400 text-amber-400" /> {item.rating}
          </span>
          <span>{item.reviewCount} reviews</span>
          <span className="flex items-center gap-0.5">
            <Clock className="size-3" /> {item.prepTime} min
          </span>
        </div>
        {item.allergens.length > 0 && (
          <div className="flex items-center gap-1 mt-2 text-[10px] text-orange-600 dark:text-orange-400">
            <AlertTriangle className="size-3" />
            Contains: {item.allergens.join(", ")}
          </div>
        )}
      </div>
      <div className="shrink-0 flex flex-col items-center gap-2">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-24 sm:h-24 sm:w-28 rounded-lg object-cover"
        />
        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-primary border-primary hover:bg-primary/5 min-h-[44px] min-w-[80px] active:scale-95"
          onClick={() => onAdd(item)}
          disabled={!item.isAvailable}
        >
          {item.isAvailable ? (
            <>
              <Plus className="size-3" /> ADD
            </>
          ) : (
            "Unavailable"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const loading = useLoading(1200);
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);

  const restaurant = restaurants.find((r) => r.slug === slug) || restaurants[0];
  const restaurantReviews = reviews.filter(
    (r) => r.restaurantId === restaurant.id
  );

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-72 w-full" />
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-52 sm:h-72 md:h-80">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 truncate">
                  {restaurant.name}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mb-2 truncate">
                  {restaurant.cuisines.join(" | ")}
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/90 flex-wrap">
                  <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md font-bold text-xs">
                    <Star className="size-3 fill-white" /> {restaurant.rating}
                  </span>
                  <span>{restaurant.reviewCount.toLocaleString()} reviews</span>
                  <span className="hidden sm:inline">{restaurant.priceRange}</span>
                  <span>INR {restaurant.averageCost} for two</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="secondary" className="rounded-full min-w-[44px] min-h-[44px]">
                  <Heart className="size-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full min-w-[44px] min-h-[44px]">
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-6">
        {/* Quick Info */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="size-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{restaurant.openingHours}</span>
            <Badge variant={restaurant.isOpen ? "default" : "secondary"} className="ml-1 text-[10px]">
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="size-4 text-muted-foreground shrink-0" />
            <span className="text-sm truncate">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Phone className="size-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{restaurant.phone}</span>
          </div>
        </div>

        {/* Offers */}
        {restaurant.activeOffers.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none mb-6">
            {restaurant.activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center gap-3 shrink-0 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-4 py-3"
              >
                <Percent className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">{offer.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {offer.description} | Code: {offer.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {restaurant.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] || Info;
            return (
              <Badge key={amenity} variant="outline" className="gap-1 py-1">
                <Icon className="size-3" /> {amenity}
              </Badge>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto">
            <TabsTrigger value="menu" className="flex-1 sm:flex-initial">Menu</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">Reviews ({restaurantReviews.length})</TabsTrigger>
            <TabsTrigger value="photos" className="flex-1 sm:flex-initial">Photos</TabsTrigger>
            <TabsTrigger value="info" className="flex-1 sm:flex-initial">Info</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Category Nav */}
              <div className="hidden lg:block">
                <nav className="sticky top-20 space-y-1">
                  {platformMenuCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {cat.name}
                      <span className="text-xs ml-1 text-muted-foreground">
                        ({cat.items.length})
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Menu Items */}
              <div className="lg:col-span-3 space-y-8">
                {platformMenuCategories.map((category) => (
                  <section key={category.id} id={category.id}>
                    <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="divide-y">
                      {category.items.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          onAdd={addToCart}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{restaurant.rating}</div>
                      <StarRating rating={restaurant.rating} size={16} showValue={false} />
                      <p className="text-xs text-muted-foreground mt-1">
                        {restaurant.reviewCount} reviews
                      </p>
                    </div>
                    <Separator orientation="vertical" className="h-20" />
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-4 text-right">{star}</span>
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-8 text-muted-foreground">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              {restaurantReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={review.customerAvatar}
                        alt={review.customerName}
                        className="size-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{review.customerName}</span>
                          {review.isVerified && (
                            <Badge variant="secondary" className="text-[10px] h-4">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRating rating={review.overallRating} size={12} showValue={false} />
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{review.comment}</p>
                        {review.photos.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {review.photos.map((photo, i) => (
                              <img
                                key={i}
                                src={photo}
                                alt={`Review photo ${i + 1} by ${review.customerName}`}
                                className="h-20 w-28 rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        )}
                        {review.dishesReviewed.length > 0 && (
                          <div className="flex gap-1.5 mt-2">
                            {review.dishesReviewed.map((dish) => (
                              <Badge key={dish} variant="outline" className="text-[10px]">
                                {dish}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {review.restaurantResponse && (
                          <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm">
                            <span className="font-medium text-xs">Restaurant Response:</span>
                            <p className="text-muted-foreground mt-0.5">{review.restaurantResponse}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            {/* Mobile: horizontal swipe gallery */}
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:hidden">
              {restaurant.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${restaurant.name} photo ${i + 1}`}
                  className="h-56 w-[80vw] shrink-0 rounded-lg object-cover snap-center cursor-pointer active:scale-[0.98] transition-transform"
                />
              ))}
            </div>
            {/* Tablet+: grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-3">
              {restaurant.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${restaurant.name} photo ${i + 1}`}
                  className="h-48 w-full rounded-lg object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>{restaurant.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Cuisines</span><span>{restaurant.cuisines.join(", ")}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Average Cost</span><span>INR {restaurant.averageCost} for two</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">FSSAI License</span><span className="font-mono text-xs">{restaurant.fssaiLicense}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Hours</span><span>{restaurant.openingHours}</span></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground mb-3">
                    <MapPin className="size-5 mr-2" /> Map View
                  </div>
                  <p className="text-sm">{restaurant.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{restaurant.distance} km away</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart - positioned above mobile bottom nav */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg">
          <Link href="/cart">
            <div className="flex items-center justify-between rounded-xl bg-primary px-5 py-3.5 text-primary-foreground shadow-xl active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5" />
                <span className="font-semibold text-sm">
                  {cartCount} {cartCount === 1 ? "item" : "items"} | INR {cartTotal}
                </span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium">
                View Cart <ChevronRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
