import nodemailer from "nodemailer";

type InquiryEmail = {
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string | null;
};

export async function sendInquiryEmail(inquiry: InquiryEmail) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || process.env.ADMIN_EMAIL;

  if (!host || !user || !pass || !to) {
    console.warn("Inquiry email skipped because SMTP settings are incomplete.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM || `AI Energy <${user}>`,
    to,
    replyTo: inquiry.email,
    subject: `New AI Energy inquiry${inquiry.productName ? `: ${inquiry.productName}` : ""}`,
    text: [
      `Name: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      `Email: ${inquiry.email}`,
      inquiry.productName ? `Product: ${inquiry.productName}` : undefined,
      "",
      inquiry.message
    ]
      .filter(Boolean)
      .join("\n")
  });
}
