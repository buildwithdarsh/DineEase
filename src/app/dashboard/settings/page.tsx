"use client";

import { Settings, Store, Clock, Bell, CreditCard, Shield, Globe, Printer, Users, Zap, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your restaurant profile, operations, and integrations</p>
      </div>

      <Tabs defaultValue="restaurant" className="w-full">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max sm:w-auto flex-nowrap">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
        </div>

        {/* Restaurant */}
        <TabsContent value="restaurant" className="space-y-6 mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Store className="size-4" /> Restaurant Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-sm">Restaurant Name</Label><Input defaultValue="Spice Route" className="mt-1.5 text-base sm:text-sm" /></div>
                <div><Label className="text-sm">Phone</Label><Input defaultValue="+91 80 2345 6789" className="mt-1.5 text-base sm:text-sm" /></div>
                <div><Label className="text-sm">Email</Label><Input defaultValue="eat@spiceroute.in" className="mt-1.5 text-base sm:text-sm" /></div>
                <div><Label className="text-sm">FSSAI License</Label><Input defaultValue="11522033000456" className="mt-1.5 text-base sm:text-sm" /></div>
              </div>
              <div><Label className="text-sm">Address</Label><Input defaultValue="18, Koramangala 5th Block, Bangalore 560095" className="mt-1.5 text-base sm:text-sm" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-sm">Cuisines</Label><Input defaultValue="North Indian, South Indian, Mughlai" className="mt-1.5 text-base sm:text-sm" /></div>
                <div><Label className="text-sm">Average Cost (for two)</Label><Input defaultValue="650" type="number" className="mt-1.5 text-base sm:text-sm" /></div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="size-4" /> Operating Hours</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
                    <span className="w-full sm:w-24 text-sm font-medium sm:font-normal">{day}</span>
                    <Input type="time" defaultValue="11:00" className="w-full sm:w-32 text-base sm:text-sm" />
                    <span className="text-sm text-muted-foreground hidden sm:inline">to</span>
                    <Input type="time" defaultValue="23:00" className="w-full sm:w-32 text-base sm:text-sm" />
                    <Badge variant="outline" className="text-[10px]">Open</Badge>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Update Hours</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations */}
        <TabsContent value="operations" className="space-y-6 mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Order Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Auto-Accept Orders</p><p className="text-xs text-muted-foreground">Automatically accept incoming orders</p></div>
                <div className="h-6 w-11 rounded-full bg-muted relative cursor-pointer"><div className="absolute top-1 left-1 size-4 rounded-full bg-muted-foreground/50 transition-all" /></div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Order Auto-Pause Threshold</p><p className="text-xs text-muted-foreground">Pause new orders when queue exceeds this count</p></div>
                <Input type="number" defaultValue={20} className="w-20 text-center" />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Default Prep Time (minutes)</p><p className="text-xs text-muted-foreground">Default preparation estimate for orders</p></div>
                <Input type="number" defaultValue={25} className="w-20 text-center" />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Delivery Radius (km)</p><p className="text-xs text-muted-foreground">Maximum delivery distance</p></div>
                <Input type="number" defaultValue={10} className="w-20 text-center" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Table Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm">Max Reservation Party Size</Label><Input type="number" defaultValue={20} className="mt-1.5" /></div>
                <div><Label className="text-sm">Booking Window (days)</Label><Input type="number" defaultValue={30} className="mt-1.5" /></div>
                <div><Label className="text-sm">No-Show Grace Period (min)</Label><Input type="number" defaultValue={15} className="mt-1.5" /></div>
                <div><Label className="text-sm">Average Turn Time (min)</Label><Input type="number" defaultValue={75} className="mt-1.5" /></div>
              </div>
              <Button>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bell className="size-4" /> Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "New Order Alerts", desc: "Sound + visual alert for new orders", enabled: true },
                { label: "Reservation Notifications", desc: "New booking and cancellation alerts", enabled: true },
                { label: "Low Stock Alerts", desc: "When inventory drops below par level", enabled: true },
                { label: "Review Notifications", desc: "Instant alert for new reviews", enabled: true },
                { label: "Negative Review Priority", desc: "Immediate alert for 1-2 star reviews", enabled: true },
                { label: "Daily Summary Email", desc: "End-of-day performance summary at 11 PM", enabled: false },
                { label: "Staff Schedule Reminders", desc: "Push notification 1 hour before shift", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className={`h-6 w-11 rounded-full relative cursor-pointer ${item.enabled ? "bg-primary" : "bg-muted"}`}>
                    <div className={`absolute top-1 size-4 rounded-full bg-white transition-all ${item.enabled ? "left-6" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><CreditCard className="size-4" /> Payment Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm">GST Number</Label><Input defaultValue="29AABCU9603R1ZM" className="mt-1.5" /></div>
                <div><Label className="text-sm">Bank Account (for payouts)</Label><Input defaultValue="**** **** **** 4521" className="mt-1.5" /></div>
              </div>
              <div className="space-y-3 mt-4">
                <h4 className="font-medium text-sm">Accepted Payment Methods</h4>
                {["UPI (GPay, PhonePe, Paytm)", "Credit/Debit Cards", "Cash on Delivery", "DineEase Wallet", "Corporate Cards"].map((method) => (
                  <div key={method} className="flex items-center justify-between py-1">
                    <span className="text-sm">{method}</span>
                    <div className="h-5 w-9 rounded-full bg-primary relative cursor-pointer"><div className="absolute top-0.5 left-4.5 size-4 rounded-full bg-white" /></div>
                  </div>
                ))}
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm mb-2">Service Charge</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-sm">Percentage</Label><Input type="number" defaultValue={10} className="mt-1.5" /></div>
                  <div><Label className="text-sm">Type</Label>
                    <select className="w-full mt-1.5 rounded-lg border bg-background px-3 py-2 text-sm"><option>Optional</option><option>Mandatory</option></select>
                  </div>
                </div>
              </div>
              <Button>Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Razorpay", desc: "Payment gateway", status: "connected" },
              { name: "MSG91", desc: "OTP & SMS", status: "connected" },
              { name: "Cloudinary", desc: "Image hosting & CDN", status: "connected" },
              { name: "Google Maps", desc: "Location & delivery tracking", status: "connected" },
              { name: "Thermal Printer", desc: "KOT & bill printing", status: "setup" },
              { name: "Zomato Sync", desc: "Menu & order aggregation", status: "not-connected" },
              { name: "Swiggy Sync", desc: "Menu & order aggregation", status: "not-connected" },
              { name: "Tally Export", desc: "Daily sales & GST export", status: "not-connected" },
            ].map((integration) => (
              <Card key={integration.name}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center"><Zap className="size-5 text-muted-foreground" /></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                  </div>
                  {integration.status === "connected" ? (
                    <Badge className="text-[10px] bg-green-100 text-green-800 border-0">Connected</Badge>
                  ) : integration.status === "setup" ? (
                    <Button size="sm" variant="outline" className="text-xs">Setup</Button>
                  ) : (
                    <Button size="sm" className="text-xs">Connect</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Subscription */}
        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Enterprise Plan</h3>
                  <p className="text-sm text-muted-foreground">INR 4,999/month | Billed annually</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-0 dark:bg-purple-900 dark:text-purple-300">Current Plan</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Commission Rate", value: "12%" },
                  { label: "KDS Screens", value: "Unlimited" },
                  { label: "Staff Accounts", value: "Unlimited + Payroll" },
                  { label: "Multi-Outlet", value: "Unlimited" },
                  { label: "Analytics", value: "Custom Reports + API" },
                  { label: "CRM & Loyalty", value: "Yes + White-label" },
                  { label: "Dedicated Manager", value: "Yes" },
                  { label: "Support", value: "24/7 Dedicated" },
                ].map((feature) => (
                  <div key={feature.label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{feature.label}</p>
                    <p className="text-sm font-semibold">{feature.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
