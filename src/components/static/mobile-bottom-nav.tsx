"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  UtensilsCrossed,
  Image as ImageIcon,
  MessageSquare,
  Phone,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#top", icon: Home },
  { label: "Menu", href: "#menu", icon: UtensilsCrossed },
  { label: "Gallery", href: "#gallery", icon: ImageIcon },
  { label: "Reviews", href: "#testimonials", icon: MessageSquare },
  { label: "Contact", href: "#contact", icon: Phone },
];

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("#top");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine active section
      const sections = ["contact", "testimonials", "gallery", "menu", "top"];
      for (const id of sections) {
        const el = id === "top" ? document.body : document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t shadow-lg transition-transform duration-300 lg:hidden safe-area-bottom",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href;
          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "stroke-[2.5]")} />
              <span className={cn("text-[10px] leading-tight", isActive ? "font-semibold" : "font-medium")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
