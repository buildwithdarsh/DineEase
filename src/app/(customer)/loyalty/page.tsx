"use client";

import {
  Award,
  Star,
  Gift,
  TrendingUp,
  Crown,
  Sparkles,
  Users,
  Zap,
  ChevronRight,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hooks/use-loading";
import { Skeleton } from "@/components/shared/loading-skeleton";

const tierConfig = {
  silver: { label: "Silver", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", min: 0, max: 500, icon: Star },
  gold: { label: "Gold", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950", min: 500, max: 2000, icon: Award },
  platinum: { label: "Platinum", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950", min: 2000, max: 5000, icon: Crown },
};

const rewards = [
  { id: "rw1", title: "Free Delivery", description: "Free delivery on your next order", points: 200, image: "https://picsum.photos/id/91/100/100" },
  { id: "rw2", title: "10% Off Next Order", description: "Valid at any DineEase restaurant", points: 500, image: "https://picsum.photos/id/96/100/100" },
  { id: "rw3", title: "Free Dessert", description: "Any dessert worth up to INR 300", points: 800, image: "https://picsum.photos/id/129/100/100" },
  { id: "rw4", title: "25% Off Dine-in", description: "For a table of 4 or more", points: 1500, image: "https://picsum.photos/id/177/100/100" },
];

const history = [
  { id: "h1", description: "Order at Spice Route", points: 115, type: "earned" as const, date: "Mar 28" },
  { id: "h2", description: "Free Delivery Reward", points: -200, type: "spent" as const, date: "Mar 25" },
  { id: "h3", description: "Order at The Biryani Pot", points: 104, type: "earned" as const, date: "Mar 25" },
  { id: "h4", description: "Review bonus (5-star)", points: 50, type: "earned" as const, date: "Mar 24" },
  { id: "h5", description: "Referral bonus", points: 100, type: "earned" as const, date: "Mar 20" },
  { id: "h6", description: "Order at Bella Cucina", points: 231, type: "earned" as const, date: "Mar 18" },
];

export default function LoyaltyPage() {
  const loading = useLoading(800);
  const currentTier = "platinum";
  const currentPoints = 4235;
  const tier = tierConfig[currentTier];
  const TierIcon = tier.icon;
  const nextTier = currentTier === "platinum" ? null : currentTier === "gold" ? "platinum" : "gold";

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Rewards & Loyalty</h1>

      {/* Points Card — h2 section */}
      <h2 className="sr-only">Your Points Overview</h2>
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-warm-gold/10 p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TierIcon className={`size-6 ${tier.color}`} />
                <Badge className={`${tier.bg} ${tier.color} border-0 font-bold`}>
                  {tier.label} Member
                </Badge>
              </div>
              <div className="text-4xl sm:text-5xl font-bold mb-1">{currentPoints.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">DineEase Points</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Worth approximately</p>
              <p className="text-lg font-bold">INR {Math.floor(currentPoints / 10)}</p>
            </div>
          </div>

          {nextTier && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{tier.label}</span>
                <span>{tierConfig[nextTier as keyof typeof tierConfig].label}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.min(100, ((currentPoints - tier.min) / (tier.max - tier.min)) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                {tier.max - currentPoints} more points to {tierConfig[nextTier as keyof typeof tierConfig].label}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Tier Benefits */}
      <h2 className="sr-only">Membership Tiers</h2>
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        {Object.entries(tierConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = key === currentTier;
          return (
            <Card key={key} className={`${isActive ? "border-2 border-primary" : "opacity-60"}`}>
              <CardContent className="p-3 sm:p-4 text-center">
                <Icon className={`size-6 sm:size-8 mx-auto mb-2 ${config.color}`} />
                <h3 className="font-semibold text-xs sm:text-sm">{config.label}</h3>
                <p className="text-[10px] text-muted-foreground mt-1 truncate">
                  {key === "silver" ? "Free delivery x2/mo" : key === "gold" ? "Priority reservations" : "Exclusive events"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Referral */}
      <Card className="mb-8">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Invite Friends, Earn Rewards</h3>
            <p className="text-xs text-muted-foreground">
              Both you and your friend get INR 100 credit on their first order
            </p>
            <div className="flex items-center gap-2 mt-2">
              <code className="rounded bg-muted px-2 py-1 text-xs font-mono">DINEEASE-RAHUL</code>
              <Button variant="ghost" size="icon-xs">
                <Copy className="size-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards to Redeem */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">Redeem Rewards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardContent className="p-4 flex items-center gap-3">
                <img src={reward.image} alt={reward.title} className="size-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground">{reward.description}</p>
                  <p className="text-xs font-medium text-primary mt-1">{reward.points} points</p>
                </div>
                <Button
                  size="sm"
                  variant={currentPoints >= reward.points ? "default" : "outline"}
                  disabled={currentPoints < reward.points}
                >
                  Redeem
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Points History */}
      <section>
        <h2 className="text-lg font-bold mb-4">Points History</h2>
        <Card>
          <CardContent className="p-0 divide-y">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    item.type === "earned" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.type === "earned" ? "+" : ""}{item.points}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
