import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BatteryCharging, ShieldCheck, Sparkles } from "lucide-react";

import { HeroImageCarousel } from "@/components/hero-image-carousel";
import { HeroProductPreview } from "@/components/hero-product-preview";
import { ProductCard } from "@/components/product-card";
import { StcCalculator } from "@/components/stc-calculator";
import { getHeroSlides } from "@/lib/hero-slides";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, heroSlides] = await Promise.all([getFeaturedProducts(), getHeroSlides()]);

  return <>
    <section className="luxury-hero relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-[#07110f] text-white">
      <Image src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2400&q=92" alt="Large-scale solar energy infrastructure" fill priority className="luxury-hero-image object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,10,.92)_0%,rgba(3,12,10,.62)_45%,rgba(3,12,10,.12)_78%),linear-gradient(0deg,rgba(3,12,10,.72)_0%,transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="container-shell relative z-10 flex min-h-[calc(100svh-80px)] flex-col justify-between py-10 md:py-14">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[.28em] text-white/65">
          <span>Integrated energy solutions</span><span className="hidden md:block">Sydney · Australia</span>
        </div>
        <div className="grid items-end gap-10 pb-8 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] xl:gap-16">
          <div className="max-w-5xl">
          <p className="luxury-reveal text-sm font-bold uppercase tracking-[.3em] text-emerald-300">Engineering a smarter energy future</p>
          <h1 className="luxury-reveal luxury-delay mt-5 max-w-5xl text-[clamp(4rem,7.5vw,7.5rem)] font-black leading-[.84] tracking-[-.065em]">
            Energy,<br /><span className="font-light italic text-white/80">built at scale.</span>
          </h1>
          <div className="luxury-reveal luxury-delay-2 mt-9">
            <p className="max-w-xl text-lg leading-8 text-white/72 md:text-xl">From intelligent battery storage to integrated solar infrastructure—designed around performance, delivered with confidence.</p>
          </div>
          </div>
          <div className="luxury-reveal luxury-delay-2 hidden justify-end lg:flex"><HeroProductPreview slides={heroSlides} /></div>
        </div>
        <Link href="#story" aria-label="Discover our capabilities" className="group flex w-fit items-center gap-3 rounded-full bg-emerald-300 px-5 py-3 text-xs font-black uppercase tracking-[.18em] text-[#07110f] shadow-[0_0_40px_rgba(110,231,183,.28)] transition hover:scale-[1.03] hover:bg-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#07110f] text-white"><ArrowDown className="discover-arrow" size={15} /></span>Discover our capabilities</Link>
      </div>
    </section>

    <section id="story" className="bg-[#f1f0ea] px-4 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <p className="pt-3 text-xs font-black uppercase tracking-[.25em] text-emerald-700">From system to infrastructure</p>
          <div><h2 className="text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[.94] tracking-[-.055em] text-[#0b1714]">One vision.<br />Every stage.<br /><em className="font-light text-emerald-700">End to end.</em></h2><p className="mt-10 max-w-2xl text-lg leading-8 text-slate-600">We bring technology selection, system thinking and delivery discipline together—creating energy solutions ready for homes, businesses and the projects of tomorrow.</p></div>
        </div>
        <div className="mt-24 grid gap-4 md:grid-cols-3">
          {[{ Icon: Sparkles, title: "Engineer", text: "Clear thinking and considered system design from the outset." }, { Icon: BatteryCharging, title: "Integrate", text: "The right technologies brought together as one energy system." }, { Icon: ShieldCheck, title: "Deliver", text: "A disciplined path from first conversation to lasting performance." }].map(({ Icon, title, text }) => <article key={title} className="group border-t border-[#0b1714]/25 py-7 transition hover:border-emerald-600"><Icon size={22} className="text-emerald-700" /><h3 className="mt-14 text-2xl font-bold tracking-tight">{title}</h3><p className="mt-3 max-w-xs leading-7 text-slate-600">{text}</p></article>)}
        </div>
      </div>
    </section>

    <section className="bg-[#07110f] px-4 py-4 md:px-8 md:py-8"><div className="mx-auto max-w-[1500px]"><HeroImageCarousel slides={heroSlides} /></div></section>

    <section className="bg-white py-24 md:py-36"><div className="container-shell">
      <div className="mb-14 grid gap-5 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Selected systems</p><h2 className="mt-4 text-5xl font-medium tracking-[-.05em] text-ink md:text-7xl">Engineered for<br />real homes.</h2></div><Link href="/products" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[.16em]">View collection <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link></div>
      <div className="grid gap-6 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </div></section>

    <StcCalculator />

    <section className="relative isolate min-h-[70vh] overflow-hidden bg-[#07110f] text-white"><Image src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2200&q=90" alt="Solar energy technology at sunset" fill className="object-cover opacity-45" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-[#07110f] via-[#07110f]/60 to-transparent" /><div className="container-shell relative z-10 flex min-h-[70vh] items-center py-24"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-300">Your energy era starts here</p><h2 className="mt-6 text-6xl font-medium leading-[.9] tracking-[-.055em] md:text-8xl">Make home<br /><em className="font-light">more yours.</em></h2><Link href="/contact" className="mt-10 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 font-bold text-[#07110f] transition hover:scale-[1.03]">Request a private quote <ArrowRight size={18} /></Link></div></div></section>
  </>;
}
