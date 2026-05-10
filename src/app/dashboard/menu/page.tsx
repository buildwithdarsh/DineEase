"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Search, Upload, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { platformMenuCategories, platformMenuItems } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";

export default function MenuBuilderPage() {
  const loading = useLoading(1100);
  const [search, setSearch] = useState("");

  const allItems = platformMenuItems.filter((item) =>
    !search || item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6"><TableSkeleton rows={8} /></div>;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Menu Builder</h1>
          <p className="text-sm text-muted-foreground">{platformMenuItems.length} items across {platformMenuCategories.length} categories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 min-h-[40px] active:scale-95"><Upload className="size-3.5" /> <span className="hidden sm:inline">Bulk</span> Upload</Button>
          <Button size="sm" className="gap-1.5 min-h-[40px] active:scale-95"><Plus className="size-3.5" /> Add Item</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 text-base sm:text-sm" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max sm:w-auto">
            <TabsTrigger value="all">All Items</TabsTrigger>
            {platformMenuCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {allItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 active:bg-muted/50 transition-colors">
                    <GripVertical className="size-4 text-muted-foreground/50 cursor-grab shrink-0 hidden sm:block" />
                    <img src={item.image} alt={item.name} className="size-12 sm:size-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <DietaryBadge tag={item.dietaryTag} />
                        {item.isBestseller && <Badge variant="secondary" className="text-[10px] h-4">Bestseller</Badge>}
                        {item.isNew && <Badge variant="secondary" className="text-[10px] h-4 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">New</Badge>}
                        {item.isChefSpecial && <Badge variant="secondary" className="text-[10px] h-4 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">Chef&apos;s Special</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Star className="size-3 fill-amber-400 text-amber-400" /> {item.rating}</span>
                        <span><Clock className="size-3 inline mr-0.5" />{item.prepTime}m</span>
                        {item.allergens.length > 0 && <span className="text-orange-500">Allergens: {item.allergens.join(", ")}</span>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm">INR {item.price}</p>
                      {item.variants && item.variants.length > 0 && (
                        <p className="text-[10px] text-muted-foreground">{item.variants.length} variants</p>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon-sm" title={item.isAvailable ? "Available" : "Unavailable"} className="min-w-[36px] min-h-[36px]">
                        {item.isAvailable ? <Eye className="size-3.5 text-green-600" /> : <EyeOff className="size-3.5 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="min-w-[36px] min-h-[36px]"><Edit className="size-3.5" /></Button>
                      <Button variant="ghost" size="icon-sm" className="min-w-[36px] min-h-[36px]"><Trash2 className="size-3.5 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {platformMenuCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{cat.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cat.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <img src={item.image} alt={item.name} className="size-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.name}</span>
                          <DietaryBadge tag={item.dietaryTag} />
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="font-bold text-sm">INR {item.price}</span>
                      <Button variant="ghost" size="icon-sm"><Edit className="size-3.5" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
