import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Battery, Ruler, Scale, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { InquiryForm } from "@/components/inquiry-form";
import { formatCurrency } from "@/lib/format";
import { getActiveProducts, getProductBySlug } from "@/lib/products";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} Price and Specs`,
    description: `${product.name} solar battery information from AI Energy, including price, capacity, warranty, and inquiry options for Australian customers.`,
    openGraph: {
      title: `${product.name} | AI Energy`,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined
    }
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), getActiveProducts()]);

  if (!product || !product.isActive) notFound();

  const specs =
    product.specs && typeof product.specs === "object" && !Array.isArray(product.specs)
      ? Object.entries(product.specs as Record<string, string>)
      : [];
  const specCards: { label: string; value: string; Icon: LucideIcon }[] = [
    { label: "Capacity", value: product.capacity, Icon: Battery },
    { label: "Usable capacity", value: product.usableCapacity || "Confirm on inquiry", Icon: Battery },
    { label: "Chemistry", value: product.batteryChemistry || "Confirm on inquiry", Icon: Zap },
    { label: "Warranty", value: product.warrantyYears ? `${product.warrantyYears} years` : "Confirm on inquiry", Icon: ShieldCheck },
    { label: "Dimensions", value: product.dimensions || "Confirm on inquiry", Icon: Ruler },
    { label: "Weight", value: product.weight || "Confirm on inquiry", Icon: Scale }
  ];

  return (
    <>
      <section className="bg-white py-12">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.88fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist-blue shadow-soft">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-energy-green">
                  <Battery size={88} aria-hidden />
                </div>
              )}
            </div>
          </div>
          <div className="self-center">
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">{product.brand}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-ink md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>
            <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Indicative price from</div>
              <div className="mt-1 text-4xl font-black text-ink">{formatCurrency(product.price.toString())}</div>
              <p className="mt-2 text-sm text-slate-600">
                Final pricing can vary by site requirements, installation scope, switchboard work, and backup settings.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/contact?product=${product.id}`} className="button-primary">
                <Zap size={18} aria-hidden />
                Make inquiry
              </Link>
              <Link href="/products" className="button-secondary">
                Compare products
                <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist-blue">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Specifications</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Battery details</h2>
            <p className="mt-4 text-slate-600">
              Key specs customers often compare when choosing home solar battery storage in Australia.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {specCards.map(({ label, value, Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="mb-3 text-energy-green" size={24} aria-hidden />
                <div className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                <div className="mt-1 text-lg font-black text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {specs.length ? (
        <section className="bg-white py-12">
          <div className="container-shell">
            <h2 className="mb-5 text-2xl font-black text-ink">Additional specs</h2>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              {specs.map(([key, value]) => (
                <div key={key} className="grid gap-2 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[240px_1fr]">
                  <div className="font-bold text-slate-600">{key}</div>
                  <div className="text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad bg-white">
        <div className="container-shell max-w-3xl">
          <InquiryForm products={products} selectedProductId={product.id} />
        </div>
      </section>
    </>
  );
}
