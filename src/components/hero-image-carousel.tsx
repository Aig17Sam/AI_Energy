"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
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

  const hasCaption = Boolean(activeSlide.title || activeSlide.text);

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
    <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-white shadow-soft">
      {activeSlide.href ? (
        <Link
          href={activeSlide.href}
          className="absolute inset-0 z-10 block"
          aria-label={activeSlide.title || activeSlide.alt}
          target="_blank"
          rel="noopener noreferrer"
        >
          {imageLayers}
        </Link>
      ) : (
        imageLayers
      )}

      {hasCaption ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 text-white">
          <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-energy-green text-ink">
                <Zap size={20} aria-hidden />
              </span>
              <div>
                {activeSlide.title ? <p className="font-black">{activeSlide.title}</p> : null}
                {activeSlide.text ? <p className="text-sm text-slate-200">{activeSlide.text}</p> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-ink/45 text-white shadow-sm backdrop-blur transition hover:bg-ink/70"
            onClick={showPrevious}
            aria-label="Show previous image"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-ink/45 text-white shadow-sm backdrop-blur transition hover:bg-ink/70"
            onClick={showNext}
            aria-label="Show next image"
          >
            <ChevronRight size={22} aria-hidden />
          </button>
        </>
      ) : null}

      {slides.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
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
