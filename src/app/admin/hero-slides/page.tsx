import Image from "next/image";
import Link from "next/link";
import { Edit, ImageIcon, Trash2 } from "lucide-react";

import { deleteHeroSlide } from "@/app/admin/actions";
import { AdminHeroSlideForm } from "@/components/admin-hero-slide-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHeroSlidesPage() {
  await requireAdmin();
  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <section className="section-pad">
      <div className="container-shell grid gap-8">
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Hero slides</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Manage homepage carousel</h1>
        </div>

        <AdminHeroSlideForm />

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid min-w-[940px] grid-cols-[140px_1.2fr_1.4fr_110px_130px] gap-4 border-b border-slate-200 bg-slate-50 p-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
            <div>Image</div>
            <div>Title</div>
            <div>Text</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="overflow-x-auto">
            {slides.length ? (
              slides.map((slide) => (
                <div key={slide.id} className="grid min-w-[940px] grid-cols-[140px_1.2fr_1.4fr_110px_130px] items-center gap-4 border-b border-slate-100 p-4 last:border-b-0">
                  <div className="relative h-20 overflow-hidden rounded-md bg-mist-blue">
                    <Image src={slide.imageUrl} alt={slide.alt || slide.title || "Homepage carousel image"} fill className="object-cover" sizes="140px" />
                  </div>
                  <div>
                    <div className="font-black text-ink">{slide.title || "Untitled slide"}</div>
                    <div className="mt-1 text-sm text-slate-500">Order {slide.sortOrder}</div>
                  </div>
                  <div className="text-sm leading-6 text-slate-600">{slide.text || "No short text"}</div>
                  <div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${slide.isActive ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                      {slide.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/hero-slides/${slide.id}`} className="button-secondary h-10 px-3 text-sm" aria-label={`Edit ${slide.title || "slide"}`}>
                      <Edit size={16} aria-hidden />
                    </Link>
                    <form action={deleteHeroSlide}>
                      <input type="hidden" name="id" value={slide.id} />
                      <button className="button-secondary h-10 px-3 text-sm text-red-700" type="submit" aria-label={`Delete ${slide.title || "slide"}`}>
                        <Trash2 size={16} aria-hidden />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-w-[940px] items-center gap-3 p-6 text-slate-600">
                <ImageIcon className="text-energy-green" size={22} aria-hidden />
                No uploaded carousel images yet. The homepage is using fallback images.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
