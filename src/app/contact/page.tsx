import type { Metadata } from "next";

import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Solar Battery Inquiry",
  description:
    "Contact AI Energy for solar battery pricing, product comparison, installation questions, and home battery storage guidance in Australia."
};

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="section-pad bg-mist-blue">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Customer inquiry</p>
          <h1 className="mt-2 text-4xl font-black text-ink md:text-5xl">Request solar battery advice or pricing</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Leave your contact details, location, solar status, and a short message. Your inquiry is saved to the admin
            dashboard and emailed to the business owner when SMTP is configured.
          </p>
        </div>
        <InquiryForm selectedProductId={params.product} />
      </div>
    </section>
  );
}
