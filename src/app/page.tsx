import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, BatteryCharging, Home, ShieldCheck, SunMedium, Zap } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const benefits = [
  {
    icon: BatteryCharging,
    title: "Store more solar",
    text: "Use more of your rooftop solar after sunset and reduce reliance on peak electricity rates."
  },
  {
    icon: ShieldCheck,
    title: "Backup confidence",
    text: "Compare battery systems that support essential loads, warranties, and long-term reliability."
  },
  {
    icon: BadgeDollarSign,
    title: "Clear product pricing",
    text: "Give customers visible pricing, product details, and an easy way to request a tailored quote."
  }
];

export default async function HomePage() {
  const products = await getFeaturedProducts();

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
          <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-ink shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85"
              alt="Solar panels on an Australian-style home roof"
              fill
              priority
              className="object-cover opacity-70"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 text-white">
              <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-energy-green text-ink">
                    <Zap size={20} aria-hidden />
                  </span>
                  <div>
                    <p className="font-black">Built for high-intent customers</p>
                    <p className="text-sm text-slate-200">Products, specs, pricing, and inquiry flow in one place.</p>
                  </div>
                </div>
              </div>
            </div>
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

      <section className="section-pad bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Why AI Energy</p>
            <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">A clean path from research to inquiry</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The site is structured around solar battery Australia search intent, product comparison, and quick lead
              capture for customers ready to ask about installation.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <benefit.icon className="mb-4 text-energy-green" size={28} aria-hidden />
                <h3 className="text-lg font-black text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-energy-green">
              <Home size={20} aria-hidden />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">Ready for quotes</span>
            </div>
            <h2 className="text-3xl font-black">Turn product interest into qualified inquiries.</h2>
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
