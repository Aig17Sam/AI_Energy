import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { updateHeroSlide } from "@/app/admin/actions";
import { AdminHeroSlideForm } from "@/components/admin-hero-slide-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });

  if (!slide) notFound();

  const action = updateHeroSlide.bind(null, slide.id);

  return (
    <section className="section-pad">
      <div className="container-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Edit hero slide</p>
            <h1 className="mt-2 text-4xl font-black text-ink">{slide.title || "Untitled slide"}</h1>
          </div>
          <Link href="/admin/hero-slides" className="button-secondary">
            <ArrowLeft size={18} aria-hidden />
            Back to slides
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist-blue">
              <Image src={slide.imageUrl} alt={slide.alt || slide.title || "Homepage carousel image"} fill className="object-cover" sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>
          <AdminHeroSlideForm slide={slide} action={action} />
        </div>
      </div>
    </section>
  );
}
