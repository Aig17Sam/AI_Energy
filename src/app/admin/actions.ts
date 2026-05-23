"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { InquiryStatus } from "@prisma/client";

import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  brand: z.string().min(2),
  price: z.coerce.number().positive(),
  capacity: z.string().min(1),
  usableCapacity: z.string().optional(),
  batteryChemistry: z.string().optional(),
  warrantyYears: z.coerce.number().int().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  description: z.string().min(20),
  imageUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(false)
});

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

function productDataFromForm(formData: FormData) {
  const parsed = productSchema.parse({
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

  return {
    ...parsed,
    slug: parsed.slug ? slugify(parsed.slug) : slugify(parsed.name),
    imageUrl: parsed.imageUrl || null
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  await prisma.product.create({ data: productDataFromForm(formData) });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.product.update({
    where: { id },
    data: productDataFromForm(formData)
  });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
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

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as InquiryStatus;

  if (id && Object.values(InquiryStatus).includes(status)) {
    await prisma.inquiry.update({ where: { id }, data: { status } });
  }
  revalidatePath("/admin/inquiries");
}
