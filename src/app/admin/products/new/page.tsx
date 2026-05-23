import { AdminProductForm } from "@/components/admin-product-form";
import { createProduct } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl">
        <div className="mb-8">
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">New product</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Add a solar battery</h1>
        </div>
        <AdminProductForm action={createProduct} />
      </div>
    </section>
  );
}
