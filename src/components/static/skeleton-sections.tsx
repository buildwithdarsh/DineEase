"use client";

export function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full bg-muted animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
        <div className="h-6 w-48 rounded bg-muted-foreground/10" />
        <div className="h-14 w-80 rounded bg-muted-foreground/10" />
        <div className="h-5 w-64 rounded bg-muted-foreground/10" />
        <div className="h-11 w-44 rounded-lg bg-muted-foreground/10" />
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-8 w-64 rounded bg-muted animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
          <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MenuSkeleton() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-40 rounded bg-muted animate-pulse" />
          <div className="h-8 w-56 rounded bg-muted animate-pulse" />
        </div>
        <div className="flex gap-3 mb-8 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-32 rounded-lg bg-muted animate-pulse shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
          <div className="h-8 w-48 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-muted animate-pulse"
              style={{ height: i % 3 === 0 ? 300 : i % 3 === 1 ? 200 : 250 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChefSkeleton() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-96 rounded-xl bg-muted animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
            <div className="h-8 w-56 rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-36 rounded bg-muted animate-pulse" />
          <div className="h-8 w-52 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSkeleton() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-44 rounded bg-muted animate-pulse" />
          <div className="h-8 w-64 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-96 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl max-w-2xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-36 rounded bg-muted animate-pulse" />
          <div className="h-8 w-56 rounded bg-muted animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-8 w-48 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="h-80 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    </section>
  );
}
