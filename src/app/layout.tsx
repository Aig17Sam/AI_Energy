import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Menu, Phone } from "lucide-react";

import "./globals.css";
import { getSiteLogo } from "@/lib/site-branding";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AI Energy | Solar Battery Storage Australia",
    template: "%s | AI Energy"
  },
  description:
    "AI Energy delivers integrated solar and battery solutions for Australian homes, businesses, and emerging energy projects.",
  openGraph: {
    title: "AI Energy | Solar Battery Storage Australia",
    description:
      "Integrated solar and battery solutions engineered for performance, resilience, and a smarter energy future.",
    type: "website",
    locale: "en_AU"
  }
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/study-case", label: "Projects" },
  { href: "/#stc-calculator", label: "Calculator" }
];

function SolarLogo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" role="img" aria-label="AI Energy solar logo">
      <rect width="96" height="96" rx="20" fill="#10202B" />
      <circle cx="66" cy="31" r="14" fill="#FBBF24" />
      <path d="M66 8V16" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M66 46V54" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M43 31H51" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M81 31H89" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M49.7 14.7L55.3 20.3" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M76.7 41.7L82.3 47.3" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M82.3 14.7L76.7 20.3" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M55.3 41.7L49.7 47.3" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 56C18.8 51.1 23.1 47.5 28.1 47.5H66.6C71.2 47.5 75.3 50.6 76.6 55L84 80H12L18 56Z" fill="#10B981" />
      <path d="M26 53H69" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 66H80" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
      <path d="M31 48L24 80" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
      <path d="M47 48L46 80" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
      <path d="M63 48L69 80" stroke="#D1FAE5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

async function BrandMark({
  currentLogo,
  size = "large"
}: {
  currentLogo: Awaited<ReturnType<typeof getSiteLogo>>;
  size?: "large" | "small";
}) {
  if (!currentLogo) {
    return size === "large" ? <SolarLogo /> : <SolarLogo className="h-6 w-6 rounded-md" />;
  }

  return size === "large" ? (
    <Image
      src={currentLogo.imageUrl}
      alt={currentLogo.alt}
      width={180}
      height={68}
      className="h-11 w-auto max-w-[180px] object-contain md:h-12"
    />
  ) : (
    <Image
      src={currentLogo.imageUrl}
      alt={currentLogo.alt}
      width={150}
      height={45}
      className="h-8 w-auto max-w-[150px] object-contain"
    />
  );
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentLogo = await getSiteLogo();

  return (
    <html lang="en-AU">
      <body>
        <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f8f8f4]/88 shadow-[0_12px_40px_rgba(7,17,15,0.06)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px bg-gradient-to-r from-transparent via-emerald-700/20 to-transparent" />
          <div className="container-shell flex h-20 items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-0.5" aria-label="AI Energy home">
              <span className="flex min-h-11 min-w-[70px] items-center justify-center overflow-hidden rounded-lg md:min-w-[80px]">
                <BrandMark currentLogo={currentLogo} size="large" />
              </span>
              <span>
                <span className="block text-xl font-black tracking-normal text-ink">AI ENERGY</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Solar Battery Australia
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/58 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] md:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#07110f] hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link href="/contact" className="button-primary h-11 rounded-full bg-[#0b1714] px-5 text-sm text-white shadow-[0_14px_28px_rgba(7,17,15,0.16)] hover:bg-emerald-800">
                <Mail size={17} aria-hidden />
                Get a quote
              </Link>
            </div>

            <details className="md:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-sm">
                <Menu size={21} aria-label="Open navigation" />
              </summary>
              <div className="absolute left-4 right-4 top-20 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_20px_60px_rgba(7,17,15,0.18)] backdrop-blur">
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 font-semibold text-slate-700">
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/admin" className="rounded-md px-3 py-2 font-semibold text-slate-700">
                    Admin
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </header>

        <main>{children}</main>

        <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#07110f] py-8 text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-300/10 to-transparent" />
          <div className="container-shell">
            <div className="grid gap-3.5 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <div>
                <div className="mb-1.5 flex items-center gap-2 text-xl font-black leading-none text-white">
                  <BrandMark currentLogo={currentLogo} size="small" />
                  <span className="-translate-y-[2px]">AI ENERGY</span>
                </div>
                <div className="mt-2.5 grid gap-1 text-sm leading-5 text-white/68">
                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden />
                    <span>Head Office: 1/17 Brumby St, Seven Hills NSW 2147</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="shrink-0 text-emerald-300" aria-hidden />
                    <span>(02) 8360 3660</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="shrink-0 text-emerald-300" aria-hidden />
                    <span>info@aienergygroup.com.au</span>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="mb-1.5 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300/80">Explore</h2>
                <div className="grid gap-1.25 text-sm text-white/68">
                  <Link href="/products" className="hover:text-white">
                    Products
                  </Link>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                  <Link href="/study-case" className="hover:text-white">
                    Study Case
                  </Link>
                  <Link href="/contact" className="hover:text-white">
                    Make an inquiry
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="mb-1.5 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300/80">Coverage</h2>
                <p className="text-sm leading-5 text-white/68">
                  Integrated solar and battery solutions for Australian homes, businesses, and emerging energy projects.
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-white/10 pt-3 text-sm text-white/45">
              © 2026 AI ENERGY Group Pty Ltd. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
