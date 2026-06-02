"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import { deleteProduct } from "@/app/admin/actions";

export function AdminDeleteProductButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="button-secondary h-10 px-3 text-sm text-red-700"
        type="button"
        aria-label={`Delete ${name}`}
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/55 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`delete-${id}-title`}>
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700">
                  <AlertTriangle size={22} aria-hidden />
                </span>
                <div>
                  <h2 id={`delete-${id}-title`} className="text-lg font-black text-ink">
                    Delete product?
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    This will permanently remove <span className="font-bold text-ink">{name}</span> from the catalogue.
                  </p>
                </div>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-ink"
                type="button"
                aria-label="Close delete confirmation"
                onClick={() => setOpen(false)}
              >
                <X size={17} aria-hidden />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">
                Product inquiries already saved in the system will remain, but this product will no longer appear on the public website.
              </p>
              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <button className="button-secondary h-11 text-sm" type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={id} />
                  <ConfirmDeleteButton />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ConfirmDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={pending}>
      <Trash2 size={16} aria-hidden />
      {pending ? "Deleting..." : "Delete product"}
    </button>
  );
}
