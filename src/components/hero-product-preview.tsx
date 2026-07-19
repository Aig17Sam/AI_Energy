"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

  return <div className="w-full max-w-[540px] overflow-hidden rounded-2xl border border-white/20 bg-black/25 p-2 shadow-2xl backdrop-blur-xl">
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10">
      {slides.map((slide, index) => <Image key={slide.id} src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="540px" className={`object-cover transition duration-700 ${index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />)}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white">
        <div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-emerald-300">Featured solutions</p><p className="mt-1 max-w-[250px] text-sm font-semibold leading-5">{slides[activeIndex]?.alt}</p></div>
        <span className="text-xs font-bold tabular-nums">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
    <div className="flex items-center justify-between gap-4 px-3 py-3 text-white">
      <div className="flex gap-1.5">{slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-emerald-300" : "w-1.5 bg-white/35 hover:bg-white/70"}`} aria-label={`Show featured solution ${index + 1}`} />)}</div>
      <Link href="/products" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] hover:text-emerald-300">View products <ArrowRight size={14} /></Link>
    </div>
  </div>;
}
