import { prisma } from "@/lib/prisma";

export type HeroCarouselSlide = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  text?: string;
  href?: string;
};

export const fallbackHeroSlides: HeroCarouselSlide[] = [
  {
    id: "fallback-solar-panels",
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85",
    alt: "Solar panels under a bright sky",
    title: "Built for high-intent customers",
    text: "Products, specs, pricing, and inquiry flow in one place."
  },
  {
    id: "fallback-solar-sunlight",
    src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=85",
    alt: "Solar panels with sunlight and blue sky",
    title: "Clear solar battery guidance",
    text: "Help customers compare storage options with confidence."
  },
  {
    id: "fallback-home-energy",
    src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern home energy and solar technology",
    title: "Simple path to quotes",
    text: "Turn product interest into practical next steps."
  }
];

export async function getHeroSlides(): Promise<HeroCarouselSlide[]> {
  if (!process.env.DATABASE_URL) return fallbackHeroSlides;

  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });

    if (!slides.length) return fallbackHeroSlides;

    return slides.map((slide) => ({
      id: slide.id,
      src: slide.imageUrl,
      alt: slide.alt || slide.title || "AI Energy solar battery slide",
      title: slide.title || undefined,
      text: slide.text || undefined,
      href: slide.href || undefined
    }));
  } catch (error) {
    console.warn("Using fallback hero slides because the database is unavailable.", error);
    return fallbackHeroSlides;
  }
}
