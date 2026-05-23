"use server";

import { z } from "zod";

import { sendInquiryEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  message: z.string().min(10),
  productId: z.string().optional()
});

export async function createInquiry(_: unknown, formData: FormData) {
  if (!process.env.DATABASE_URL) {
    return {
      ok: false,
      message: "Inquiry storage needs DATABASE_URL. Configure PostgreSQL before accepting live customer inquiries."
    };
  }

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    productId: formData.get("productId") || undefined
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form and complete all required fields." };
  }

  const product = parsed.data.productId
    ? await prisma.product.findUnique({ where: { id: parsed.data.productId } })
    : null;

  const inquiry = await prisma.inquiry.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      message: parsed.data.message,
      productId: product?.id
    }
  });

  await sendInquiryEmail({
    ...parsed.data,
    productName: product?.name
  });

  return {
    ok: true,
    message: `Thanks ${inquiry.name}. Your inquiry has been received and we will be in touch shortly.`
  };
}
