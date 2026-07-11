import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, ShieldCheck, SunMedium } from "lucide-react";

import { StcCalculator } from "@/components/stc-calculator";

export const metadata: Metadata = {
  title: "STC Calculator",
  description:
    "Estimate Australian Small-scale Technology Certificates for solar PV, eligible batteries, or a combined solar and battery package."
};

const notes = [
  "STC prices move with market conditions, so keep the certificate price editable.",
  "The calculator is an estimate and should be checked against final site design and eligibility.",
  "Eligible batteries can now receive support through the Cheaper Home Batteries Program when connected to new or existing solar PV."
];

export default function CalculatorPage() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
              <SunMedium size={17} aria-hidden />
              Australian solar incentive estimator
            </div>
            <h1 className="text-4xl font-black leading-tight text-ink md:text-5xl">STC calculator</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate the Small-scale Technology Certificate value that may reduce the upfront cost of an eligible
              solar PV system, battery installation, or full solar and battery package.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="button-primary">
                Request a quote
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/products" className="button-secondary">
                View batteries
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {notes.map((note) => (
              <div key={note} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <ShieldCheck className="mb-3 text-energy-green" size={24} aria-hidden />
                <p className="text-sm leading-6 text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist-blue">
        <div className="container-shell">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2 text-energy-green">
              <Calculator size={20} aria-hidden />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">Estimate</span>
            </div>
            <h2 className="text-3xl font-black text-ink">Calculate estimated STCs and discount value</h2>
          </div>
          <StcCalculator />
        </div>
      </section>
    </>
  );
}
