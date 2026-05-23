import { Mail, Phone } from "lucide-react";

import { updateInquiryStatus } from "@/app/admin/actions";
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
            <article key={inquiry.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-ink">{inquiry.name}</h2>
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
                <form action={updateInquiryStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={inquiry.id} />
                  <select className="field h-11 min-w-36" name="status" defaultValue={inquiry.status}>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <button className="button-secondary h-11 text-sm" type="submit">
                    Update
                  </button>
                </form>
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
