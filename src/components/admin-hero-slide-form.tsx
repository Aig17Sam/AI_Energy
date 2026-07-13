"use client";

import { ImagePlus } from "lucide-react";
import type { HeroSlide } from "@prisma/client";
import { useActionState } from "react";

import { createHeroSlide, type HeroSlideActionState } from "@/app/admin/actions";

const initialState: HeroSlideActionState = {
  ok: true,
  message: ""
};

export function AdminHeroSlideForm({
  slide,
  action = createHeroSlide
}: {
  slide?: HeroSlide;
  action?: (state: HeroSlideActionState, formData: FormData) => Promise<HeroSlideActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {state.message ? (
        <div className={`rounded-lg p-3 text-sm font-semibold ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={slide?.title || ""} placeholder="Built for high-intent customers" />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={slide?.sortOrder.toString() || "0"} step="1" />
      </div>

      <Field label="Click-through link" name="href" defaultValue={slide?.href || ""} placeholder="/products or https://example.com" />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="imageFile">
            Upload image
          </label>
          <input className="field" id="imageFile" name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/avif" />
          <p className="mt-2 text-sm text-slate-500">JPG, PNG, WebP, or AVIF. Maximum 5 MB.</p>
        </div>
        <Field label="Image URL fallback" name="imageUrl" type="url" defaultValue={slide?.imageUrl || ""} placeholder="https://example.com/slide.jpg" />
      </div>

      <label className="flex items-center gap-2 font-semibold text-slate-700">
        <input name="isActive" type="checkbox" defaultChecked={slide?.isActive ?? true} />
        Active
      </label>

      <button className="button-primary w-fit" type="submit" disabled={pending}>
        <ImagePlus size={18} aria-hidden />
        {pending ? "Saving..." : slide ? "Save slide" : "Add slide"}
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
  step
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input className="field" id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} step={step} />
    </div>
  );
}
