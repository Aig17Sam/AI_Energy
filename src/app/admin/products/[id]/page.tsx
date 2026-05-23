import { notFound } from "next/navigation";

import { updateProduct } from "@/app/admin/actions";
import { AdminProductForm } from "@/components/admin-product-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl">
        <div className="mb-8">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Edit product</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{product.name}</h1>
        </div>
        <AdminProductForm product={product} action={action} />
      </div>
    </section>
  );
}
