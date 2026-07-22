"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { HeroCarouselSlide } from "@/lib/hero-slides";

const SLIDE_INTERVAL_MS = 5000;

export function HeroImageCarousel({ slides }: { slides: HeroCarouselSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex] || slides[0];

  if (!activeSlide) return null;

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % slides.length);
  }

  const imageLayers = slides.map((slide, index) => (
    <Image
      key={slide.src}
      src={slide.src}
      alt={slide.alt}
      fill
      priority={index === 0}
      className={`object-cover transition duration-700 ease-out ${
        index === activeIndex ? "z-10 translate-x-0 scale-100 opacity-100" : "z-0 translate-x-3 scale-105 opacity-0"
      }`}
      sizes="(min-width: 1024px) 46vw, 100vw"
    />
  ));

  return (
    <div className="relative min-h-[72vh] overflow-hidden bg-[#101a17]">
      {activeSlide.href ? (
        <Link
          href={activeSlide.href}
          className="absolute inset-0 z-10 block"
          aria-label={activeSlide.alt}
          target="_blank"
          rel="noopener noreferrer"
        >
          {imageLayers}
        </Link>
      ) : (
        imageLayers
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div className="pointer-events-none absolute bottom-10 left-8 z-20 max-w-xl text-white md:bottom-16 md:left-16">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-emerald-300">Designed around your life</p>
        <h2 className="mt-4 text-4xl font-medium leading-none tracking-[-.045em] md:text-7xl">Power in motion.</h2>
      </div>
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute right-20 top-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-black"
            onClick={showPrevious}
            aria-label="Show previous image"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            className="absolute right-6 top-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-black"
            onClick={showNext}
            aria-label="Show next image"
          >
            <ChevronRight size={22} aria-hidden />
          </button>
        </>
      ) : null}

      {slides.length > 1 ? (
        <div className="absolute bottom-10 right-8 z-30 flex gap-2 md:bottom-16 md:right-16">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-7 bg-energy-green" : "w-2.5 bg-white/55 hover:bg-white"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
