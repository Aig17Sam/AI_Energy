import Link from "next/link";
import { BarChart3, Boxes, Images, Inbox, LogOut, PanelsTopLeft } from "lucide-react";

import { logoutAdmin } from "@/app/admin/actions";
import { getCurrentAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  return (
    <section className="bg-mist-blue">
      {admin ? (
        <div className="border-b border-slate-200 bg-white">
          <div className="container-shell flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
            <nav className="flex flex-wrap gap-2" aria-label="Admin navigation">
              <Link className="button-secondary h-10 text-sm" href="/admin">
                <BarChart3 size={16} aria-hidden />
                Dashboard
              </Link>
              <Link className="button-secondary h-10 text-sm" href="/admin/products">
                <Boxes size={16} aria-hidden />
                Products
              </Link>
              <Link className="button-secondary h-10 text-sm" href="/admin/hero-slides">
                <Images size={16} aria-hidden />
                Hero Slides
              </Link>
              <Link className="button-secondary h-10 text-sm" href="/admin/study-cases">
                <PanelsTopLeft size={16} aria-hidden />
                Study Cases
              </Link>
              <Link className="button-secondary h-10 text-sm" href="/admin/inquiries">
                <Inbox size={16} aria-hidden />
                Inquiries
              </Link>
            </nav>
            <form action={logoutAdmin}>
              <button className="button-secondary h-10 text-sm" type="submit">
                <LogOut size={16} aria-hidden />
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {children}
    </section>
  );
}
