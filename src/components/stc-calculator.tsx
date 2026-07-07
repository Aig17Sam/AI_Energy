"use client";

import { Calculator, CircleDollarSign, MapPin, Zap } from "lucide-react";
import { useMemo, useState } from "react";

const zoneRatings = {
  "1": 1.622,
  "2": 1.536,
  "3": 1.382,
  "4": 1.185
} as const;

const deemingYearsByInstallYear: Record<number, number> = {
  2026: 5,
  2027: 4,
  2028: 3,
  2029: 2,
  2030: 1
};

const installYears = Object.keys(deemingYearsByInstallYear).map(Number);

export function StcCalculator() {
  const [systemSize, setSystemSize] = useState("6.6");
  const [zone, setZone] = useState<keyof typeof zoneRatings>("3");
  const [installYear, setInstallYear] = useState(2026);
  const [stcPrice, setStcPrice] = useState("38");

  const result = useMemo(() => {
    const size = Number(systemSize);
    const price = Number(stcPrice);
    const zoneRating = zoneRatings[zone];
    const deemingYears = deemingYearsByInstallYear[installYear] ?? 0;
    const certificates = Math.floor(Math.max(0, size) * zoneRating * deemingYears);
    const value = certificates * Math.max(0, price);

    return {
      certificates,
      deemingYears,
      value,
      zoneRating
    };
  }, [installYear, stcPrice, systemSize, zone]);

  return (
    <section id="stc-calculator" className="section-pad scroll-mt-24 bg-white">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">STC calculator</p>
          <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">Estimate your solar STC discount</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Calculate the estimated Small-scale Technology Certificates for a rooftop solar system using system size,
            postcode zone, install year, and certificate price.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <Zap className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">CER formula</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">kW x zone rating x deeming years</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <MapPin className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">By location</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">STC zones vary by postcode</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <CircleDollarSign className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">Live value</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Adjust the market price per STC</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-energy-green">
              <Calculator size={24} aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-black text-ink">Solar PV STC estimate</h3>
              <p className="text-sm text-slate-600">For eligible Australian small-scale solar installations.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">System size (kW)</span>
              <input
                className="field"
                inputMode="decimal"
                min="0"
                step="0.1"
                type="number"
                value={systemSize}
                onChange={(event) => setSystemSize(event.target.value)}
              />
            </label>

            <label>
              <span className="label">Install year</span>
              <select
                className="field"
                value={installYear}
                onChange={(event) => setInstallYear(Number(event.target.value))}
              >
                {installYears.map((year) => (
                  <option key={year} value={year}>
                    {year} ({deemingYearsByInstallYear[year]} years)
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="label">STC postcode zone</span>
              <select
                className="field"
                value={zone}
                onChange={(event) => setZone(event.target.value as keyof typeof zoneRatings)}
              >
                <option value="1">Zone 1 - 1.622</option>
                <option value="2">Zone 2 - 1.536</option>
                <option value="3">Zone 3 - 1.382</option>
                <option value="4">Zone 4 - 1.185</option>
              </select>
            </label>

            <label>
              <span className="label">STC price ($)</span>
              <input
                className="field"
                inputMode="decimal"
                min="0"
                step="0.5"
                type="number"
                value={stcPrice}
                onChange={(event) => setStcPrice(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Certificates</p>
              <p className="mt-1 text-3xl font-black text-ink">{result.certificates}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Est. discount</p>
              <p className="mt-1 text-3xl font-black text-ink">
                {result.value.toLocaleString("en-AU", { currency: "AUD", maximumFractionDigits: 0, style: "currency" })}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Inputs</p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink">
                Zone {zone} x {result.zoneRating} x {result.deemingYears} years
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Estimate only. Final STCs depend on Clean Energy Regulator rules, exact postcode zone, eligible equipment,
            accredited installation, and the certificate price available at the time.
          </p>
        </div>
      </div>
    </section>
  );
}
