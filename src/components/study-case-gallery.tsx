"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type StudyCase = {
  title: string;
  description: string;
  images: string[];
};

type StudyCaseGalleryProps = {
  studyCases: StudyCase[];
};

export function StudyCaseGallery({ studyCases }: StudyCaseGalleryProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeCase = activeCaseIndex === null ? null : studyCases[activeCaseIndex];

  const closeModal = useCallback(() => {
    setActiveCaseIndex(null);
    setActiveImageIndex(0);
  }, []);

  const openModal = (index: number) => {
    setActiveCaseIndex(index);
    setActiveImageIndex(0);
  };

  const showPreviousImage = useCallback(() => {
    if (!activeCase) return;
    setActiveImageIndex((currentIndex) => (currentIndex === 0 ? activeCase.images.length - 1 : currentIndex - 1));
  }, [activeCase]);

  const showNextImage = useCallback(() => {
    if (!activeCase) return;
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % activeCase.images.length);
  }, [activeCase]);

  useEffect(() => {
    if (!activeCase) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCase, closeModal, showNextImage, showPreviousImage]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studyCases.map((studyCase, index) => (
          <button
            key={studyCase.title}
            type="button"
            onClick={() => openModal(index)}
            className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_70px_rgba(16,32,43,0.16)] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={studyCase.images[0]}
                alt={studyCase.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-black text-ink">{studyCase.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{studyCase.description}</p>
            </div>
          </button>
        ))}
      </div>

      {activeCase ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close study case gallery"
            className="absolute inset-0 cursor-default"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 md:px-5">
              <div>
                <h2 className="text-lg font-black text-ink md:text-xl">{activeCase.title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {activeImageIndex + 1} / {activeCase.images.length}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close gallery"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-ink transition hover:bg-slate-50"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            <div className="relative bg-[#07110f]">
              <div className="relative h-[min(72vh,720px)] w-full bg-[#07110f]">
                <Image
                  src={activeCase.images[activeImageIndex]}
                  alt={`${activeCase.title} photo ${activeImageIndex + 1}`}
                  fill
                  sizes="min(100vw, 1024px)"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                aria-label="Previous photo"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/90 text-ink shadow-soft transition hover:bg-white"
              >
                <ChevronLeft size={24} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/90 text-ink shadow-soft transition hover:bg-white"
              >
                <ChevronRight size={24} aria-hidden />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-slate-200 bg-white p-3">
              {activeCase.images.map((imageUrl, index) => (
                <button
                  key={imageUrl}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
                    index === activeImageIndex ? "border-energy-green" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={imageUrl} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
