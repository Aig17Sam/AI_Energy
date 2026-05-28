import nodemailer from "nodemailer";

type InquiryEmail = {
  inquiryId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string | null;
  productPrice?: string | null;
  createdAt: Date;
};

export async function sendInquiryEmail(inquiry: InquiryEmail) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.QUOTE_EMAIL_TO || process.env.MAIL_TO || process.env.ADMIN_EMAIL;

  if (!host || !user || !pass || !to) {
    throw new Error("Quote email settings are incomplete. Check SMTP_HOST, SMTP_USER, SMTP_PASS, and QUOTE_EMAIL_TO.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass }
  });

  const submittedAt = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
  }).format(inquiry.createdAt);

  const productLine = inquiry.productName
    ? `${inquiry.productName}${inquiry.productPrice ? ` (${inquiry.productPrice})` : ""}`
    : "General solar battery quote";

  await transporter.sendMail({
    from: process.env.MAIL_FROM || `AI Energy <${user}>`,
    to,
    replyTo: inquiry.email,
    subject: `New AI Energy quote request: ${productLine}`,
    text: [
      "New AI Energy quote request",
      "",
      `Inquiry ID: ${inquiry.inquiryId}`,
      `Submitted: ${submittedAt}`,
      `Product: ${productLine}`,
      "",
      `Customer: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      `Email: ${inquiry.email}`,
      "",
      "Message:",
      inquiry.message,
      "",
      "Reply directly to this email to contact the customer."
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#10202b">
        <div style="background:#10202b;color:#fff;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;font-size:24px">New AI Energy quote request</h1>
          <p style="margin:8px 0 0;color:#d8e5e2">A customer has requested solar battery pricing or advice.</p>
        </div>
        <div style="border:1px solid #d8e5e2;border-top:0;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            ${emailRow("Inquiry ID", inquiry.inquiryId)}
            ${emailRow("Submitted", submittedAt)}
            ${emailRow("Product", productLine)}
            ${emailRow("Customer", inquiry.name)}
            ${emailRow("Phone", inquiry.phone)}
            ${emailRow("Email", inquiry.email)}
          </table>
          <div style="margin-top:24px;padding:18px;background:#f7fbfa;border:1px solid #d8e5e2;border-radius:8px">
            <div style="font-weight:700;margin-bottom:8px">Customer message</div>
            <div style="line-height:1.6;white-space:pre-wrap">${escapeHtml(inquiry.message)}</div>
          </div>
          <p style="margin-top:24px;color:#526773">Reply directly to this email to contact the customer.</p>
        </div>
      </div>
    `
  });
}

function emailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #edf3f2;color:#526773;font-weight:700;width:140px">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #edf3f2">${escapeHtml(value)}</td>
    </tr>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
