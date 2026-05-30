import type { Metadata } from "next";
import Link from "next/link";
import { BatteryCharging, Mail, Menu } from "lucide-react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AI Energy | Solar Battery Storage Australia",
    template: "%s | AI Energy"
  },
  description:
    "AI Energy helps Australian homes and businesses compare solar battery storage options, pricing, warranties, and installation inquiries.",
  openGraph: {
    title: "AI Energy | Solar Battery Storage Australia",
    description:
      "Modern solar battery solutions for backup power, energy independence, and smarter use of rooftop solar.",
    type: "website",
    locale: "en_AU"
  }
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Inquiry" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur">
          <div className="container-shell flex h-20 items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3" aria-label="AI Energy home">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-energy-green">
                <BatteryCharging size={24} aria-hidden />
              </span>
              <span>
                <span className="block text-xl font-black tracking-normal text-ink">AI Energy</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Solar Battery Australia
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-700 hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              {/* <Link href="/admin" className="button-secondary h-11 px-4 text-sm">
                <ShieldCheck size={17} aria-hidden />
                Admin
              </Link> */}
              <Link href="/contact" className="button-primary h-11 px-4 text-sm">
                <Mail size={17} aria-hidden />
                Get a quote
              </Link>
            </div>

            <details className="md:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 bg-white">
                <Menu size={21} aria-label="Open navigation" />
              </summary>
              <div className="absolute left-4 right-4 top-20 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
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

        <footer className="border-t border-slate-200 bg-ink py-10 text-white">
          <div className="container-shell grid gap-6 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="mb-3 flex items-center gap-2 text-lg font-black">
                <BatteryCharging className="text-energy-green" size={22} aria-hidden />
                AI Energy
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                Solar battery product guidance, pricing transparency, and inquiry support for Australian homes and
                small businesses.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Explore</h2>
              <div className="grid gap-2 text-sm text-slate-300">
                <Link href="/products">Products</Link>
                <Link href="/contact">Make an inquiry</Link>
                <Link href="/admin">Admin login</Link>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Coverage</h2>
              <p className="text-sm leading-6 text-slate-300">
                Built for Australian solar battery searches, comparison pages, and product-led SEO growth.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
