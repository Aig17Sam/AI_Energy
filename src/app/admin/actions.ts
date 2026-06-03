"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { InquiryStatus } from "@prisma/client";
import { put } from "@vercel/blob";

import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export type ProductActionState = {
  ok: boolean;
  message: string;
};

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
  imageUrl: z.string().trim().url("Image URL must be a valid URL.").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(false)
});

const MAX_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024;
const PRODUCT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

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
    imageUrl: formData.get("imageUrl") || "",
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
  const uploadedImage = await uploadProductImage(formData.get("imageFile"), slug);
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

async function uploadProductImage(fileValue: FormDataEntryValue | null, slug: string) {
  if (!(fileValue instanceof File) || fileValue.size === 0) {
    return { ok: true, url: null } as const;
  }

  if (!PRODUCT_IMAGE_TYPES.includes(fileValue.type)) {
    return {
      ok: false,
      message: "Product image must be a JPG, PNG, WebP, or AVIF file."
    } as const;
  }

  if (fileValue.size > MAX_PRODUCT_IMAGE_BYTES) {
    return {
      ok: false,
      message: "Product image must be 5 MB or smaller."
    } as const;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      message: "Image upload needs BLOB_READ_WRITE_TOKEN. Add a Vercel Blob store or use the Image URL field."
    } as const;
  }

  const extension = fileValue.name.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(`products/${slug}.${extension}`, fileValue, {
    access: "public",
    addRandomSuffix: true,
    contentType: fileValue.type
  });

  return { ok: true, url: blob.url } as const;
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
