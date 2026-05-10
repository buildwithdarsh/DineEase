"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Grid3X3,
  ChefHat,
  BookOpen,
  CalendarDays,
  Users,
  Package,
  BarChart3,
  UserCircle,
  MessageSquare,
  Settings,
  UtensilsCrossed,
  Bell,
  Moon,
  Sun,
  ArrowLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { notifications } from "@/lib/platform-data";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag, badge: 3 },
  { href: "/dashboard/tables", label: "Tables", icon: Grid3X3 },
  { href: "/dashboard/kitchen", label: "Kitchen (KDS)", icon: ChefHat, badge: 5 },
  { href: "/dashboard/menu", label: "Menu Builder", icon: BookOpen },
  { href: "/dashboard/reservations", label: "Reservations", icon: CalendarDays, badge: 2 },
  { href: "/dashboard/staff", label: "Staff", icon: Users },
  { href: "/dashboard/inventory", label: "Inventory", icon: Package, badge: 3 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/customers", label: "Customers", icon: UserCircle },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare, badge: 1 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 h-14 border-b shrink-0">
        <UtensilsCrossed className="size-5 text-primary" />
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none">
            Dine<span className="text-primary">Ease</span>
          </span>
          <span className="text-[10px] text-muted-foreground">Business Dashboard</span>
        </div>
      </div>

      {/* Restaurant Selector */}
      <div className="px-3 py-3 border-b shrink-0">
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
          <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">SR</div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate">Spice Route</span>
            <span className="text-[10px] text-muted-foreground">Koramangala, Bangalore</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {sidebarLinks.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors min-h-[44px]",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted"
                )}
              >
                <link.icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{link.label}</span>
                {link.badge && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                    {link.badge}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Back to App */}
      <div className="px-3 py-3 border-t shrink-0">
        <Link href="/explore">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground h-10">
            <ArrowLeft className="size-3.5" />
            Back to Customer App
          </Button>
        </Link>
      </div>
    </>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-card h-screen sticky top-0">
      <SidebarContent />
    </aside>
  );
}

export function DashboardMobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center rounded-lg min-w-[44px] min-h-[44px] hover:bg-muted transition-colors lg:hidden">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function DashboardTopbar() {
  const [dark, setDark] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function toggleDark() {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 sm:px-6">
      {/* Mobile sidebar trigger + header */}
      <div className="lg:hidden flex items-center gap-2">
        <DashboardMobileSidebar />
        <UtensilsCrossed className="size-5 text-primary" />
        <span className="text-sm font-bold">
          Dine<span className="text-primary">Ease</span>
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={toggleDark} className="min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0">
          {dark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </Button>
        <Button variant="ghost" size="icon-sm" className="relative min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0">
          <Bell className="size-3.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
        <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
          SK
        </div>
      </div>
    </header>
  );
}
