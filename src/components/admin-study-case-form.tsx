"use client";

import Image from "next/image";
import { Save } from "lucide-react";
import type { StudyCase, StudyCaseImage } from "@prisma/client";
import { type FormEvent, useActionState, useState } from "react";
import { saveStudyCase, type StudyCaseActionState } from "@/app/admin/actions";

const initialState: StudyCaseActionState = { ok: true, message: "" };

export function AdminStudyCaseForm({ studyCase }: { studyCase?: StudyCase & { images: StudyCaseImage[] } }) {
  const action = saveStudyCase.bind(null, studyCase?.id || null);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [clientError, setClientError] = useState("");

  function validateBeforeSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const description = String(data.get("description") || "").trim();
    const removedCount = data.getAll("removeImageId").length;
    const files = data.getAll("imageFiles").filter((value) => value instanceof File && value.size > 0) as File[];
    const urls = String(data.get("imageUrls") || "").split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
    const pictureCount = (studyCase?.images.length || 0) - removedCount + files.length + urls.length;
    let error = "";

    if (title.length < 2) error = "Title must contain at least 2 characters.";
    else if (description.length < 10) error = "Description must contain at least 10 characters.";
    else if (pictureCount < 1) error = "Add at least one picture.";
    else if (pictureCount > 5) error = "Each study case can have no more than 5 pictures.";
    else if (files.some((file) => !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type))) error = "Pictures must be JPG, PNG, WebP, or AVIF files.";
    else if (files.some((file) => file.size > 5 * 1024 * 1024)) error = "Each picture must be 5 MB or smaller.";
    else if (urls.some((url) => { try { new URL(url); return false; } catch { return true; } })) error = "Every image URL must be a valid URL.";

    if (error) {
      event.preventDefault();
      setClientError(error);
      form.querySelector("[aria-invalid='true']")?.removeAttribute("aria-invalid");
      if (title.length < 2) (form.elements.namedItem("title") as HTMLElement | null)?.setAttribute("aria-invalid", "true");
      else if (description.length < 10) (form.elements.namedItem("description") as HTMLElement | null)?.setAttribute("aria-invalid", "true");
      return;
    }
    setClientError("");
  }

  const message = clientError || state.message;
  const messageIsError = Boolean(clientError) || !state.ok;
  return <form action={formAction} onSubmit={validateBeforeSubmit} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    {message ? <div role="alert" className={`rounded-lg p-3 text-sm font-semibold ${messageIsError ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>{message}</div> : null}
    <div className="grid gap-4 md:grid-cols-[1fr_160px]">
      <div><label className="label" htmlFor="title">Card title</label><input className="field" id="title" name="title" required minLength={2} defaultValue={studyCase?.title || ""} /></div>
      <div><label className="label" htmlFor="sortOrder">Sort order</label><input className="field" id="sortOrder" name="sortOrder" type="number" defaultValue={studyCase?.sortOrder || 0} /></div>
    </div>
    <div><label className="label" htmlFor="description">Description</label><textarea className="field min-h-32" id="description" name="description" required minLength={10} defaultValue={studyCase?.description || ""} /></div>
    {studyCase?.images.length ? <div><div className="label">Current pictures</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{studyCase.images.map((item) => <label key={item.id} className="overflow-hidden rounded-lg border border-slate-200"><div className="relative aspect-[4/3]"><Image src={item.url} alt="" fill className="object-cover" sizes="180px" /></div><span className="flex items-center gap-2 p-2 text-sm font-semibold text-red-700"><input type="checkbox" name="removeImageId" value={item.id} /> Remove</span></label>)}</div></div> : null}
    <div><label className="label" htmlFor="imageFiles">Upload pictures</label><input className="field" id="imageFiles" name="imageFiles" type="file" multiple accept="image/png,image/jpeg,image/webp,image/avif" /><p className="mt-2 text-sm text-slate-500">Up to 5 pictures total, 5 MB each.</p></div>
    <div><label className="label" htmlFor="imageUrls">Image URLs (optional)</label><textarea className="field min-h-24" id="imageUrls" name="imageUrls" placeholder="One direct image URL per line" /></div>
    <label className="flex items-center gap-2 font-semibold text-slate-700"><input name="isActive" type="checkbox" defaultChecked={studyCase?.isActive ?? true} /> Visible on website</label>
    <button className="button-primary w-fit" type="submit" disabled={pending}><Save size={18} aria-hidden />{pending ? "Saving..." : studyCase ? "Save card" : "Add card"}</button>
  </form>;
}
