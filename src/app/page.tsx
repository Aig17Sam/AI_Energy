import Link from "next/link";
import { ArrowRight, BadgePercent, Home, Newspaper, SunMedium, Zap } from "lucide-react";

import { HeroImageCarousel } from "@/components/hero-image-carousel";
import { ProductCard } from "@/components/product-card";
import { StcCalculator } from "@/components/stc-calculator";
import { getHeroSlides } from "@/lib/hero-slides";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const highlights = [
  {
    label: "Limited offer",
    title: "Seasonal battery package discounts",
    description:
      "Ask about current pricing on selected home battery systems and installation-ready storage packages.",
    href: "/contact",
    cta: "Request pricing",
    Icon: BadgePercent
  },
  {
    label: "Energy update",
    title: "Battery rebates and STC guidance",
    description:
      "Get practical advice on incentives, eligibility, and how storage can improve your solar payback.",
    href: "/#stc-calculator",
    cta: "Use calculator",
    Icon: Newspaper
  },
  {
    label: "Popular choice",
    title: "Backup power for Australian homes",
    description:
      "Compare reliable battery options designed for evening energy use, outage support, and solar self-consumption.",
    href: "/products",
    cta: "Compare products",
    Icon: Zap
  }
];

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
              AI Energy
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

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Latest offers</p>
              <h2 className="mt-2 text-3xl font-black text-ink">News, discounts, and energy updates</h2>
            </div>
            <Link href="/contact" className="button-secondary">
              Ask what is available
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {highlights.map(({ label, title, description, href, cta, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-600 ring-1 ring-slate-200">
                    {label}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                    <Icon size={20} aria-hidden />
                  </span>
                </div>
                <h3 className="text-xl font-black text-ink">{title}</h3>
                <p className="mt-3 min-h-20 leading-7 text-slate-600">{description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-energy-green">
                  {cta}
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
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
