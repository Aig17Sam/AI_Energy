import { prisma } from "@/lib/prisma";
import { fallbackProducts } from "@/lib/fallback-products";

export async function getActiveProducts() {
  if (!process.env.DATABASE_URL) return fallbackProducts;

  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }]
  });
}

export async function getFeaturedProducts() {
  if (!process.env.DATABASE_URL) return fallbackProducts.filter((product) => product.isFeatured).slice(0, 3);

  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    take: 3,
    orderBy: { name: "asc" }
  });
}

export async function getProductBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    const product = fallbackProducts.find((item) => item.slug === slug);
    return product ? { ...product, images: [] } : null;
  }

  return prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } }
  });
}
