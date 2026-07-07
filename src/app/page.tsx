import Link from "next/link";
import { ArrowRight, Home, SunMedium } from "lucide-react";

import { HeroImageCarousel } from "@/components/hero-image-carousel";
import { ProductCard } from "@/components/product-card";
import { StcCalculator } from "@/components/stc-calculator";
import { getHeroSlides } from "@/lib/hero-slides";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, heroSlides] = await Promise.all([getFeaturedProducts(), getHeroSlides()]);

  return (
    <>
      <section className="bg-white">
        <div className="container-shell grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
              <SunMedium size={17} aria-hidden />
              Australian solar battery storage specialists
            </div>
            <h1 className="text-5xl font-black leading-[1.03] tracking-normal text-ink md:text-7xl">
              AI Energy DEV
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
              Professional solar battery guidance for homes and small businesses wanting smarter storage, clearer
              pricing, and reliable backup power.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="button-primary">
                View battery products
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/contact" className="button-secondary">
                Request a quote
              </Link>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["10+ yrs", "Warranty options"],
                ["AU", "Customer focus"],
                ["Fast", "Inquiry response"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-2xl font-black text-ink">{value}</dt>
                  <dd className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroImageCarousel slides={heroSlides} />
        </div>
      </section>

      <section className="section-pad bg-mist-blue">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Featured products</p>
              <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">Solar batteries customers can compare</h2>
            </div>
            <Link href="/products" className="button-secondary">
              All products
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <StcCalculator />

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="container-shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-energy-green">
              <Home size={20} aria-hidden />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">Ready for quotes</span>
            </div>
            <h2 className="text-3xl font-black text-ink">Turn product interest into qualified inquiries.</h2>
          </div>
          <Link href="/contact" className="button-primary">
            Start an inquiry
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
