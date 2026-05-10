"use client";

import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { faqItems } from "@/lib/mock-data";
import { FAQSkeleton } from "./skeleton-sections";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQSection() {
  // Lazy load delay: 300-500ms
  const isLoading = useSimulatedLoading(450);

  if (isLoading) return <FAQSkeleton />;

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Common Questions
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know before your visit
          </p>
        </div>

        {/* FAQ Accordion - 44px touch targets on triggers */}
        <Accordion>
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="min-h-[44px] py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
