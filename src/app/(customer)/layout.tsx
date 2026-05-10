import { CustomerNav } from "@/components/shared/customer-nav";
import { MobileBottomNav } from "@/components/shared/mobile-nav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomerNav />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <footer className="border-t bg-muted/30 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-sm mb-3">DineEase</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">For Diners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/loyalty" className="hover:text-foreground transition-colors">DineEase Plus</a></li>
                <li><a href="/gift-cards" className="hover:text-foreground transition-colors">Gift Cards</a></li>
                <li><a href="/loyalty" className="hover:text-foreground transition-colors">Loyalty Program</a></li>
                <li><a href="/corporate" className="hover:text-foreground transition-colors">Corporate Dining</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">For Restaurants</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/partner" className="hover:text-foreground transition-colors">Partner with Us</a></li>
                <li><a href="/dashboard" className="hover:text-foreground transition-colors">Business Dashboard</a></li>
                <li><a href="/pricing" className="hover:text-foreground transition-colors">Pricing Plans</a></li>
                <li><a href="/api" className="hover:text-foreground transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="/safety" className="hover:text-foreground transition-colors">Safety</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
            &copy; 2026 DineEase by Darsh Gupta. All rights reserved. FSSAI Lic: 11522033000001
          </div>
        </div>
      </footer>
      <MobileBottomNav />
    </>
  );
}
