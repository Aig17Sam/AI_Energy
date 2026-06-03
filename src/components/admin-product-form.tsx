"use client";

import { useActionState } from "react";
import type { Product } from "@prisma/client";

import type { ProductActionState } from "@/app/admin/actions";

type ProductFormProps = {
  product?: Product;
  action: (state: ProductActionState, formData: FormData) => Promise<ProductActionState>;
};

const initialState: ProductActionState = {
  ok: true,
  message: ""
};

export function AdminProductForm({ product, action }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {state.message ? (
        <div className={`rounded-lg p-3 text-sm font-semibold ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product name" name="name" defaultValue={product?.name} minLength={2} required />
        <Field label="Slug" name="slug" defaultValue={product?.slug} placeholder="tesla-powerwall-3" />
        <Field label="Brand" name="brand" defaultValue={product?.brand} minLength={2} required />
        <Field label="Price AUD" name="price" type="number" defaultValue={product?.price.toString()} min={0.01} step="0.01" required />
        <Field label="Capacity" name="capacity" defaultValue={product?.capacity} required />
        <Field label="Usable capacity" name="usableCapacity" defaultValue={product?.usableCapacity || ""} />
        <Field label="Battery chemistry" name="batteryChemistry" defaultValue={product?.batteryChemistry || ""} />
        <Field label="Warranty years" name="warrantyYears" type="number" defaultValue={product?.warrantyYears?.toString() || ""} min={0} step="1" />
        <Field label="Dimensions" name="dimensions" defaultValue={product?.dimensions || ""} />
        <Field label="Weight" name="weight" defaultValue={product?.weight || ""} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="imageFile">
            Upload product image
          </label>
          <input className="field" id="imageFile" name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/avif" />
          <p className="mt-2 text-sm text-slate-500">JPG, PNG, WebP, or AVIF. Maximum 5 MB.</p>
        </div>
        <Field label="Image URL fallback" name="imageUrl" type="url" defaultValue={product?.imageUrl || ""} />
      </div>
      <div>
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea className="field min-h-32" id="description" name="description" minLength={20} required defaultValue={product?.description} />
        <p className="mt-2 text-sm text-slate-500">Use at least 20 characters so product cards and SEO descriptions read properly.</p>
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
      <button className="button-primary w-fit" type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save product"}
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
  required,
  min,
  minLength,
  step
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  minLength?: number;
  step?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="field"
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        min={min}
        minLength={minLength}
        step={step}
      />
    </div>
  );
}
