"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroCarouselSlide } from "@/lib/hero-slides";

export function HeroProductPreview({ slides }: { slides: HeroCarouselSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/20 bg-black/25 p-2 shadow-2xl backdrop-blur-xl">
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/10">
      {slides.map((slide, index) => <Image key={slide.id} src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="(min-width: 1280px) 720px, 56vw" className={`object-contain p-2 transition duration-700 ${index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />)}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <span className="absolute bottom-4 right-4 rounded-full bg-black/35 px-3 py-1 text-xs font-bold tabular-nums text-white backdrop-blur">
        {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
    <div className="flex items-center justify-center gap-1.5 px-3 py-3">
      {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-emerald-300" : "w-1.5 bg-white/35 hover:bg-white/70"}`} aria-label={`Show featured solution ${index + 1}`} />)}
    </div>
  </div>;
}
