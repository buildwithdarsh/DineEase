"use client";

import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, Star, Clock, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyticsSummary, revenueData, popularItems, peakHourData } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";

export default function AnalyticsPage() {
  const loading = useLoading(1500);

  if (loading) return <div className="p-6"><DashboardSkeleton /></div>;

  const maxPeakOrders = Math.max(...peakHourData.map((d) => d.orders));

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Analytics & Reports</h1>
        <p className="text-sm text-muted-foreground">Performance insights for Spice Route</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Revenue", value: `INR ${(analyticsSummary.totalRevenue / 1000).toFixed(1)}K`, change: analyticsSummary.revenueChange, icon: DollarSign },
          { label: "Orders", value: analyticsSummary.totalOrders, change: analyticsSummary.ordersChange, icon: ShoppingBag },
          { label: "AOV", value: `INR ${analyticsSummary.avgOrderValue}`, change: analyticsSummary.aovChange, icon: TrendingUp },
          { label: "Rating", value: analyticsSummary.avgRating.toFixed(1), change: analyticsSummary.ratingChange, icon: Star },
          { label: "New Customers", value: analyticsSummary.newCustomers, change: 15, icon: Users },
          { label: "Returning", value: analyticsSummary.returningCustomers, change: 5, icon: Users },
          { label: "Table Turnover", value: `${analyticsSummary.tableTurnover}x`, change: 3, icon: Utensils },
          { label: "Food Cost %", value: `${analyticsSummary.foodCostPercentage}%`, change: -1.2, icon: DollarSign },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
                <kpi.icon className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xl font-bold">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.change >= 0 ? (
                  <ArrowUpRight className="size-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="size-3 text-red-500" />
                )}
                <span className={`text-xs ${kpi.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="popular">Popular Items</TabsTrigger>
          <TabsTrigger value="peak">Peak Hours</TabsTrigger>
        </TabsList>

        {/* Revenue */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader><CardTitle className="text-base">Daily Revenue (Last 7 Days)</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-64">
                {revenueData.map((data, i) => {
                  const maxRev = Math.max(...revenueData.map((d) => d.revenue));
                  const height = (data.revenue / maxRev) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-medium">{(data.revenue / 1000).toFixed(0)}K</span>
                      <div className="w-full flex flex-col gap-1" style={{ height: `${height}%` }}>
                        <div className="flex-1 rounded-t-lg bg-primary/80 hover:bg-primary transition-colors" />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.date}</span>
                      <span className="text-[10px] text-muted-foreground">{data.orders} orders</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Popular Items */}
        <TabsContent value="popular">
          <Card>
            <CardHeader><CardTitle className="text-base">Menu Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularItems.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-sm font-bold">INR {(item.revenue / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.quantity} sold</span>
                        <span className={`flex items-center gap-0.5 ${item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-500" : ""}`}>
                          {item.trend === "up" ? <TrendingUp className="size-3" /> : item.trend === "down" ? <TrendingDown className="size-3" /> : null}
                          {item.percentChange > 0 ? "+" : ""}{item.percentChange}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${(item.quantity / popularItems[0].quantity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Peak Hours */}
        <TabsContent value="peak">
          <Card>
            <CardHeader><CardTitle className="text-base">Order Volume by Hour</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end gap-1 h-64">
                {peakHourData.map((data) => {
                  const height = (data.orders / maxPeakOrders) * 100;
                  const isPeak = data.orders > maxPeakOrders * 0.7;
                  return (
                    <div key={data.hour} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">{data.orders}</span>
                      <div
                        className={`w-full rounded-t-sm transition-colors ${isPeak ? "bg-primary" : "bg-primary/40"}`}
                        style={{ height: `${height}%` }}
                        title={`${data.hour}:00 - ${data.orders} orders, INR ${data.revenue.toLocaleString()}`}
                      />
                      <span className="text-[10px] text-muted-foreground">{data.hour}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><div className="size-3 rounded-sm bg-primary" /> Peak Hours</span>
                <span className="flex items-center gap-1.5"><div className="size-3 rounded-sm bg-primary/40" /> Off-Peak</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
