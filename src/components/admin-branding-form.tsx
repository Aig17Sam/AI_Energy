"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useActionState } from "react";

import { type BrandingActionState, updateSiteLogo } from "@/app/admin/actions";

const initialState: BrandingActionState = {
  ok: true,
  message: ""
};

export function AdminBrandingForm({
  currentLogo
}: {
  currentLogo?: {
    imageUrl: string;
    alt: string;
  } | null;
}) {
  const [state, formAction, pending] = useActionState(updateSiteLogo, initialState);

  return (
    <form action={formAction} className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {state.message ? (
        <div className={`rounded-lg p-3 text-sm font-semibold ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Current logo</div>
          <div className="flex h-28 items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
            {currentLogo ? (
              <Image src={currentLogo.imageUrl} alt={currentLogo.alt} width={180} height={72} className="max-h-full w-auto object-contain" />
            ) : (
              <div className="text-sm text-slate-500">Using built-in logo</div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="label" htmlFor="imageFile">
              Upload logo image
            </label>
            <input className="field" id="imageFile" name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/avif" />
            <p className="mt-2 text-sm text-slate-500">JPG, PNG, WebP, or AVIF. Maximum 5 MB.</p>
          </div>

          <Field label="Image URL fallback" name="imageUrl" type="url" defaultValue={currentLogo?.imageUrl || ""} placeholder="https://..." />
          <Field label="Alt text" name="alt" defaultValue={currentLogo?.alt || ""} placeholder="AI Energy logo" />
        </div>
      </div>

      <button className="button-primary w-fit" type="submit" disabled={pending}>
        <ImagePlus size={18} aria-hidden />
        {pending ? "Saving..." : "Update logo"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input className="field" id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}
