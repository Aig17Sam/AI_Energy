"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type ComparisonProduct = {
  slug: string;
  name: string;
  brand: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

export function ComparisonTableCarousel({
  currentProduct,
  compareProducts,
  clearHref
}: {
  currentProduct: ComparisonProduct;
  compareProducts: ComparisonProduct[];
  clearHref: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<"next" | "previous">("next");
  const [ghostProduct, setGhostProduct] = useState<ComparisonProduct | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActiveIndex((current) => (current >= compareProducts.length ? 0 : current));
  }, [compareProducts]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeProduct = compareProducts[activeIndex];
  const enterAnimationClass =
    animationDirection === "next" ? "comparison-panel-enter-next" : "comparison-panel-enter-previous";
  const ghostAnimationClass =
    animationDirection === "next" ? "comparison-panel-ghost-next" : "comparison-panel-ghost-previous";

  function queueGhost(direction: "next" | "previous") {
    setAnimationDirection(direction);
    setGhostProduct(activeProduct);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setGhostProduct(null);
      timeoutRef.current = null;
    }, 520);
  }

  function showPrevious() {
    queueGhost("previous");
    setActiveIndex((current) => (current === 0 ? compareProducts.length - 1 : current - 1));
  }

  function showNext() {
    queueGhost("next");
    setActiveIndex((current) => (current === compareProducts.length - 1 ? 0 : current + 1));
  }

  function renderPanel(compareProduct: ComparisonProduct) {
    return (
      <>
        <div className="grid border-b border-slate-200 bg-slate-50 md:grid-cols-[220px_1fr_1fr]">
          <div className="p-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Specification</div>
          <div className="border-t border-slate-200 p-5 md:border-l md:border-t-0">
            <div className="text-sm font-bold uppercase tracking-[0.12em] text-energy-green">{currentProduct.brand}</div>
            <div className="mt-1 text-2xl font-black text-ink">{currentProduct.name}</div>
          </div>
          <div className="border-t border-slate-200 p-5 md:border-l md:border-t-0">
            <div className="text-sm font-bold uppercase tracking-[0.12em] text-energy-green">{compareProduct.brand}</div>
            <div className="mt-1 text-2xl font-black text-ink">{compareProduct.name}</div>
          </div>
        </div>

        {currentProduct.rows.map((row, index) => (
          <div key={row.label} className="grid border-b border-slate-200 last:border-b-0 md:grid-cols-[220px_1fr_1fr]">
            <div className="bg-slate-50 p-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{row.label}</div>
            <div className="border-t border-slate-200 p-5 font-semibold text-ink md:border-l md:border-t-0">{row.value}</div>
            <div className="border-t border-slate-200 p-5 font-semibold text-ink md:border-l md:border-t-0">
              {compareProduct.rows[index]?.value || ""}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <section id="comparison" className="section-pad border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Comparison</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Compare products side by side</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {compareProducts.length > 1 ? (
              <div className="min-w-[92px] text-center text-base font-black tracking-[0.04em] text-slate-700">
                {activeIndex + 1} / {compareProducts.length}
              </div>
            ) : null}
            <Link href={clearHref} className="button-secondary">
              Clear comparison
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative">
          {compareProducts.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-[115%] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-soft transition hover:border-slate-300 hover:text-ink md:flex"
                onClick={showPrevious}
                aria-label="Show previous comparison product"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-[115%] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-soft transition hover:border-slate-300 hover:text-ink md:flex"
                onClick={showNext}
                aria-label="Show next comparison product"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </>
          ) : null}

          <div className="comparison-panel-shell relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {ghostProduct ? (
              <div className={`comparison-panel-ghost absolute inset-0 bg-white ${ghostAnimationClass}`} aria-hidden>
                {renderPanel(ghostProduct)}
              </div>
            ) : null}

            <div key={activeProduct.slug} className={`comparison-panel-current relative z-[1] bg-white ${enterAnimationClass}`}>
              {renderPanel(activeProduct)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
