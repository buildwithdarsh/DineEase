"use client";

import { Users, Clock, Utensils, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tables } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import type { TableStatus } from "@/types";

const statusConfig: Record<TableStatus, { label: string; color: string; bgColor: string }> = {
  available: { label: "Available", color: "border-green-400 bg-green-50 dark:bg-green-950", bgColor: "bg-green-500" },
  occupied: { label: "Occupied", color: "border-red-400 bg-red-50 dark:bg-red-950", bgColor: "bg-red-500" },
  reserved: { label: "Reserved", color: "border-blue-400 bg-blue-50 dark:bg-blue-950", bgColor: "bg-blue-500" },
  cleaning: { label: "Cleaning", color: "border-amber-400 bg-amber-50 dark:bg-amber-950", bgColor: "bg-amber-500" },
};

export default function TablesPage() {
  const loading = useLoading(900);

  const summary = {
    total: tables.length,
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    cleaning: tables.filter((t) => t.status === "cleaning").length,
  };

  const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);
  const occupiedCapacity = tables.filter((t) => t.status === "occupied").reduce((sum, t) => sum + t.capacity, 0);
  const occupancyRate = Math.round((occupiedCapacity / totalCapacity) * 100);

  if (loading) return <div className="p-6"><DashboardSkeleton /></div>;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Table Management</h1>
          <p className="text-sm text-muted-foreground">Real-time floor plan and table status</p>
        </div>
        <Button className="gap-1.5 min-h-[44px] w-full sm:w-auto active:scale-95"><Users className="size-4" /> Add Walk-in</Button>
      </div>

      {/* Summary - horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x sm:grid sm:grid-cols-2 md:grid-cols-5 sm:gap-4 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
        <Card className="shrink-0 min-w-[100px] snap-start sm:shrink sm:min-w-0">
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold">{summary.total}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Total Tables</p>
          </CardContent>
        </Card>
        {(Object.entries(statusConfig) as [TableStatus, typeof statusConfig[TableStatus]][]).map(([status, config]) => (
          <Card key={status} className="shrink-0 min-w-[100px] snap-start sm:shrink sm:min-w-0">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className={`size-2.5 rounded-full ${config.bgColor}`} />
                <p className="text-2xl font-bold">{summary[status]}</p>
              </div>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Occupancy */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Occupancy Rate</span>
            <span className="text-sm font-bold">{occupancyRate}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${occupancyRate > 80 ? "bg-red-500" : occupancyRate > 50 ? "bg-amber-500" : "bg-green-500"}`}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {occupiedCapacity} of {totalCapacity} seats occupied
          </p>
        </CardContent>
      </Card>

      {/* Floor Plan */}
      <Tabs defaultValue="all">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="indoor">Indoor ({tables.filter((t) => t.section === "indoor").length})</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor ({tables.filter((t) => t.section === "outdoor").length})</TabsTrigger>
            <TabsTrigger value="bar">Bar ({tables.filter((t) => t.section === "bar").length})</TabsTrigger>
            <TabsTrigger value="private">Private ({tables.filter((t) => t.section === "private").length})</TabsTrigger>
          </TabsList>
        </div>

        {["all", "indoor", "outdoor", "bar", "private"].map((section) => (
          <TabsContent key={section} value={section}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {tables
                .filter((t) => section === "all" || t.section === section)
                .map((table) => {
                  const config = statusConfig[table.status];
                  return (
                    <Card
                      key={table.id}
                      className={`cursor-pointer transition-all hover:shadow-md border-2 ${config.color}`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-[10px] capitalize">{table.section}</Badge>
                          <Badge variant="outline" className="text-[10px] capitalize">{table.shape}</Badge>
                        </div>
                        <p className="text-3xl font-bold mb-1">#{table.number}</p>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                          <Users className="size-3.5" /> {table.capacity} seats
                        </div>
                        <Badge className={`text-[10px] border-0 ${config.color}`}>
                          {config.label}
                        </Badge>
                        {table.seatedAt && (
                          <p className="text-[10px] text-muted-foreground mt-2 flex items-center justify-center gap-0.5">
                            <Clock className="size-3" />
                            Since {new Date(table.seatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        )}
                        <div className="mt-3">
                          {table.status === "available" && (
                            <Button size="sm" className="w-full text-xs">Seat Guest</Button>
                          )}
                          {table.status === "occupied" && (
                            <Button size="sm" variant="outline" className="w-full text-xs">Generate Bill</Button>
                          )}
                          {table.status === "cleaning" && (
                            <Button size="sm" variant="outline" className="w-full text-xs gap-1">
                              <Sparkles className="size-3" /> Mark Clean
                            </Button>
                          )}
                          {table.status === "reserved" && (
                            <Button size="sm" variant="outline" className="w-full text-xs">View Reservation</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {(Object.entries(statusConfig) as [TableStatus, typeof statusConfig[TableStatus]][]).map(([status, config]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`size-3 rounded-sm ${config.bgColor}`} />
            <span className="text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
