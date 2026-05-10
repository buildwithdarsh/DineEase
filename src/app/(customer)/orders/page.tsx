"use client";

import Link from "next/link";
import {
  Clock,
  ChefHat,
  CheckCircle2,
  XCircle,
  Bike,
  Package,
  Star,
  ChevronRight,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { Skeleton } from "@/components/shared/loading-skeleton";
import type { OrderStatus } from "@/types";

const statusConfig: Record<OrderStatus, { icon: React.ElementType; label: string; color: string }> = {
  placed: { icon: Clock, label: "Placed", color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  confirmed: { icon: CheckCircle2, label: "Confirmed", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400" },
  preparing: { icon: ChefHat, label: "Preparing", color: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400" },
  ready: { icon: Package, label: "Ready", color: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" },
  served: { icon: CheckCircle2, label: "Served", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  dispatched: { icon: Bike, label: "On the Way", color: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400" },
  delivered: { icon: CheckCircle2, label: "Delivered", color: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" },
  completed: { icon: CheckCircle2, label: "Completed", color: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" },
  feedback: { icon: Star, label: "Rate Order", color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400" },
};

const typeLabels = { "dine-in": "Dine-in", takeaway: "Takeaway", delivery: "Delivery" };

export default function OrdersPage() {
  const loading = useLoading(900);
  const activeOrders = orders.filter((o) => !["delivered", "completed", "cancelled", "feedback"].includes(o.status));
  const pastOrders = orders.filter((o) => ["delivered", "completed", "cancelled", "feedback"].includes(o.status));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Orders</h1>

      <Tabs defaultValue="active">
        <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto h-10 rounded-lg p-1">
          <TabsTrigger value="active" className="flex-1 sm:flex-initial rounded-md text-sm font-medium data-[state=active]:shadow-sm">
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-initial rounded-md text-sm font-medium data-[state=active]:shadow-sm">Past Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))
          ) : activeOrders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="size-12 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">No active orders</h3>
              <p className="text-sm text-muted-foreground mb-4">Your current orders will appear here</p>
              <Link href="/explore"><Button>Order Now</Button></Link>
            </div>
          ) : (
            activeOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img src={order.restaurantImage} alt={order.restaurantName} className="size-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-sm">{order.restaurantName}</h3>
                          <Badge className={`text-[10px] ${status.color} border-0`}>
                            <StatusIcon className="size-3 mr-0.5" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{order.orderNumber} | {typeLabels[order.type]}</p>
                        <div className="mt-2 space-y-0.5">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-1.5 text-xs">
                              <DietaryBadge tag={item.dietaryTag} />
                              <span>{item.quantity}x {item.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-semibold text-sm">INR {order.total}</span>
                          {order.deliveryPartner && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Bike className="size-3" />
                              <span>{order.deliveryPartner.name}</span>
                              {order.deliveryPartner.eta && order.deliveryPartner.eta > 0 && (
                                <span className="text-primary font-medium">ETA {order.deliveryPartner.eta} min</span>
                              )}
                            </div>
                          )}
                        </div>
                        {/* Tracking Progress */}
                        <div className="mt-3 flex gap-1">
                          {["placed", "confirmed", "preparing", "ready", order.type === "delivery" ? "dispatched" : "served"].map((step, i) => (
                            <div
                              key={step}
                              className={`h-1.5 flex-1 rounded-full ${
                                ["placed", "confirmed", "preparing", "ready", "dispatched", "served", "delivered", "completed"].indexOf(order.status) >= ["placed", "confirmed", "preparing", "ready", "dispatched"].indexOf(step)
                                  ? "bg-primary"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastOrders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img src={order.restaurantImage} alt={order.restaurantName} className="size-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{order.restaurantName}</h3>
                        <Badge className={`text-[10px] ${status.color} border-0`}>
                          <StatusIcon className="size-3 mr-0.5" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.orderNumber} | {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                      <p className="text-xs mt-1">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-semibold text-sm">INR {order.total}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1 text-xs min-h-[36px] active:scale-95">
                            <RotateCcw className="size-3" /> Reorder
                          </Button>
                          {order.status !== "cancelled" && (
                            <Button variant="ghost" size="sm" className="gap-1 text-xs min-h-[36px] active:scale-95">
                              <Star className="size-3" /> Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
