"use client";

import { restaurantInfo } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { Camera } from "lucide-react";

function ZomatoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5h-9c-.28 0-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v6c0 .28-.22.5-.5.5z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Chef", href: "#chef" },
  { label: "Events", href: "#events" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card pb-16 lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Logo & Tagline */}
          <div>
            <h3 className="text-lg font-bold text-primary">
              {restaurantInfo.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {restaurantInfo.tagline}
            </p>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {restaurantInfo.cuisine} in the heart of Bangalore.
              Reservations recommended.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href={restaurantInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Camera className="size-5" />
              </a>
              <a
                href={restaurantInfo.socials.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Zomato"
              >
                <ZomatoIcon className="size-5" />
              </a>
              <a
                href={restaurantInfo.socials.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Google"
              >
                <GoogleIcon className="size-5" />
              </a>
            </div>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a
                href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
                className="block hover:text-primary transition-colors min-h-[44px] flex items-center"
              >
                {restaurantInfo.phone}
              </a>
              <a
                href={`mailto:${restaurantInfo.email}`}
                className="block hover:text-primary transition-colors min-h-[44px] flex items-center"
              >
                {restaurantInfo.email}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights
            reserved.
          </p>
          <p>
            Powered by{" "}
            <a
              href="https://build.withdarsh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Darsh Gupta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
