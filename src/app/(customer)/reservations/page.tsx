"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  Phone,
  Gift,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { reservations, restaurants } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { Skeleton } from "@/components/shared/loading-skeleton";
import type { ReservationStatus } from "@/types";

const statusConfig: Record<ReservationStatus, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400", icon: CheckCircle2 },
  seated: { label: "Seated", color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400", icon: XCircle },
  "no-show": { label: "No-Show", color: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400", icon: AlertCircle },
};

export default function ReservationsPage() {
  const loading = useLoading(1000);
  const upcoming = reservations.filter((r) => ["confirmed", "seated"].includes(r.status));
  const past = reservations.filter((r) => ["completed", "cancelled", "no-show"].includes(r.status));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Reservations</h1>

        {/* Desktop: Dialog */}
        <Dialog>
          <DialogTrigger className="hidden sm:inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium px-3 h-9 gap-1.5 hover:bg-primary/90 transition-colors">
            <Plus className="size-4" /> New Reservation
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Make a Reservation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label className="text-sm">Restaurant</Label>
                <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base sm:text-sm min-h-[44px]">
                  {restaurants.filter(r => r.isOpen).map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Date</Label>
                  <Input type="date" defaultValue="2026-03-30" className="mt-1.5 text-base sm:text-sm" />
                </div>
                <div>
                  <Label className="text-sm">Time</Label>
                  <Input type="time" defaultValue="19:30" className="mt-1.5 text-base sm:text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Party Size</Label>
                  <Input type="number" min={1} max={20} defaultValue={2} className="mt-1.5 text-base sm:text-sm" />
                </div>
                <div>
                  <Label className="text-sm">Seating</Label>
                  <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base sm:text-sm min-h-[44px]">
                    <option>Any</option>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Bar</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-sm">Special Occasion</Label>
                <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base sm:text-sm min-h-[44px]">
                  <option value="">None</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business Meeting</option>
                  <option>Date Night</option>
                </select>
              </div>
              <div>
                <Label className="text-sm">Special Requests</Label>
                <Textarea placeholder="High chair, wheelchair access, quiet table..." className="mt-1.5 text-base sm:text-sm" rows={2} />
              </div>
              <Button className="w-full h-11">Confirm Reservation</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mobile: Bottom Sheet */}
        <Sheet>
          <SheetTrigger className="sm:hidden inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium px-3 min-h-[44px] gap-1.5 hover:bg-primary/90 transition-colors active:scale-95">
            <Plus className="size-4" /> New
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl max-h-[90vh] overflow-y-auto px-6">
            <div className="mx-auto w-10 h-1 rounded-full bg-muted-foreground/30 mb-4 mt-1" />
            <h3 className="text-lg font-bold mb-4">Make a Reservation</h3>
            <div className="space-y-4 pb-safe">
              <div>
                <Label className="text-sm">Restaurant</Label>
                <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base min-h-[44px]">
                  {restaurants.filter(r => r.isOpen).map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Date</Label>
                  <Input type="date" defaultValue="2026-03-30" className="mt-1.5 text-base" />
                </div>
                <div>
                  <Label className="text-sm">Time</Label>
                  <Input type="time" defaultValue="19:30" className="mt-1.5 text-base" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Party Size</Label>
                  <Input type="number" min={1} max={20} defaultValue={2} className="mt-1.5 text-base" />
                </div>
                <div>
                  <Label className="text-sm">Seating</Label>
                  <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base min-h-[44px]">
                    <option>Any</option>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Bar</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-sm">Special Occasion</Label>
                <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-base min-h-[44px]">
                  <option value="">None</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business Meeting</option>
                  <option>Date Night</option>
                </select>
              </div>
              <div>
                <Label className="text-sm">Special Requests</Label>
                <Textarea placeholder="High chair, wheelchair access, quiet table..." className="mt-1.5 text-base" rows={2} />
              </div>
              <Button className="w-full h-12 text-base font-semibold">Confirm Reservation</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-initial">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-initial">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          ) : upcoming.length === 0 ? (
            <div className="text-center py-16">
              <CalendarDays className="size-12 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">No upcoming reservations</h3>
              <p className="text-sm text-muted-foreground">Book a table at your favorite restaurant</p>
            </div>
          ) : (
            upcoming.map((res) => {
              const config = statusConfig[res.status];
              const Icon = config.icon;
              return (
                <Card key={res.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{res.restaurantName}</h3>
                        <Badge className={`mt-1 text-[10px] ${config.color} border-0`}>
                          <Icon className="size-3 mr-0.5" />
                          {config.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(res.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                        </p>
                        <p className="text-xs text-muted-foreground">{res.time}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-muted-foreground" />
                        <span>{res.partySize} guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground" />
                        <span className="capitalize">{res.seatingPreference}</span>
                      </div>
                      {res.tableNumber && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Table</span>
                          <span className="font-medium">#{res.tableNumber}</span>
                        </div>
                      )}
                      {res.specialOccasion && (
                        <div className="flex items-center gap-1.5">
                          <Gift className="size-3.5 text-muted-foreground" />
                          <span className="capitalize">{res.specialOccasion}</span>
                        </div>
                      )}
                    </div>
                    {res.specialRequests && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MessageSquare className="size-3 mt-0.5 shrink-0" />
                        <span>{res.specialRequests}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="min-h-[40px] active:scale-95">Modify</Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive min-h-[40px] active:scale-95">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {past.map((res) => {
            const config = statusConfig[res.status];
            const Icon = config.icon;
            return (
              <Card key={res.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{res.restaurantName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(res.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {res.time} | {res.partySize} guests
                      </p>
                    </div>
                    <Badge className={`text-[10px] ${config.color} border-0`}>
                      <Icon className="size-3 mr-0.5" />
                      {config.label}
                    </Badge>
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
