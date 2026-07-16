"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

type CompareOption = {
  slug: string;
  name: string;
  brand: string;
  isSelected: boolean;
};

export function CompareProductPicker({
  currentSlug,
  options
}: {
  currentSlug: string;
  options: CompareOption[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(options.filter((option) => option.isSelected).map((option) => option.slug));

  useEffect(() => {
    setSelectedSlugs(options.filter((option) => option.isSelected).map((option) => option.slug));
  }, [options]);

  const selectedCount = selectedSlugs.length;
  const summaryLabel = useMemo(() => {
    if (selectedCount === 0) return "Compare products";
    if (selectedCount === 1) return "1 product selected";
    return `${selectedCount} products selected`;
  }, [selectedCount]);

  function toggleSelection(slug: string) {
    setSelectedSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  }

  function applySelection() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("compare");
    selectedSlugs.forEach((slug) => params.append("compare", slug));

    const query = params.toString();
    const href = query ? `${pathname}?${query}#comparison` : `/products/${currentSlug}`;
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    router.push(href);
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="button-secondary cursor-pointer list-none pr-4">
        {summaryLabel}
        <ChevronDown size={18} aria-hidden className="transition group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-[340px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Choose products</div>
        </div>
        <div className="max-h-[320px] overflow-y-auto p-2">
          {options.map((option) => {
            const checked = selectedSlugs.includes(option.slug);

            return (
              <label
                key={option.slug}
                className="flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-sm transition hover:bg-slate-50"
              >
                <div>
                  <div className="font-bold text-ink">{option.name}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{option.brand}</div>
                </div>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border transition ${
                    checked ? "border-energy-green bg-energy-green text-white" : "border-slate-300 bg-white text-transparent"
                  }`}
                  aria-hidden
                >
                  <Check size={14} />
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleSelection(option.slug)}
                />
              </label>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {selectedCount ? `${selectedCount} selected` : "No products selected"}
          </div>
          <button type="button" className="button-primary h-10 px-4 text-sm" onClick={applySelection}>
            Apply
          </button>
        </div>
      </div>
    </details>
  );
}
