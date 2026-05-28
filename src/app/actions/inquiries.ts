"use server";

import { z } from "zod";

import { sendInquiryEmail } from "@/lib/email";
import { formatCurrency } from "@/lib/format";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(6, "Please enter a phone number with at least 6 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Please enter a message with at least 10 characters."),
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
    return { ok: false, message: getInquiryErrorMessage(parsed.error) };
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

  try {
    await sendInquiryEmail({
      inquiryId: inquiry.id,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      message: parsed.data.message,
      productName: product?.name,
      productPrice: product ? formatCurrency(product.price.toString()) : null,
      createdAt: inquiry.createdAt
    });
  } catch (error) {
    console.error("Quote email failed", error);
    return {
      ok: false,
      message:
        "Your quote request was saved, but the email notification could not be sent. Please check SMTP settings or contact AI Energy directly."
    };
  }

  return {
    ok: true,
    message: `Thanks ${inquiry.name}. Your quote request has been sent and we will be in touch shortly.`
  };
}

function getInquiryErrorMessage(error: z.ZodError<z.infer<typeof inquirySchema>>) {
  const fieldErrors = error.flatten().fieldErrors;

  return (
    fieldErrors.name?.[0] ||
    fieldErrors.phone?.[0] ||
    fieldErrors.email?.[0] ||
    fieldErrors.message?.[0] ||
    "Please check the form and complete all required fields."
  );
}
