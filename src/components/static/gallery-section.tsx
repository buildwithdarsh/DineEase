"use client";

import { useState } from "react";
import Image from "next/image";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { galleryImages } from "@/lib/mock-data";
import { GallerySkeleton } from "./skeleton-sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryTab } from "@/types";

const tabs: { id: GalleryTab; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "ambiance", label: "Ambiance" },
  { id: "events", label: "Events" },
  { id: "kitchen", label: "Kitchen" },
];

export function GallerySection() {
  // This is the "slow response" section per requirements (1800-2500ms)
  const isLoading = useSimulatedLoading(2200);
  const [activeTab, setActiveTab] = useState<GalleryTab>("food");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (isLoading) return <GallerySkeleton />;

  const filteredImages = galleryImages.filter(
    (img) => img.category === activeTab
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Visual Journey
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 text-muted-foreground">
            A glimpse into the world of Saffron & Sage
          </p>
        </div>

        {/* Tabs with 44px touch targets */}
        <div className="mb-10 flex justify-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-5 py-2.5 text-sm font-medium transition-all min-h-[44px]",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border text-muted-foreground hover:text-foreground hover:bg-card/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative block w-full overflow-hidden rounded-xl min-h-[44px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs font-medium text-white">{image.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent
          className="max-w-4xl p-0 bg-black/95 border-none overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>
          <DialogDescription className="sr-only">
            {lightboxIndex !== null ? filteredImages[lightboxIndex]?.alt : "Gallery image viewer"}
          </DialogDescription>
          {lightboxIndex !== null && filteredImages[lightboxIndex] && (
            <div className="relative">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                width={filteredImages[lightboxIndex].width}
                height={filteredImages[lightboxIndex].height}
                className="w-full object-contain max-h-[80vh]"
                sizes="(max-width: 1200px) 100vw, 900px"
              />

              {/* Navigation - 44px touch targets */}
              <Button
                variant="ghost"
                size="icon"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeft className="size-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 min-h-[44px] min-w-[44px]"
              >
                <ChevronRight className="size-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute top-2 right-2 text-white hover:bg-white/20 min-h-[44px] min-w-[44px]"
              >
                <X className="size-5" />
              </Button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm text-white/90">
                  {filteredImages[lightboxIndex].alt}
                </p>
                <p className="text-xs text-white/50 mt-1">
                  {lightboxIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
