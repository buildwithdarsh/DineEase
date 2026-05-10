"use client";

import { useState } from "react";
import { Clock, CheckCircle2, ChefHat, Package, Bike, XCircle, Star, Filter, Search, Volume2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import type { OrderStatus, OrderType } from "@/types";

const statusColors: Record<OrderStatus, string> = {
  placed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  confirmed: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  preparing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  ready: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  served: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  dispatched: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  feedback: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const typeColors: Record<OrderType, string> = {
  "dine-in": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400",
  takeaway: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400",
  delivery: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400",
};

export default function DashboardOrdersPage() {
  const loading = useLoading(1000);
  const [search, setSearch] = useState("");
  const [autoPause, setAutoPause] = useState(false);

  const filteredOrders = orders.filter((o) =>
    !search ||
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Order Management</h1>
          <p className="text-sm text-muted-foreground">Manage all incoming and active orders</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={autoPause ? "destructive" : "outline"}
            size="sm"
            className="gap-1.5 min-h-[40px] flex-1 sm:flex-initial active:scale-95"
            onClick={() => setAutoPause(!autoPause)}
          >
            {autoPause ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            <span className="hidden sm:inline">{autoPause ? "Resume Orders" : "Pause Orders"}</span>
            <span className="sm:hidden">{autoPause ? "Resume" : "Pause"}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 min-h-[40px] active:scale-95">
            <Volume2 className="size-3.5" /> <span className="hidden sm:inline">Sound On</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by order # or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-base sm:text-sm"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-initial">All ({filteredOrders.length})</TabsTrigger>
          <TabsTrigger value="dine-in" className="flex-1 sm:flex-initial">Dine-in</TabsTrigger>
          <TabsTrigger value="takeaway" className="flex-1 sm:flex-initial">Takeaway</TabsTrigger>
          <TabsTrigger value="delivery" className="flex-1 sm:flex-initial">Delivery</TabsTrigger>
        </TabsList>

        {["all", "dine-in", "takeaway", "delivery"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : (
              filteredOrders
                .filter((o) => tab === "all" || o.type === tab)
                .map((order) => (
                  <Card key={order.id} className={order.status === "placed" ? "ring-2 ring-primary animate-pulse-once" : ""}>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-2">
                            <span className="font-bold text-sm">{order.orderNumber}</span>
                            <Badge className={`text-[10px] border ${typeColors[order.type]}`}>
                              {order.type}
                            </Badge>
                            <Badge className={`text-[10px] border-0 capitalize ${statusColors[order.status]}`}>
                              {order.status}
                            </Badge>
                            {order.status === "placed" && (
                              <Badge className="text-[10px] bg-red-500 text-white border-0 animate-pulse">
                                NEW - Accept Now
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm mb-2">
                            <span className="font-medium">{order.customerName}</span>
                            <span className="text-muted-foreground"> | {order.customerPhone}</span>
                            {order.tableNumber && (
                              <span className="text-muted-foreground"> | Table #{order.tableNumber}</span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-2 text-xs">
                                <DietaryBadge tag={item.dietaryTag} />
                                <span>{item.quantity}x {item.name}</span>
                                <span className="text-muted-foreground">INR {item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          {order.specialInstructions && (
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">
                              Note: {order.specialInstructions}
                            </p>
                          )}
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-0">
                          <div>
                            <p className="text-base sm:text-lg font-bold">INR {order.total}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.placedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                              <span className="ml-1">| Est: {order.estimatedPrepTime} min</span>
                            </p>
                          </div>
                          <div className="flex sm:flex-col gap-1.5 sm:mt-3">
                            {order.status === "placed" && (
                              <>
                                <Button size="sm" className="text-xs">Accept</Button>
                                <Button size="sm" variant="outline" className="text-xs text-destructive">Reject</Button>
                              </>
                            )}
                            {order.status === "confirmed" && (
                              <Button size="sm" className="text-xs">Start Preparing</Button>
                            )}
                            {order.status === "preparing" && (
                              <Button size="sm" className="text-xs">Mark Ready</Button>
                            )}
                            {order.status === "ready" && order.type === "delivery" && (
                              <Button size="sm" className="text-xs">Assign Delivery</Button>
                            )}
                            {order.status === "ready" && order.type === "dine-in" && (
                              <Button size="sm" className="text-xs">Mark Served</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
