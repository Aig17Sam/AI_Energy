"use client";

import { BatteryCharging, Calculator, CircleDollarSign, MapPin, SunMedium, Zap } from "lucide-react";
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

const batteryStcFactors = {
  "2026-h1": { factor: 8.4, label: "Jan-Apr 2026" },
  "2026-h2": { factor: 6.8, label: "May-Dec 2026" },
  "2027-h1": { factor: 5.7, label: "Jan-Jun 2027" },
  "2027-h2": { factor: 5.2, label: "Jul-Dec 2027" },
  "2028-h1": { factor: 4.6, label: "Jan-Jun 2028" },
  "2028-h2": { factor: 4.1, label: "Jul-Dec 2028" },
  "2029-h1": { factor: 3.6, label: "Jan-Jun 2029" },
  "2029-h2": { factor: 3.1, label: "Jul-Dec 2029" },
  "2030-h1": { factor: 2.6, label: "Jan-Jun 2030" },
  "2030-h2": { factor: 2.1, label: "Jul-Dec 2030" }
} as const;

const calculatorModes = [
  { label: "Solar PV", value: "solar" },
  { label: "Battery", value: "battery" },
  { label: "Solar + battery", value: "combined" }
] as const;

type CalculatorMode = (typeof calculatorModes)[number]["value"];
type BatteryInstallPeriod = keyof typeof batteryStcFactors;

function formatCurrency(value: number) {
  return value.toLocaleString("en-AU", { currency: "AUD", maximumFractionDigits: 0, style: "currency" });
}

export function StcCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("combined");
  const [systemSize, setSystemSize] = useState("6.6");
  const [zone, setZone] = useState<keyof typeof zoneRatings>("3");
  const [installYear, setInstallYear] = useState(2026);
  const [stcPrice, setStcPrice] = useState("38");
  const [batteryCapacity, setBatteryCapacity] = useState("13.5");
  const [batteryInstallPeriod, setBatteryInstallPeriod] = useState<BatteryInstallPeriod>("2026-h2");

  const price = Math.max(0, Number(stcPrice));
  const showSolar = mode === "solar" || mode === "combined";
  const showBattery = mode === "battery" || mode === "combined";

  const solarResult = useMemo(() => {
    const size = Number(systemSize);
    const zoneRating = zoneRatings[zone];
    const deemingYears = deemingYearsByInstallYear[installYear] ?? 0;
    const certificates = Math.floor(Math.max(0, size) * zoneRating * deemingYears);
    const value = certificates * price;

    return {
      certificates,
      deemingYears,
      value,
      zoneRating
    };
  }, [installYear, price, systemSize, zone]);

  const batteryResult = useMemo(() => {
    const capacity = Math.max(0, Number(batteryCapacity));
    const factor = batteryStcFactors[batteryInstallPeriod].factor;
    const firstTier = Math.min(capacity, 14);
    const secondTier = Math.max(0, Math.min(capacity, 28) - 14);
    const thirdTier = Math.max(0, Math.min(capacity, 50) - 28);
    const estimatedCertificates =
      capacity >= 5 ? Math.floor(firstTier * factor + secondTier * factor * 0.6 + thirdTier * factor * 0.15) : 0;

    return {
      cappedCapacity: Math.min(capacity, 50),
      certificates: estimatedCertificates,
      factor,
      isBelowMinimum: capacity > 0 && capacity < 5,
      isOverRebateCap: capacity > 50,
      value: estimatedCertificates * price
    };
  }, [batteryCapacity, batteryInstallPeriod, price]);

  const totalCertificates =
    (showSolar ? solarResult.certificates : 0) + (showBattery ? batteryResult.certificates : 0);
  const totalValue = (showSolar ? solarResult.value : 0) + (showBattery ? batteryResult.value : 0);

  return (
    <section id="stc-calculator" className="section-pad scroll-mt-24 bg-white">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">STC calculator</p>
          <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">Estimate solar, battery, or package discounts</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Calculate estimated Small-scale Technology Certificates for rooftop solar, eligible battery storage, or a
            combined solar and battery quote.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <SunMedium className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">Solar PV</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">kW x solar zone factor x deeming years.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <BatteryCharging className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">Battery storage</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Usable kWh x battery STC factor, with tapering.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <CircleDollarSign className="mb-3 text-energy-green" size={22} aria-hidden />
              <p className="text-sm font-bold text-ink">Package total</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Adds solar and battery estimates into one discount.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-energy-green">
              <Calculator size={24} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-black text-ink">Discount estimate</h3>
              <p className="text-sm text-slate-600">Choose a quote type and adjust the relevant STC inputs.</p>
            </div>
          </div>

          <div className="mb-5 grid rounded-lg border border-slate-200 bg-slate-50 p-1 sm:grid-cols-3">
            {calculatorModes.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-black transition ${
                  mode === item.value ? "bg-energy-green text-ink shadow-sm" : "text-slate-600 hover:bg-white"
                }`}
                onClick={() => setMode(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
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

            {showSolar ? (
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex items-center gap-2 text-energy-green">
                  <SunMedium size={18} aria-hidden />
                  <p className="text-sm font-black uppercase tracking-[0.12em]">Solar PV inputs</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
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
                    <span className="label">Solar zone factor</span>
                    <select
                      className="field"
                      value={zone}
                      onChange={(event) => setZone(event.target.value as keyof typeof zoneRatings)}
                    >
                      <option value="1">Zone 1 - factor 1.622</option>
                      <option value="2">Zone 2 - factor 1.536</option>
                      <option value="3">Zone 3 - factor 1.382</option>
                      <option value="4">Zone 4 - factor 1.185</option>
                    </select>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      Based on the installation postcode.
                    </span>
                  </label>
                </div>
              </div>
            ) : null}

            {showBattery ? (
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex items-center gap-2 text-energy-green">
                  <BatteryCharging size={18} aria-hidden />
                  <p className="text-sm font-black uppercase tracking-[0.12em]">Battery inputs</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label>
                    <span className="label">Usable battery capacity (kWh)</span>
                    <input
                      className="field"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      type="number"
                      value={batteryCapacity}
                      onChange={(event) => setBatteryCapacity(event.target.value)}
                    />
                  </label>

                  <label>
                    <span className="label">Battery install period</span>
                    <select
                      className="field"
                      value={batteryInstallPeriod}
                      onChange={(event) => setBatteryInstallPeriod(event.target.value as BatteryInstallPeriod)}
                    >
                      {Object.entries(batteryStcFactors).map(([period, item]) => (
                        <option key={period} value={period}>
                          {item.label} ({item.factor} STCs/kWh)
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                  <MapPin className="mt-0.5 shrink-0 text-energy-green" size={15} aria-hidden />
                  <p>
                    Battery estimates use usable capacity. Eligible systems generally need at least 5 kWh, and this
                    calculator applies the current support taper up to 50 kWh.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Total certificates</p>
              <p className="mt-1 text-3xl font-black text-ink">{totalCertificates}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Est. discount</p>
              <p className="mt-1 text-3xl font-black text-ink">{formatCurrency(totalValue)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Quote type</p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink">
                {calculatorModes.find((item) => item.value === mode)?.label} at {formatCurrency(price)} per STC
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {showSolar ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-ink">Solar PV</p>
                  <Zap className="text-energy-green" size={18} aria-hidden />
                </div>
                <p className="text-2xl font-black text-ink">{formatCurrency(solarResult.value)}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {solarResult.certificates} STCs from {systemSize || 0} kW x zone {zone} ({solarResult.zoneRating}) x{" "}
                  {solarResult.deemingYears} years.
                </p>
              </div>
            ) : null}

            {showBattery ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-ink">Battery</p>
                  <BatteryCharging className="text-energy-green" size={18} aria-hidden />
                </div>
                <p className="text-2xl font-black text-ink">{formatCurrency(batteryResult.value)}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {batteryResult.certificates} STCs from {batteryResult.cappedCapacity} eligible kWh at{" "}
                  {batteryResult.factor} STCs/kWh before capacity tapering.
                </p>
                {batteryResult.isBelowMinimum ? (
                  <p className="mt-2 text-xs font-bold text-amber-700">Minimum battery size is generally 5 kWh.</p>
                ) : null}
                {batteryResult.isOverRebateCap ? (
                  <p className="mt-2 text-xs font-bold text-amber-700">Capacity above 50 kWh is not counted here.</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Estimate only. Final STCs depend on Clean Energy Regulator rules, exact postcode zone, eligible equipment,
            battery eligibility, accredited installation, install date, and the certificate price available at the time.
          </p>
        </div>
      </div>
    </section>
  );
}
