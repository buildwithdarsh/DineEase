"use client";

import { Package, AlertTriangle, Plus, Search, TrendingDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { inventoryItems } from "@/lib/platform-data";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";

const statusColors = {
  "in-stock": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  low: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "out-of-stock": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export default function InventoryPage() {
  const loading = useLoading(2200); // Slow load simulation

  if (loading) return <div className="p-6"><TableSkeleton rows={10} /></div>;

  const alerts = inventoryItems.filter((i) => i.status !== "in-stock");
  const totalValue = inventoryItems.reduce((s, i) => s + i.currentStock * i.costPerUnit, 0);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">{inventoryItems.length} items tracked | {alerts.length} alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 min-h-[40px] flex-1 sm:flex-initial active:scale-95"><ShoppingCart className="size-3.5" /> Create PO</Button>
          <Button size="sm" className="gap-1.5 min-h-[40px] flex-1 sm:flex-initial active:scale-95"><Plus className="size-3.5" /> Add Item</Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                item.status === "out-of-stock"
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                  : item.status === "critical"
                    ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950"
                    : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
              }`}
            >
              <AlertTriangle className={`size-4 shrink-0 ${item.status === "out-of-stock" ? "text-red-600" : "text-orange-600"}`} />
              <div className="flex-1 text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground"> - {item.currentStock} {item.unit} remaining (par: {item.parLevel})</span>
                {item.expiryDate && (
                  <span className="text-red-600 dark:text-red-400 ml-2">Expires: {new Date(item.expiryDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                )}
              </div>
              <Button size="sm" variant="outline" className="text-xs">Reorder</Button>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{inventoryItems.length}</p><p className="text-xs text-muted-foreground">Total Items</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{inventoryItems.filter((i) => i.status === "out-of-stock").length}</p><p className="text-xs text-muted-foreground">Out of Stock</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{inventoryItems.filter((i) => ["low", "critical"].includes(i.status)).length}</p><p className="text-xs text-muted-foreground">Low Stock</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">INR {(totalValue / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Stock Value</p></CardContent></Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium">Item</th>
                  <th className="text-left p-3 font-medium">Category</th>
                  <th className="text-right p-3 font-medium">Stock</th>
                  <th className="text-right p-3 font-medium">Par Level</th>
                  <th className="text-right p-3 font-medium">Cost/Unit</th>
                  <th className="text-left p-3 font-medium">Supplier</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Last Restocked</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-muted-foreground">{item.category}</td>
                    <td className="p-3 text-right font-mono">
                      {item.currentStock} {item.unit}
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden ml-auto mt-1">
                        <div
                          className={`h-full rounded-full ${item.currentStock / item.parLevel > 0.6 ? "bg-green-500" : item.currentStock / item.parLevel > 0.3 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min(100, (item.currentStock / item.parLevel) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-3 text-right text-muted-foreground">{item.parLevel} {item.unit}</td>
                    <td className="p-3 text-right">INR {item.costPerUnit}</td>
                    <td className="p-3 text-muted-foreground">{item.supplier}</td>
                    <td className="p-3">
                      <Badge className={`text-[10px] border-0 ${statusColors[item.status]}`}>
                        {item.status.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{new Date(item.lastRestocked).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
