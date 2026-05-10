"use client";

import { useState } from "react";
import { AlertTriangle, Clock, ChefHat, CheckCircle2, Volume2, Flame, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kitchenOrders } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import type { KitchenOrder } from "@/types";

const priorityConfig = {
  normal: { label: "Normal", color: "bg-muted text-muted-foreground" },
  high: { label: "High", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  rush: { label: "RUSH", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
};

function KitchenOrderCard({ order }: { order: KitchenOrder }) {
  const isOverdue = order.elapsedTime > order.estimatedPrepTime;
  const isWarning = order.elapsedTime > order.estimatedPrepTime * 0.75;
  const timerColor = isOverdue ? "text-red-600 bg-red-50 dark:bg-red-950" : isWarning ? "text-amber-600 bg-amber-50 dark:bg-amber-950" : "text-green-600 bg-green-50 dark:bg-green-950";

  return (
    <Card className={`${isOverdue ? "ring-2 ring-red-400 animate-pulse" : ""} ${order.priority === "rush" ? "ring-2 ring-red-500" : ""}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{order.orderNumber}</span>
            <Badge variant="outline" className="text-[10px] capitalize">{order.type}</Badge>
            {order.tableNumber && <Badge variant="secondary" className="text-[10px]">Table #{order.tableNumber}</Badge>}
            <Badge className={`text-[10px] border-0 ${priorityConfig[order.priority].color}`}>
              {order.priority === "rush" && <Zap className="size-3 mr-0.5" />}
              {priorityConfig[order.priority].label}
            </Badge>
            {order.isVIP && <Badge className="text-[10px] bg-purple-100 text-purple-800 border-0 dark:bg-purple-900 dark:text-purple-300">VIP</Badge>}
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold ${timerColor}`}>
            <Clock className="size-3" />
            {order.elapsedTime}m / {order.estimatedPrepTime}m
          </div>
        </div>

        {/* Customer */}
        <p className="text-xs text-muted-foreground mb-3">{order.customerName}</p>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 mb-3">
            <AlertTriangle className="size-4 text-orange-600 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-orange-800 dark:text-orange-300">{order.specialInstructions}</p>
          </div>
        )}

        {/* Items */}
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className={`size-2.5 rounded-full shrink-0 ${item.status === "done" ? "bg-green-500" : item.status === "preparing" ? "bg-orange-500 animate-pulse" : "bg-muted-foreground/30"}`} />
                <span className={`text-sm ${item.status === "done" ? "line-through text-muted-foreground" : "font-medium"}`}>
                  {item.quantity}x {item.name}
                </span>
                {item.variant && <span className="text-xs text-muted-foreground">({item.variant})</span>}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">{item.station}</Badge>
                {item.status !== "done" && (
                  <Button size="xs" variant={item.status === "preparing" ? "default" : "outline"} className="text-[10px]">
                    {item.status === "pending" ? "Start" : "Done"}
                  </Button>
                )}
                {item.status === "done" && <CheckCircle2 className="size-4 text-green-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Allergen Warnings */}
        {order.items.some((i) => i.allergens.length > 0) && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-red-600 dark:text-red-400">
            <AlertTriangle className="size-3.5" />
            <span className="font-semibold">
              Allergens: {[...new Set(order.items.flatMap((i) => i.allergens))].join(", ")}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {order.status === "pending" && (
            <Button size="sm" className="flex-1 min-h-[44px] active:scale-95">Start All Items</Button>
          )}
          {order.status === "in-progress" && order.items.every((i) => i.status === "done") && (
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 min-h-[44px] active:scale-95">
              <CheckCircle2 className="size-4 mr-1" /> Bump - Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button size="sm" variant="outline" className="flex-1 min-h-[44px] active:scale-95">
              <Eye className="size-4 mr-1" /> Awaiting Pickup
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function KitchenPage() {
  const loading = useLoading(800);

  if (loading) return <div className="p-6"><DashboardSkeleton /></div>;

  const pending = kitchenOrders.filter((o) => o.status === "pending");
  const inProgress = kitchenOrders.filter((o) => o.status === "in-progress");
  const ready = kitchenOrders.filter((o) => o.status === "ready");

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <ChefHat className="size-5 sm:size-6" /> Kitchen Display
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {kitchenOrders.length} orders | Avg: 22m | {kitchenOrders.filter((o) => o.elapsedTime > o.estimatedPrepTime).length} overdue
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 min-h-[40px] active:scale-95">
            <Volume2 className="size-3.5" /> <span className="hidden sm:inline">Alerts On</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-red-600 min-h-[40px] active:scale-95">
            <Flame className="size-3.5" /> Rush
          </Button>
        </div>
      </div>

      {/* Status Columns - horizontal scroll on mobile */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-6 sm:overflow-visible">
        {/* Pending */}
        <div className="min-w-[85vw] sm:min-w-0 snap-start">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-3 rounded-full bg-muted-foreground/30" />
            <h2 className="font-semibold">Pending ({pending.length})</h2>
          </div>
          <div className="space-y-4">
            {pending.map((order) => (
              <KitchenOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="min-w-[85vw] sm:min-w-0 snap-start">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-3 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="font-semibold">In Progress ({inProgress.length})</h2>
          </div>
          <div className="space-y-4">
            {inProgress.map((order) => (
              <KitchenOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Ready */}
        <div className="min-w-[85vw] sm:min-w-0 snap-start">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-3 rounded-full bg-green-500" />
            <h2 className="font-semibold">Ready ({ready.length})</h2>
          </div>
          <div className="space-y-4">
            {ready.map((order) => (
              <KitchenOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
