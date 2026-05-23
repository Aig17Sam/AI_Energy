import type { MetadataRoute } from "next";

import { getActiveProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = process.env.DATABASE_URL ? await getActiveProducts() : [];

  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      priority: 0.75
    }))
  ];
}
