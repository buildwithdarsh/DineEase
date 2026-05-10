"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  Percent,
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  ChevronRight,
  MapPin,
  Clock,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DietaryBadge } from "@/components/shared/dietary-badge";
import { platformMenuItems } from "@/lib/platform-data";

const initialCart = [
  { item: platformMenuItems[1], qty: 1, variant: "Full", addons: ["Butter Naan"] },
  { item: platformMenuItems[13], qty: 1, variant: undefined, addons: ["Butter Naan"] },
  { item: platformMenuItems[9], qty: 2, variant: "Large", addons: [] },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [tip, setTip] = useState(0);
  const [instructions, setInstructions] = useState("");

  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const deliveryFee = 40;
  const discount = couponApplied ? Math.min(100, subtotal * 0.5) : 0;
  const total = subtotal + tax + deliveryFee - discount + tip;

  function updateQty(index: number, delta: number) {
    setCart((prev) =>
      prev
        .map((c, i) => (i === index ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0)
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="size-16 text-muted-foreground/20 mb-4" />
        <h1 className="text-xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground text-sm mb-6">Add items from a restaurant to get started</p>
        <Link href="/explore">
          <Button>Browse Restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4 sm:py-8">
      <Link href="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 min-h-[44px]">
        <ArrowLeft className="size-3.5" /> Back to restaurants
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Restaurant Header */}
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <img src="https://picsum.photos/id/65/60/60" alt="Spice Route restaurant" className="size-12 rounded-lg object-cover" />
              <div>
                <h3 className="font-semibold">Spice Route</h3>
                <p className="text-xs text-muted-foreground">Koramangala, Bangalore</p>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardContent className="p-4 divide-y">
              {cart.map((cartItem, index) => (
                <div key={index} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <DietaryBadge tag={cartItem.item.dietaryTag} />
                    </div>
                    <h4 className="text-sm font-medium">
                      {cartItem.item.name}
                      {cartItem.variant && <span className="text-muted-foreground"> ({cartItem.variant})</span>}
                    </h4>
                    {cartItem.addons.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        + {cartItem.addons.join(", ")}
                      </p>
                    )}
                    <p className="text-sm font-medium mt-0.5">INR {cartItem.item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => updateQty(index, -1)}
                        className="min-w-[36px] min-h-[36px]"
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {cartItem.qty}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => updateQty(index, 1)}
                        className="min-w-[36px] min-h-[36px]"
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-semibold w-16 text-right">
                      INR {cartItem.item.price * cartItem.qty}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-2">Special Instructions</h3>
              <Textarea
                placeholder="Any special requests? E.g., less spicy, no onions..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="text-base sm:text-sm"
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Tip */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-2">Tip for delivery partner</h3>
              <div className="flex gap-2 flex-wrap">
                {[0, 20, 30, 50].map((amount) => (
                  <Button
                    key={amount}
                    variant={tip === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTip(amount)}
                    className="min-h-[44px] flex-1 sm:flex-initial active:scale-95"
                  >
                    {amount === 0 ? "No tip" : `INR ${amount}`}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Delivery Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">Delivering to</p>
                  <p className="text-xs text-muted-foreground">123, 4th Cross, HSR Layout</p>
                </div>
                <Button variant="ghost" size="sm">Change</Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-muted-foreground" />
                <span>Estimated delivery: 25-30 min</span>
              </div>
            </CardContent>
          </Card>

          {/* Coupon */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Percent className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="pl-8 text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (coupon.toUpperCase() === "DINE50") setCouponApplied(true);
                  }}
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 mt-2">
                  DINE50 applied - Saving INR {discount}!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Bill */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Total</span>
                <span>INR {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (5%)</span>
                <span>INR {tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>INR {deliveryFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- INR {discount}</span>
                </div>
              )}
              {tip > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tip</span>
                  <span>INR {tip}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>INR {total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-semibold mb-2">Payment Method</h3>
              {[
                { icon: Smartphone, label: "UPI (GPay, PhonePe)", selected: true },
                { icon: CreditCard, label: "Credit/Debit Card", selected: false },
                { icon: Wallet, label: "DineEase Wallet (INR 2,450)", selected: false },
                { icon: Banknote, label: "Cash on Delivery", selected: false },
              ].map((method) => (
                <div
                  key={method.label}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors min-h-[48px] active:scale-[0.98] ${
                    method.selected ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <method.icon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{method.label}</span>
                  {method.selected && (
                    <div className="ml-auto size-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="size-1.5 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Desktop place order */}
          <div className="hidden lg:block">
            <Button className="w-full h-12 text-base font-semibold">
              Place Order - INR {total}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t lg:hidden safe-area-bottom">
        <Button className="w-full h-12 text-base font-semibold active:scale-[0.98] transition-transform">
          Place Order - INR {total}
        </Button>
      </div>
      {/* Extra padding for the sticky CTA */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
