"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { InquiryStatus } from "@prisma/client";
import { del, put } from "@vercel/blob";

import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export type ProductActionState = {
  ok: boolean;
  message: string;
};

export type HeroSlideActionState = {
  ok: boolean;
  message: string;
};

export type BrandingActionState = {
  ok: boolean;
  message: string;
};

const imageUrlSchema = z
  .string()
  .trim()
  .url("Image URL must be a valid URL.")
  .refine(isLikelyImageUrl, "Image URL must point directly to an image file.")
  .optional()
  .or(z.literal(""));

const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must contain at least 2 characters."),
  slug: z.string().optional(),
  brand: z.string().trim().min(2, "Brand must contain at least 2 characters."),
  price: z.coerce.number().positive("Price must be greater than 0."),
  capacity: z.string().trim().min(1, "Capacity is required."),
  usableCapacity: z.string().optional(),
  batteryChemistry: z.string().optional(),
  warrantyYears: z.coerce.number().int().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  description: z.string().trim().min(20, "Description must contain at least 20 characters."),
  imageUrl: imageUrlSchema,
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(false)
});

const heroSlideSchema = z.object({
  title: z.string().trim().optional(),
  text: z.string().trim().optional(),
  alt: z.string().trim().optional(),
  href: z.string().trim().optional(),
  imageUrl: imageUrlSchema,
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(false)
});

const brandingSchema = z.object({
  alt: z.string().trim().optional(),
  imageUrl: imageUrlSchema
});

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function loginAdmin(_: unknown, formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { ok: false, message: "Invalid email or password." };
  }

  await setAdminSession(user.id);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

async function productDataFromForm(formData: FormData) {
  const hasImageUpload = hasUploadFile(formData.get("imageFile"));
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") || undefined,
    brand: formData.get("brand"),
    price: formData.get("price"),
    capacity: formData.get("capacity"),
    usableCapacity: formData.get("usableCapacity") || undefined,
    batteryChemistry: formData.get("batteryChemistry") || undefined,
    warrantyYears: formData.get("warrantyYears") || undefined,
    dimensions: formData.get("dimensions") || undefined,
    weight: formData.get("weight") || undefined,
    description: formData.get("description"),
    imageUrl: hasImageUpload ? "" : formData.get("imageUrl") || "",
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: getProductErrorMessage(parsed.error)
    } as const;
  }

  const slug = parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.name);
  const uploadedImage = await uploadPublicImage(formData.get("imageFile"), `products/${slug}`, "Product image");
  if (!uploadedImage.ok) return uploadedImage;

  return {
    ok: true,
    data: {
      ...parsed.data,
      slug,
      imageUrl: uploadedImage.url || parsed.data.imageUrl || null
    }
  } as const;
}

export async function createProduct(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
  await requireAdmin();
  const parsed = await productDataFromForm(formData);
  if (!parsed.ok) return parsed;

  await prisma.product.create({ data: parsed.data });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  await requireAdmin();
  const parsed = await productDataFromForm(formData);
  if (!parsed.ok) return parsed;

  await prisma.product.update({
    where: { id },
    data: parsed.data
  });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function createHeroSlide(_: HeroSlideActionState, formData: FormData): Promise<HeroSlideActionState> {
  await requireAdmin();

  const hasImageUpload = hasUploadFile(formData.get("imageFile"));
  const parsed = heroSlideSchema.safeParse({
    title: formData.get("title") || undefined,
    text: formData.get("text") || undefined,
    alt: formData.get("alt") || undefined,
    href: formData.get("href") || undefined,
    imageUrl: hasImageUpload ? "" : formData.get("imageUrl") || "",
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.flatten().fieldErrors.imageUrl?.[0] || "Please check the hero slide form and try again."
    };
  }

  const titleSlug = slugify(parsed.data.title || parsed.data.alt || "hero-slide");
  const uploadedImage = await uploadPublicImage(formData.get("imageFile"), `hero-slides/${titleSlug}`, "Hero slide image");
  if (!uploadedImage.ok) return uploadedImage;

  const imageUrl = uploadedImage.url || parsed.data.imageUrl || null;
  if (!imageUrl) {
    return {
      ok: false,
      message: "Upload a hero slide image or provide an image URL."
    };
  }

  await prisma.heroSlide.create({
    data: {
      imageUrl,
      alt: parsed.data.alt || null,
      title: parsed.data.title || null,
      text: parsed.data.text || null,
      href: parsed.data.href || null,
      sortOrder: parsed.data.sortOrder,
      isActive: parsed.data.isActive
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");

  return {
    ok: true,
    message: "Hero slide saved."
  };
}

export async function updateHeroSlide(
  id: string,
  _: HeroSlideActionState,
  formData: FormData
): Promise<HeroSlideActionState> {
  await requireAdmin();

  const existingSlide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existingSlide) {
    return {
      ok: false,
      message: "Hero slide could not be found."
    };
  }

  const hasImageUpload = hasUploadFile(formData.get("imageFile"));
  const parsed = heroSlideSchema.safeParse({
    title: formData.get("title") || undefined,
    text: formData.get("text") || undefined,
    alt: formData.get("alt") || undefined,
    href: formData.get("href") || undefined,
    imageUrl: hasImageUpload ? "" : formData.get("imageUrl") || "",
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.flatten().fieldErrors.imageUrl?.[0] || "Please check the hero slide form and try again."
    };
  }

  const titleSlug = slugify(parsed.data.title || parsed.data.alt || "hero-slide");
  const uploadedImage = await uploadPublicImage(formData.get("imageFile"), `hero-slides/${titleSlug}`, "Hero slide image");
  if (!uploadedImage.ok) return uploadedImage;

  const imageUrl = uploadedImage.url || parsed.data.imageUrl || existingSlide.imageUrl;

  await prisma.heroSlide.update({
    where: { id },
    data: {
      imageUrl,
      alt: parsed.data.alt || null,
      title: parsed.data.title || null,
      text: parsed.data.text || null,
      href: parsed.data.href || null,
      sortOrder: parsed.data.sortOrder,
      isActive: parsed.data.isActive
    }
  });

  if (uploadedImage.url && existingSlide.imageUrl.includes(".blob.vercel-storage.com")) {
    try {
      await del(existingSlide.imageUrl);
    } catch (error) {
      console.warn("Old hero slide image could not be deleted from Vercel Blob.", error);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  revalidatePath(`/admin/hero-slides/${id}`);
  redirect("/admin/hero-slides");
}

export async function updateSiteLogo(_: BrandingActionState, formData: FormData): Promise<BrandingActionState> {
  await requireAdmin();

  const hasImageUpload = hasUploadFile(formData.get("imageFile"));
  const parsed = brandingSchema.safeParse({
    alt: formData.get("alt") || undefined,
    imageUrl: hasImageUpload ? "" : formData.get("imageUrl") || ""
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.flatten().fieldErrors.imageUrl?.[0] || "Please check the branding form and try again."
    };
  }

  const existingAsset = await prisma.siteAsset.findUnique({
    where: { key: "primary-logo" }
  });

  const uploadedImage = await uploadPublicImage(formData.get("imageFile"), "branding/primary-logo", "Site logo");
  if (!uploadedImage.ok) return uploadedImage;

  const imageUrl = uploadedImage.url || parsed.data.imageUrl || existingAsset?.imageUrl || null;
  if (!imageUrl) {
    return {
      ok: false,
      message: "Upload a logo image or provide an image URL."
    };
  }

  await prisma.siteAsset.upsert({
    where: { key: "primary-logo" },
    update: {
      imageUrl,
      alt: parsed.data.alt || null
    },
    create: {
      key: "primary-logo",
      imageUrl,
      alt: parsed.data.alt || null
    }
  });

  if (uploadedImage.url && existingAsset?.imageUrl.includes(".blob.vercel-storage.com")) {
    try {
      await del(existingAsset.imageUrl);
    } catch (error) {
      console.warn("Old site logo could not be deleted from Vercel Blob.", error);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/branding");

  return {
    ok: true,
    message: "Site logo updated."
  };
}

async function uploadPublicImage(fileValue: FormDataEntryValue | null, pathPrefix: string, label: string) {
  if (!(fileValue instanceof File) || fileValue.size === 0) {
    return { ok: true, url: null } as const;
  }

  if (!IMAGE_TYPES.includes(fileValue.type)) {
    return {
      ok: false,
      message: `${label} must be a JPG, PNG, WebP, or AVIF file.`
    } as const;
  }

  if (fileValue.size > MAX_IMAGE_BYTES) {
    return {
      ok: false,
      message: `${label} must be 5 MB or smaller.`
    } as const;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      message: "Image upload needs BLOB_READ_WRITE_TOKEN. Add a Vercel Blob store or use the Image URL field."
    } as const;
  }

  const extension = fileValue.name.split(".").pop()?.toLowerCase() || "jpg";
  let blob;
  try {
    blob = await put(`${pathPrefix}.${extension}`, fileValue, {
      access: "public",
      addRandomSuffix: true,
      contentType: fileValue.type
    });
  } catch (error) {
    console.error(`${label} upload failed.`, error);
    return {
      ok: false,
      message:
        `${label} upload failed. Check that BLOB_READ_WRITE_TOKEN belongs to an existing public Vercel Blob store, or use the Image URL field.`
    } as const;
  }

  return { ok: true, url: blob.url } as const;
}

function hasUploadFile(fileValue: FormDataEntryValue | null) {
  return fileValue instanceof File && fileValue.size > 0;
}

function isLikelyImageUrl(value: string | undefined) {
  if (!value) return true;

  try {
    const url = new URL(value);
    const pathname = url.pathname.toLowerCase();

    return (
      /\.(avif|gif|jpe?g|png|webp)$/.test(pathname) ||
      url.hostname === "images.unsplash.com" ||
      url.hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

export async function deleteHeroSlide(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) return;

  await prisma.heroSlide.delete({ where: { id } });

  if (slide.imageUrl.includes(".blob.vercel-storage.com")) {
    try {
      await del(slide.imageUrl);
    } catch (error) {
      console.warn("Hero slide image could not be deleted from Vercel Blob.", error);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await prisma.product.delete({ where: { id } });
  }
  revalidatePath("/");
  revalidatePath("/products");
}

function getProductErrorMessage(error: z.ZodError<z.infer<typeof productSchema>>) {
  const fieldErrors = error.flatten().fieldErrors;

  return (
    fieldErrors.name?.[0] ||
    fieldErrors.brand?.[0] ||
    fieldErrors.price?.[0] ||
    fieldErrors.capacity?.[0] ||
    fieldErrors.description?.[0] ||
    fieldErrors.imageUrl?.[0] ||
    "Please check the product form and try again."
  );
}

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as InquiryStatus;

  if (id && Object.values(InquiryStatus).includes(status)) {
    await prisma.inquiry.update({ where: { id }, data: { status } });
  }
  revalidatePath("/admin/inquiries");
}
