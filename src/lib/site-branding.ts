import { prisma } from "@/lib/prisma";

const PRIMARY_LOGO_KEY = "primary-logo";

export type SiteLogo = {
  imageUrl: string;
  alt: string;
};

export async function getSiteLogo(): Promise<SiteLogo | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const asset = await prisma.siteAsset.findUnique({
      where: { key: PRIMARY_LOGO_KEY }
    });

    if (!asset) return null;

    return {
      imageUrl: asset.imageUrl,
      alt: asset.alt || "AI Energy logo"
    };
  } catch (error) {
    console.warn("Using the built-in text logo because the site logo asset is unavailable.", error);
    return null;
  }
}

export { PRIMARY_LOGO_KEY };
