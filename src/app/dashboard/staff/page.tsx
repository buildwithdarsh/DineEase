"use client";

import { Plus, Search, Clock, Star, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { staffMembers } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import type { StaffRole } from "@/types";

const roleColors: Record<StaffRole, string> = {
  owner: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  manager: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  chef: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "line-cook": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  waiter: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  host: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  cashier: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  "delivery-coordinator": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
};

export default function StaffPage() {
  const loading = useLoading(1000);

  if (loading) return <div className="p-6"><TableSkeleton rows={8} /></div>;

  const activeStaff = staffMembers.filter((s) => s.isActive);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Staff Management</h1>
          <p className="text-sm text-muted-foreground">{staffMembers.length} team members | {activeStaff.length} on shift</p>
        </div>
        <Button size="sm" className="gap-1.5 min-h-[44px] w-full sm:w-auto active:scale-95"><Plus className="size-3.5" /> Add Staff</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{activeStaff.length}</p><p className="text-xs text-muted-foreground">On Shift</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{activeStaff.filter((s) => s.role === "waiter").reduce((sum, s) => sum + s.ordersToday, 0)}</p><p className="text-xs text-muted-foreground">Tables Served</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">INR {activeStaff.reduce((sum, s) => sum + s.tipsToday, 0).toLocaleString()}</p><p className="text-xs text-muted-foreground">Tips Today</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{(activeStaff.filter((s) => s.rating > 0).reduce((sum, s) => sum + s.rating, 0) / activeStaff.filter((s) => s.rating > 0).length).toFixed(1)}</p><p className="text-xs text-muted-foreground">Avg Rating</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 active:bg-muted/50">
                <img src={staff.avatar} alt={staff.name} className="size-10 rounded-full object-cover shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{staff.name}</span>
                    <Badge className={`text-[10px] border-0 capitalize ${roleColors[staff.role]}`}>{staff.role.replace("-", " ")}</Badge>
                    {staff.isActive ? (
                      <Badge variant="outline" className="text-[10px] text-green-600 border-green-300"><CheckCircle2 className="size-3 mr-0.5" /> Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-muted-foreground"><XCircle className="size-3 mr-0.5" /> Off Duty</Badge>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-xs text-muted-foreground mt-1">
                    <span className="truncate">{staff.email}</span>
                    <span>{staff.phone}</span>
                    {staff.shiftStart && <span className="flex items-center gap-0.5"><Clock className="size-3" /> {staff.shiftStart} - {staff.shiftEnd}</span>}
                  </div>
                </div>
                <div className="hidden md:grid grid-cols-3 gap-6 text-center shrink-0">
                  <div>
                    <p className="text-sm font-bold">{staff.ordersToday}</p>
                    <p className="text-[10px] text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold flex items-center justify-center gap-0.5">
                      {staff.rating > 0 ? <><Star className="size-3 fill-amber-400 text-amber-400" />{staff.rating}</> : "-"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{staff.tipsToday > 0 ? `INR ${staff.tipsToday}` : "-"}</p>
                    <p className="text-[10px] text-muted-foreground">Tips</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="min-w-[44px] min-h-[44px] shrink-0">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
