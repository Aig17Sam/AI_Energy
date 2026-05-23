import type { Metadata } from "next";

import { ProductCard } from "@/components/product-card";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Solar Battery Products and Prices",
  description:
    "Compare solar battery prices, storage capacity, chemistry, warranties, and product specifications with AI Energy Australia."
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <section className="section-pad bg-mist-blue">
      <div className="container-shell">
        <div className="mb-8 max-w-3xl">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Product range</p>
          <h1 className="mt-2 text-4xl font-black text-ink md:text-5xl">Solar battery prices and specifications</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Browse home solar battery storage options, compare capacity and warranty details, then send an inquiry for
            installation guidance or a tailored quote.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
