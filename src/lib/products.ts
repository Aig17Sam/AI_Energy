import { prisma } from "@/lib/prisma";
import { fallbackProducts } from "@/lib/fallback-products";

export async function getActiveProducts() {
  if (!process.env.DATABASE_URL) return fallbackProducts;

  try {
    return await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }]
    });
  } catch (error) {
    console.warn("Using fallback products because the database is unavailable.", error);
    return fallbackProducts;
  }
}

export async function getFeaturedProducts() {
  if (!process.env.DATABASE_URL) return fallbackProducts.filter((product) => product.isFeatured).slice(0, 3);

  try {
    const featuredProducts = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      take: 3,
      orderBy: { name: "asc" }
    });

    if (featuredProducts.length >= 3) {
      return featuredProducts;
    }

    const remainingProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: false,
        id: { notIn: featuredProducts.map((product) => product.id) }
      },
      take: 3 - featuredProducts.length,
      orderBy: { name: "asc" }
    });

    return [...featuredProducts, ...remainingProducts];
  } catch (error) {
    console.warn("Using fallback featured products because the database is unavailable.", error);
    return fallbackProducts.filter((product) => product.isFeatured).slice(0, 3);
  }
}

export async function getProductBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    const product = fallbackProducts.find((item) => item.slug === slug);
    return product ? { ...product, images: [] } : null;
  }

  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { images: { orderBy: { sortOrder: "asc" } } }
    });
  } catch (error) {
    console.warn("Using fallback product detail because the database is unavailable.", error);
    const product = fallbackProducts.find((item) => item.slug === slug);
    return product ? { ...product, images: [] } : null;
  }
}
