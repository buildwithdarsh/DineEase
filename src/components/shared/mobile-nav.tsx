"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  ClipboardList,
  User,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const bottomNavLinks = [
  { href: "/explore", label: "Home", icon: Home },
  { href: "/explore#search", label: "Search", icon: Search },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/cart", label: "Cart", icon: ShoppingCart, badge: 3 },
  { href: "/profile", label: "Profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {bottomNavLinks.map((link) => {
          const isActive =
            link.href === "/explore"
              ? pathname === "/explore" || pathname === "/"
              : pathname.startsWith(link.href.split("#")[0]);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] rounded-lg transition-colors active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <link.icon className="size-5" />
                {link.badge && (
                  <Badge className="absolute -top-1.5 -right-2.5 size-4 p-0 flex items-center justify-center text-[9px] font-bold">
                    {link.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none mt-0.5">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
