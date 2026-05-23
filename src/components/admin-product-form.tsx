import type { Product } from "@prisma/client";

type ProductFormProps = {
  product?: Product;
  action: (formData: FormData) => void | Promise<void>;
};

export function AdminProductForm({ product, action }: ProductFormProps) {
  return (
    <form action={action} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product name" name="name" defaultValue={product?.name} required />
        <Field label="Slug" name="slug" defaultValue={product?.slug} placeholder="tesla-powerwall-3" />
        <Field label="Brand" name="brand" defaultValue={product?.brand} required />
        <Field label="Price AUD" name="price" type="number" defaultValue={product?.price.toString()} required />
        <Field label="Capacity" name="capacity" defaultValue={product?.capacity} required />
        <Field label="Usable capacity" name="usableCapacity" defaultValue={product?.usableCapacity || ""} />
        <Field label="Battery chemistry" name="batteryChemistry" defaultValue={product?.batteryChemistry || ""} />
        <Field label="Warranty years" name="warrantyYears" type="number" defaultValue={product?.warrantyYears?.toString() || ""} />
        <Field label="Dimensions" name="dimensions" defaultValue={product?.dimensions || ""} />
        <Field label="Weight" name="weight" defaultValue={product?.weight || ""} />
      </div>
      <Field label="Image URL" name="imageUrl" type="url" defaultValue={product?.imageUrl || ""} />
      <div>
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea className="field min-h-32" id="description" name="description" required defaultValue={product?.description} />
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 font-semibold text-slate-700">
          <input name="isFeatured" type="checkbox" defaultChecked={product?.isFeatured ?? true} />
          Featured
        </label>
        <label className="flex items-center gap-2 font-semibold text-slate-700">
          <input name="isActive" type="checkbox" defaultChecked={product?.isActive ?? true} />
          Active
        </label>
      </div>
      <button className="button-primary w-fit" type="submit">
        Save product
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input className="field" id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} />
    </div>
  );
}
