import { Mail, Phone } from "lucide-react";
import type { InquiryStatus } from "@prisma/client";

import { InquiryStatusSelect } from "@/components/inquiry-status-select";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  await requireAdmin();
  const inquiries = await prisma.inquiry.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="mb-8">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Inquiries</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Customer messages</h1>
        </div>
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <article key={inquiry.id} className={`rounded-lg border bg-white p-5 shadow-sm ${getInquiryCardClass(inquiry.status)}`}>
              <div className="flex flex-wrap justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black text-ink">{inquiry.name}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${getInquiryBadgeClass(inquiry.status)}`}>
                      {formatInquiryStatus(inquiry.status)}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                    <a className="flex items-center gap-2" href={`mailto:${inquiry.email}`}>
                      <Mail size={16} aria-hidden />
                      {inquiry.email}
                    </a>
                    <a className="flex items-center gap-2" href={`tel:${inquiry.phone}`}>
                      <Phone size={16} aria-hidden />
                      {inquiry.phone}
                    </a>
                  </div>
                </div>
                <InquiryStatusSelect inquiryId={inquiry.id} status={inquiry.status} />
              </div>
              <div className="mt-4 grid gap-3">
                <div className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                  {inquiry.product?.name || "General inquiry"} · {inquiry.createdAt.toLocaleString("en-AU")}
                </div>
                <p className="leading-7 text-slate-700">{inquiry.message}</p>
              </div>
            </article>
          ))}
          {!inquiries.length ? (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
              No inquiries yet.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function formatInquiryStatus(status: InquiryStatus) {
  return {
    NEW: "New",
    CONTACTED: "Contacted",
    CLOSED: "Closed"
  }[status];
}

function getInquiryBadgeClass(status: InquiryStatus) {
  return {
    NEW: "bg-emerald-100 text-emerald-800",
    CONTACTED: "bg-sky-100 text-sky-800",
    CLOSED: "bg-slate-200 text-slate-700"
  }[status];
}

function getInquiryCardClass(status: InquiryStatus) {
  return {
    NEW: "border-emerald-200 ring-1 ring-emerald-50",
    CONTACTED: "border-sky-200 ring-1 ring-sky-50",
    CLOSED: "border-slate-200 opacity-75"
  }[status];
}
