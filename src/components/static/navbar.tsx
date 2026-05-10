"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Chef", href: "#chef" },
  { label: "Events", href: "#events" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("dineease-theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("dineease-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("dineease-theme", "light");
      }
      return next;
    });
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 min-h-[44px]"
        >
          <span
            className={cn(
              "text-xl font-bold tracking-tight transition-colors",
              scrolled ? "text-primary" : "text-white"
            )}
          >
            Saffron & Sage
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center",
                scrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "min-h-[44px] min-w-[44px]",
              scrolled ? "" : "text-white hover:bg-white/10"
            )}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Button
            onClick={() => handleNavClick("#contact")}
            size="sm"
            className={cn(
              "hidden sm:inline-flex min-h-[44px]",
              !scrolled && "bg-white/20 text-white hover:bg-white/30 border-white/30"
            )}
          >
            Make an Inquiry
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "min-h-[44px] min-w-[44px]",
                      scrolled ? "" : "text-white hover:bg-white/10"
                    )}
                  />
                }
              >
                {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="px-4 py-3 text-left text-sm font-medium rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors min-h-[44px]"
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="mt-4 px-4">
                    <Button
                      onClick={() => handleNavClick("#contact")}
                      className="w-full min-h-[44px]"
                    >
                      Make an Inquiry
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
