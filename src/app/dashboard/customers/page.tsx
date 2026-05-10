"use client";

import { Search, Star, Crown, Award, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customers } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";

const segmentConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  regular: { label: "Regular", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  vip: { label: "VIP", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  "at-risk": { label: "At Risk", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  churned: { label: "Churned", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
};

const tierIcons = { silver: Star, gold: Award, platinum: Crown };

export default function CustomersPage() {
  const loading = useLoading(1000);

  if (loading) return <div className="p-6"><TableSkeleton rows={6} /></div>;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Customer Management (CRM)</h1>
        <p className="text-sm text-muted-foreground">{customers.length} customers in your database</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x sm:grid sm:grid-cols-2 md:grid-cols-5 sm:gap-4 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
        {Object.entries(segmentConfig).map(([seg, config]) => (
          <Card key={seg} className="shrink-0 min-w-[100px] snap-start sm:shrink sm:min-w-0">
            <CardContent className="p-3 sm:p-4 text-center">
              <p className="text-2xl font-bold">{customers.filter((c) => c.segment === seg).length}</p>
              <Badge className={`text-[10px] border-0 mt-1 ${config.color}`}>{config.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search customers..." className="pl-9 text-base sm:text-sm" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {customers.map((customer) => {
              const TierIcon = tierIcons[customer.loyaltyTier];
              const segment = segmentConfig[customer.segment];
              return (
                <div key={customer.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 active:bg-muted/50">
                  <img src={customer.avatar} alt={customer.name} className="size-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm">{customer.name}</span>
                      <Badge className={`text-[10px] border-0 ${segment.color}`}>{segment.label}</Badge>
                      <Badge variant="outline" className="text-[10px] gap-0.5 capitalize">
                        <TierIcon className="size-3" /> {customer.loyaltyTier}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{customer.email}</span>
                      <span>{customer.phone}</span>
                    </div>
                    {customer.dietaryPreferences.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        {customer.dietaryPreferences.map((p) => (
                          <DietaryBadge key={p} tag={p} />
                        ))}
                        {customer.allergens.map((a) => (
                          <Badge key={a} variant="outline" className="text-[10px] text-orange-600 border-orange-300">
                            <AlertTriangle className="size-2.5 mr-0.5" /> {a}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {customer.notes && (
                      <p className="text-xs text-muted-foreground mt-1 italic">{customer.notes}</p>
                    )}
                  </div>
                  <div className="hidden lg:grid grid-cols-3 gap-6 text-center shrink-0">
                    <div>
                      <p className="text-sm font-bold">{customer.totalOrders}</p>
                      <p className="text-[10px] text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">INR {(customer.totalSpend / 1000).toFixed(1)}K</p>
                      <p className="text-[10px] text-muted-foreground">Spent</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">{customer.loyaltyPoints}</p>
                      <p className="text-[10px] text-muted-foreground">Points</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Last order</p>
                    <p className="text-xs font-medium">{new Date(customer.lastOrderDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                    {customer.segment === "at-risk" && (
                      <Badge variant="outline" className="text-[10px] text-orange-600 mt-1 gap-0.5">
                        <TrendingDown className="size-3" /> Win-back
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
