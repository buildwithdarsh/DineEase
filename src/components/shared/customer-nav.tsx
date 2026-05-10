"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Menu,
  X,
  UtensilsCrossed,
  Heart,
  Clock,
  CalendarDays,
  Award,
  MapPin,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/orders", label: "Orders", icon: Clock },
  { href: "/reservations", label: "Reservations", icon: CalendarDays },
  { href: "/loyalty", label: "Rewards", icon: Award },
];

export function CustomerNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  function toggleDark() {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link href="/explore" className="flex items-center gap-2 mr-6">
          <UtensilsCrossed className="size-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Dine<span className="text-primary">Ease</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
                size="sm"
                className="gap-1.5"
              >
                <link.icon className="size-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Location - visible on mobile too as compact badge */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2 md:mr-4">
          <MapPin className="size-3.5" />
          <span className="hidden sm:inline">Bangalore</span>
          <span className="sm:hidden text-xs">BLR</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleDark} className="min-w-[44px] min-h-[44px]">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Cart - hidden on mobile (bottom nav handles it) */}
          <Link href="/cart" className="hidden md:inline-flex">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="size-4" />
              <Badge className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="relative min-w-[44px] min-h-[44px]">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </Button>

          {/* Dashboard link - desktop only */}
          <Link href="/dashboard" className="hidden md:inline-flex">
            <Button variant="ghost" size="icon">
              <UtensilsCrossed className="size-4" />
            </Button>
          </Link>

          {/* Profile - hidden on mobile (bottom nav handles it) */}
          <Link href="/profile" className="hidden md:inline-flex">
            <Button variant="ghost" size="icon">
              <User className="size-4" />
            </Button>
          </Link>

          {/* Mobile sheet menu for extra options */}
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg min-w-[44px] min-h-[44px] hover:bg-muted transition-colors md:hidden">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full rounded-t-2xl max-h-[80vh]">
              <div className="mx-auto w-10 h-1 rounded-full bg-muted-foreground/30 mb-4 mt-1" />
              <nav className="flex flex-col gap-1 pb-safe">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 h-12 text-base"
                    >
                      <link.icon className="size-5" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 text-base mt-2">
                    <UtensilsCrossed className="size-5" />
                    Business Dashboard
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
