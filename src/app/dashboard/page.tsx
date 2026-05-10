"use client";

import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ChefHat,
  CalendarDays,
  AlertTriangle,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  analyticsSummary,
  revenueData,
  popularItems,
  orders,
  reservations,
  notifications,
  kitchenOrders,
} from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import Link from "next/link";

const statCards = [
  {
    title: "Today's Revenue",
    value: `INR ${(analyticsSummary.totalRevenue / 1000).toFixed(1)}K`,
    change: analyticsSummary.revenueChange,
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Total Orders",
    value: analyticsSummary.totalOrders.toString(),
    change: analyticsSummary.ordersChange,
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Avg Order Value",
    value: `INR ${analyticsSummary.avgOrderValue}`,
    change: analyticsSummary.aovChange,
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Avg Rating",
    value: analyticsSummary.avgRating.toFixed(1),
    change: analyticsSummary.ratingChange,
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
];

export default function DashboardPage() {
  const loading = useLoading(1200);

  if (loading) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  const activeOrders = orders.filter(
    (o) => !["delivered", "completed", "cancelled", "feedback"].includes(o.status)
  );
  const upcomingReservations = reservations.filter((r) =>
    ["confirmed"].includes(r.status)
  );
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const pendingKitchen = kitchenOrders.filter((k) => k.status !== "ready" && k.status !== "served");

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening at Spice Route today.
        </p>
      </div>

      {/* Alerts */}
      {unreadNotifications.filter((n) => n.type === "alert").length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 p-3">
          <AlertTriangle className="size-5 text-orange-600 dark:text-orange-400 shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-medium text-orange-800 dark:text-orange-300">
              {unreadNotifications.filter((n) => n.type === "alert").length} alerts need attention
            </span>
            <span className="text-orange-600 dark:text-orange-400 ml-1">
              - {unreadNotifications.filter((n) => n.type === "alert")[0]?.message}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-orange-700 dark:text-orange-400 shrink-0">
            View All
          </Button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat) => {
          const isPositive = stat.change >= 0;
          return (
            <Card key={stat.title}>
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm text-muted-foreground">{stat.title}</span>
                  <div className={`size-7 sm:size-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`size-3.5 sm:size-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {isPositive ? (
                    <ArrowUpRight className="size-3.5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="size-3.5 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      isPositive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isPositive ? "+" : ""}{stat.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart + Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Trend (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {revenueData.map((data, i) => {
                const maxRev = Math.max(...revenueData.map((d) => d.revenue));
                const height = (data.revenue / maxRev) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">
                      {(data.revenue / 1000).toFixed(0)}K
                    </span>
                    <div
                      className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${data.date}: INR ${data.revenue.toLocaleString()} | ${data.orders} orders`}
                    />
                    <span className="text-[10px] text-muted-foreground">{data.date.split(" ")[1]}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Selling Items</CardTitle>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularItems.slice(0, 5).map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.quantity} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">INR {(item.revenue / 1000).toFixed(1)}K</p>
                    <span
                      className={`text-xs ${
                        item.trend === "up"
                          ? "text-green-600"
                          : item.trend === "down"
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }`}
                    >
                      {item.trend === "up" ? "+" : ""}{item.percentChange}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Active Orders */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingBag className="size-4" /> Active Orders
              </CardTitle>
              <Badge variant="secondary">{activeOrders.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.customerName} | {order.type}</p>
                </div>
                <Badge variant="outline" className="capitalize text-[10px]">{order.status}</Badge>
              </div>
            ))}
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm" className="w-full text-xs mt-1">
                View All Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Kitchen Queue */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ChefHat className="size-4" /> Kitchen Queue
              </CardTitle>
              <Badge variant="secondary">{pendingKitchen.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingKitchen.slice(0, 3).map((ko) => (
              <div key={ko.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{ko.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{ko.items.length} items | {ko.type}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      ko.elapsedTime > ko.estimatedPrepTime
                        ? "border-red-300 text-red-600"
                        : ko.elapsedTime > ko.estimatedPrepTime * 0.75
                          ? "border-amber-300 text-amber-600"
                          : ""
                    }`}
                  >
                    {ko.elapsedTime}m / {ko.estimatedPrepTime}m
                  </Badge>
                </div>
              </div>
            ))}
            <Link href="/dashboard/kitchen">
              <Button variant="ghost" size="sm" className="w-full text-xs mt-1">
                Open KDS
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Reservations */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="size-4" /> Reservations
              </CardTitle>
              <Badge variant="secondary">{upcomingReservations.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingReservations.slice(0, 3).map((res) => (
              <div key={res.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{res.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(res.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} {res.time} | {res.partySize} guests
                  </p>
                </div>
                {res.specialOccasion && (
                  <Badge variant="outline" className="text-[10px] capitalize">{res.specialOccasion}</Badge>
                )}
              </div>
            ))}
            <Link href="/dashboard/reservations">
              <Button variant="ghost" size="sm" className="w-full text-xs mt-1">
                View All
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
