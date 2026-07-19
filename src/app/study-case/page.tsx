import type { Metadata } from "next";

import { StudyCaseGallery } from "@/components/study-case-gallery";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solar Battery Study Cases",
  description:
    "Browse sample solar battery study cases for homes and businesses comparing storage, backup power, and energy savings."
};

const fallbackStudyCases = [
  {
    title: "Family Home Battery Upgrade",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A suburban household compares battery storage options to use more rooftop solar in the evening and reduce grid reliance."
  },
  {
    title: "Small Business Backup Plan",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A small office reviews battery capacity and essential-load backup needs to keep daily operations running during outages."
  },
  {
    title: "New Build Solar Storage",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A new home project plans solar and battery storage together so the system is ready for long-term energy independence."
  },
  {
    title: "High Usage Evening Load",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A household with strong evening demand evaluates usable capacity, warranty coverage, and practical payback expectations."
  },
  {
    title: "Regional Property Resilience",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A regional property studies battery storage for backup confidence, solar self-consumption, and fewer outage disruptions."
  },
  {
    title: "Compact Townhouse Solution",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A townhouse owner compares compact battery products where available wall space and installation layout matter most."
  }
];

export default async function StudyCasePage() {
  const records = await prisma.studyCase.findMany({
    where: { isActive: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });
  const studyCases = records.length
    ? records.filter((record) => record.images.length).map((record) => ({
        title: record.title,
        description: record.description,
        images: record.images.map((image) => image.url)
      }))
    : fallbackStudyCases;
  return (
    <section className="section-pad bg-mist-blue">
      <div className="container-shell">
        <div className="mb-9 max-w-3xl">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Study case</p>
          <h1 className="mt-2 text-4xl font-black text-ink md:text-5xl">Solar battery showcase</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Dummy examples for common solar battery projects. Each card can later be replaced with a real customer case,
            project photo, suburb, battery model, and performance notes.
          </p>
        </div>

        <StudyCaseGallery studyCases={studyCases} />
      </div>
    </section>
  );
}
