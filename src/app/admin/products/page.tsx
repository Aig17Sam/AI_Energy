import Image from "next/image";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";

import { AdminDeleteProductButton } from "@/components/admin-delete-product-button";
import { formatCurrency } from "@/lib/format";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Products</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Manage product catalogue</h1>
          </div>
          <Link href="/admin/products/new" className="button-primary">
            <Plus size={18} aria-hidden />
            Add product
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid min-w-[860px] grid-cols-[90px_1.4fr_0.8fr_0.8fr_0.7fr_170px] gap-4 border-b border-slate-200 bg-slate-50 p-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
            <div>Image</div>
            <div>Name</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="overflow-x-auto">
            {products.map((product) => (
              <div key={product.id} className="grid min-w-[860px] grid-cols-[90px_1.4fr_0.8fr_0.8fr_0.7fr_170px] items-center gap-4 border-b border-slate-100 p-4 last:border-b-0">
                <div className="relative h-14 w-20 overflow-hidden rounded-md bg-mist-blue">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="80px" />
                  ) : null}
                </div>
                <div>
                  <div className="font-black text-ink">{product.name}</div>
                  <div className="text-sm text-slate-500">{product.brand}</div>
                </div>
                <div className="text-sm font-semibold text-slate-700">{product.capacity}</div>
                <div className="font-black text-ink">{formatCurrency(product.price.toString())}</div>
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${product.isActive ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                    {product.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}`} className="button-secondary h-10 px-3 text-sm" aria-label={`Edit ${product.name}`}>
                    <Edit size={16} aria-hidden />
                  </Link>
                  <AdminDeleteProductButton id={product.id} name={product.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
