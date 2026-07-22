import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, Building2, CheckCircle2, Home, ShieldCheck, SunMedium, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AI Energy is a professional solar battery EPC for businesses and residential customers wanting smarter storage, clearer pricing, and reliable backup power."
};

const deliverySteps = [
  {
    title: "Assess",
    text: "We start with site needs, usage patterns, tariff conditions, backup expectations, and the practical constraints that shape the final system."
  },
  {
    title: "Engineer",
    text: "Solar, battery, inverter, and protection choices are brought together as one coordinated energy system, not a loose set of products."
  },
  {
    title: "Deliver",
    text: "The project is carried from quote clarity through installation planning, handover, and performance expectations with disciplined EPC thinking."
  }
];

const capabilities = [
  {
    Icon: Home,
    title: "Residential storage",
    text: "Battery systems for households wanting better solar self-use, outage confidence, and a simpler path through product choices."
  },
  {
    Icon: Building2,
    title: "Business energy projects",
    text: "Commercial solar and battery planning for sites that need clearer cost control, operational resilience, and practical delivery support."
  },
  {
    Icon: BatteryCharging,
    title: "Battery-first expertise",
    text: "Storage guidance around usable capacity, backup requirements, warranty terms, chemistry, and total installed value."
  }
];

const principles = [
  "Clear pricing conversations before installation decisions",
  "Reliable backup power designed around real usage",
  "Technology selection matched to site conditions",
  "Practical guidance for solar, battery, and incentive estimates"
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-[#07110f] text-white">
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=92"
          alt="Solar panels forming a modern clean energy installation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,10,.94)_0%,rgba(3,12,10,.72)_48%,rgba(3,12,10,.18)_86%),linear-gradient(0deg,rgba(3,12,10,.72)_0%,transparent_48%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="container-shell relative z-10 flex min-h-[calc(100svh-80px)] items-center py-20">
          <div className="max-w-4xl">
            <p className="luxury-reveal text-xs font-black uppercase tracking-[.28em] text-emerald-300">
              About AI Energy
            </p>
            <h1 className="luxury-reveal luxury-delay mt-6 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[.88] tracking-[-.06em]">
              Smarter storage, <span className="font-light italic text-white/78">delivered clearly.</span>
            </h1>
            <p className="luxury-reveal luxury-delay-2 mt-8 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              Professional solar battery EPC for businesses and residentials wanting smarter storage, clearer pricing,
              and reliable backup power.
            </p>
            <div className="luxury-reveal luxury-delay-2 mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald-300 px-6 py-3 font-black text-[#07110f] shadow-[0_0_42px_rgba(110,231,183,.26)] transition hover:scale-[1.03] hover:bg-white"
              >
                Start a quote
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#07110f]"
              >
                View battery range
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-[#d8d5c9] bg-[#f1f0ea] px-4 py-24 md:px-8 md:py-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/25 to-transparent" />
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">What we do</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["EPC", "End-to-end"],
                  ["PV + BESS", "Solar storage"],
                  ["AU", "Local focus"],
                  ["Backup", "Power resilience"]
                ].map(([value, label]) => (
                  <div key={label} className="border-t border-[#0b1714]/20 py-4">
                    <div className="text-3xl font-black tracking-[-.04em] text-[#0b1714]">{value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="max-w-5xl text-[clamp(2.8rem,5.8vw,6.2rem)] font-medium leading-[.95] tracking-[-.055em] text-[#0b1714]">
                Built for homes, businesses, <em className="font-light text-emerald-700">and the grid-aware future.</em>
              </h2>
              <p className="mt-10 max-w-3xl text-lg leading-8 text-slate-600">
                AI Energy connects engineering judgement with practical installation delivery. We help customers move
                past confusing product claims and into systems that make sense for their site, budget, backup needs, and
                long-term energy goals.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {capabilities.map(({ Icon, title, text }) => (
              <article key={title} className="border-t border-[#0b1714]/25 py-7 transition hover:border-emerald-600">
                <Icon size={24} className="text-emerald-700" aria-hidden />
                <h3 className="mt-14 text-2xl font-bold tracking-tight text-[#0b1714]">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdfc] py-24 md:py-32">
        <div className="container-shell">
          <div className="mb-14 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">How we work</p>
              <h2 className="mt-4 text-5xl font-medium tracking-[-.05em] text-ink md:text-7xl">
                EPC discipline,
                <br />
                customer clarity.
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-900">
              <ShieldCheck size={18} aria-hidden />
              Designed for confidence
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {deliverySteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#07110f] text-sm font-black text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-10 text-3xl font-black tracking-[-.035em] text-ink">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#07110f] py-24 text-white md:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
        <div className="container-shell relative">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-300">What customers can expect</p>
              <h2 className="mt-5 text-5xl font-medium leading-[.95] tracking-[-.05em] md:text-7xl">
                Straight answers before major energy decisions.
              </h2>
            </div>
            <div className="grid gap-4">
              {principles.map((item) => (
                <div key={item} className="flex items-start gap-4 border-t border-white/12 py-5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={22} aria-hidden />
                  <p className="text-lg leading-7 text-white/76">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[58vh] overflow-hidden bg-[#07110f] text-white">
        <Image
          src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2200&q=90"
          alt="Solar panels at sunset representing reliable clean power"
          fill
          className="object-cover opacity-44"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110f] via-[#07110f]/64 to-transparent" />
        <div className="container-shell relative z-10 flex min-h-[58vh] items-center py-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-emerald-300">
              <SunMedium size={20} aria-hidden />
              <Zap size={20} aria-hidden />
            </div>
            <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-300">Ready for the next step</p>
            <h2 className="mt-6 text-5xl font-medium leading-[.95] tracking-[-.05em] md:text-7xl">
              Plan your solar battery project with more confidence.
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 font-bold text-[#07110f] transition hover:scale-[1.03]"
            >
              Request a quote
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
