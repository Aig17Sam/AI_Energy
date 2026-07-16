import { prisma } from "@/lib/prisma";

export type HeroCarouselSlide = {
  id: string;
  src: string;
  alt: string;
  href?: string;
};

export const fallbackHeroSlides: HeroCarouselSlide[] = [
  {
    id: "fallback-solar-panels",
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85",
    alt: "Solar panels under a bright sky"
  },
  {
    id: "fallback-solar-sunlight",
    src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=85",
    alt: "Solar panels with sunlight and blue sky"
  },
  {
    id: "fallback-home-energy",
    src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern home energy and solar technology"
  }
];

export function isSupportedHeroImageUrl(src: string) {
  if (src.startsWith("/")) return true;

  try {
    const url = new URL(src);

    return (
      url.protocol === "https:" &&
      (url.hostname === "images.unsplash.com" || url.hostname.endsWith(".public.blob.vercel-storage.com"))
    );
  } catch {
    return false;
  }
}

export async function getHeroSlides(): Promise<HeroCarouselSlide[]> {
  if (!process.env.DATABASE_URL) return fallbackHeroSlides;

  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });

    const supportedSlides = slides.filter((slide) => isSupportedHeroImageUrl(slide.imageUrl));

    if (!supportedSlides.length) return fallbackHeroSlides;

    return supportedSlides.map((slide) => ({
      id: slide.id,
      src: slide.imageUrl,
      alt: slide.title || "AI Energy solar battery slide",
      href: slide.href || undefined
    }));
  } catch (error) {
    console.warn("Using fallback hero slides because the database is unavailable.", error);
    return fallbackHeroSlides;
  }
}
