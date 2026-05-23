import Image from "next/image";
import Link from "next/link";
import { Battery, ShieldCheck, Zap } from "lucide-react";
import type { Product } from "@prisma/client";

import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-mist-blue">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
          ) : (
            <div className="flex h-full items-center justify-center text-energy-green">
              <Battery size={64} aria-hidden />
            </div>
          )}
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-energy-green">{product.brand}</p>
          <h2 className="mt-1 text-xl font-black text-ink">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-slate-50 p-3">
            <Battery className="mb-1 text-energy-green" size={18} aria-hidden />
            <div className="font-bold">{product.capacity}</div>
            <div className="text-slate-500">Capacity</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <ShieldCheck className="mb-1 text-energy-green" size={18} aria-hidden />
            <div className="font-bold">{product.warrantyYears ?? "Ask"} years</div>
            <div className="text-slate-500">Warranty</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">From</div>
            <div className="text-2xl font-black text-ink">{formatCurrency(product.price.toString())}</div>
          </div>
          <Link href={`/contact?product=${product.id}`} className="button-primary text-sm">
            <Zap size={16} aria-hidden />
            Make inquiry
          </Link>
        </div>
      </div>
    </article>
  );
}
