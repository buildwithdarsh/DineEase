"use client";

import { CalendarDays, Users, Clock, Gift, CheckCircle2, XCircle, AlertCircle, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reservations } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import type { ReservationStatus } from "@/types";

const statusConfig: Record<ReservationStatus, { label: string; color: string }> = {
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  seated: { label: "Seated", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  "no-show": { label: "No-Show", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
};

export default function DashboardReservationsPage() {
  const loading = useLoading(900);

  if (loading) return <div className="p-6"><TableSkeleton rows={6} /></div>;

  const today = reservations.filter((r) => r.date === "2026-03-28");
  const upcoming = reservations.filter((r) => r.date > "2026-03-28");
  const past = reservations.filter((r) => r.date < "2026-03-28" || ["completed", "cancelled", "no-show"].includes(r.status));

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Reservation Management</h1>
        <p className="text-sm text-muted-foreground">{reservations.length} total | {today.length} today</p>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{today.length}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{today.reduce((s, r) => s + r.partySize, 0)}</p>
            <p className="text-xs text-muted-foreground">Expected Guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{upcoming.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{reservations.filter((r) => r.status === "no-show").length}</p>
            <p className="text-xs text-muted-foreground">No-Shows</p>
          </CardContent>
        </Card>
      </div>

      {/* Reservation List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Reservations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {reservations.map((res) => {
              const config = statusConfig[res.status];
              return (
                <div key={res.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 active:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{res.customerName}</span>
                      <Badge className={`text-[10px] border-0 ${config.color}`}>{config.label}</Badge>
                      {res.specialOccasion && (
                        <Badge variant="outline" className="text-[10px] gap-0.5">
                          <Gift className="size-3" /> {res.specialOccasion}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="size-3" /> {new Date(res.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {res.time}</span>
                      <span className="flex items-center gap-1"><Users className="size-3" /> {res.partySize} guests</span>
                      <span className="capitalize">{res.seatingPreference}</span>
                      {res.tableNumber && <span>Table #{res.tableNumber}</span>}
                    </div>
                    {res.specialRequests && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MessageSquare className="size-3 shrink-0" /> {res.specialRequests}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button variant="ghost" size="icon-sm" className="min-w-[44px] min-h-[44px]"><Phone className="size-3.5" /></Button>
                    {res.status === "confirmed" && (
                      <>
                        <Button size="sm" className="text-xs min-h-[40px] active:scale-95">Seat Guest</Button>
                        <Button size="sm" variant="outline" className="text-xs text-destructive min-h-[40px] active:scale-95">No-Show</Button>
                      </>
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
