"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  ChevronRight,
  Award,
  Settings,
  HelpCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers } from "@/lib/platform-data";
import { DietaryBadge } from "@/components/shared/dietary-badge";

const user = customers[0]; // Rahul Sharma

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", description: "Name, email, phone" },
      { icon: MapPin, label: "Saved Addresses", description: "2 addresses saved" },
      { icon: CreditCard, label: "Payment Methods", description: "UPI, cards, wallet" },
      { icon: Bell, label: "Notification Preferences", description: "Push, SMS, email settings" },
    ],
  },
  {
    title: "Dining",
    items: [
      { icon: Heart, label: "Favorites", description: "5 restaurants, 12 dishes" },
      { icon: AlertTriangle, label: "Dietary Profile", description: "Allergies & preferences" },
      { icon: Award, label: "DineEase Plus", description: "Subscribe for exclusive perks" },
    ],
  },
  {
    title: "More",
    items: [
      { icon: HelpCircle, label: "Help & Support", description: "FAQs, chat, call" },
      { icon: FileText, label: "Terms & Privacy", description: "Legal information" },
      { icon: Shield, label: "Data & Privacy", description: "Download or delete your data" },
      { icon: Settings, label: "App Settings", description: "Language, dark mode" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Profile</h1>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-purple-50 text-purple-700 border-0 dark:bg-purple-950 dark:text-purple-400">
                  <Award className="size-3 mr-0.5" /> Platinum Member
                </Badge>
                <span className="text-xs text-muted-foreground">{user.loyaltyPoints} points</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{user.totalOrders}</p>
              <p className="text-xs text-muted-foreground">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold">INR {(user.totalSpend / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.favoriteItems.length}</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Preferences */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user.dietaryPreferences.map((pref) => (
              <DietaryBadge key={pref} tag={pref} />
            ))}
            {user.allergens.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-5" />
                {user.allergens.map((a) => (
                  <Badge key={a} variant="outline" className="text-orange-600 border-orange-300 text-xs">
                    <AlertTriangle className="size-3 mr-0.5" /> {a}
                  </Badge>
                ))}
              </>
            )}
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Favorite Items</h4>
            <div className="flex flex-wrap gap-1.5">
              {user.favoriteItems.map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-1">{section.title}</h3>
          <Card>
            <CardContent className="p-0 divide-y">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 active:bg-muted transition-colors min-h-[56px]"
                  role="link"
                  tabIndex={0}
                  aria-label={item.label}
                >
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}

      <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive h-12 text-base active:scale-[0.98]">
        <LogOut className="size-4" /> Sign Out
      </Button>
    </div>
  );
}
