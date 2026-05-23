import { BadgeDollarSign, Boxes, Inbox, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [productCount, activeProductCount, inquiryCount, newInquiryCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } })
  ]);
  const stats: { label: string; value: number; Icon: LucideIcon }[] = [
    { label: "Products", value: productCount, Icon: Boxes },
    { label: "Active products", value: activeProductCount, Icon: TrendingUp },
    { label: "Total inquiries", value: inquiryCount, Icon: Inbox },
    { label: "New inquiries", value: newInquiryCount, Icon: BadgeDollarSign }
  ];

  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="mb-8">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Admin</p>
          <h1 className="mt-2 text-4xl font-black text-ink">AI Energy dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="mb-4 text-energy-green" size={26} aria-hidden />
              <div className="text-3xl font-black text-ink">{value}</div>
              <div className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
