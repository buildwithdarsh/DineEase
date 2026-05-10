"use client";

import { useState } from "react";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { restaurantInfo } from "@/lib/mock-data";
import { ContactSkeleton } from "./skeleton-sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { InquiryType } from "@/types";

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: "general", label: "General Inquiry" },
  { value: "reservation", label: "Reservation" },
  { value: "private-dining", label: "Private Dining" },
  { value: "catering", label: "Catering" },
  { value: "feedback", label: "Feedback" },
];

export function ContactSection() {
  // Page load delay: 800-1200ms
  const isLoading = useSimulatedLoading(850);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "" as InquiryType | "",
    message: "",
  });

  if (isLoading) return <ContactSkeleton />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with 400-700ms delay
    await new Promise((resolve) => setTimeout(resolve, 550));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-3 text-muted-foreground">
            We would love to hear from you. Reach out for reservations, event inquiries, or just to say hello.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Thank You!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Your inquiry has been received. Our team will get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: (e.target as HTMLInputElement).value,
                        }))
                      }
                      required
                      className="min-h-[44px]"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: (e.target as HTMLInputElement).value,
                          }))
                        }
                        required
                        className="min-h-[44px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: (e.target as HTMLInputElement).value,
                          }))
                        }
                        required
                        className="min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">
                      Inquiry Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          inquiryType: value as InquiryType,
                        }))
                      }
                      required
                    >
                      <SelectTrigger id="inquiry-type" className="w-full min-h-[44px]">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your inquiry, preferred date and time, number of guests..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: (e.target as HTMLTextAreaElement).value,
                        }))
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 min-h-[44px]"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Address</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {restaurantInfo.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Phone</h4>
                <a
                  href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
                  className="mt-1 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Email</h4>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="mt-1 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Hours</h4>
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Lunch:</span>{" "}
                    {restaurantInfo.hours.lunch}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Dinner:</span>{" "}
                    {restaurantInfo.hours.dinner}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Open Tuesday through Sunday. Closed on Mondays.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Map Embed */}
            <div className="overflow-hidden rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5561891853247!2d77.6119!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzYnNDIuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
