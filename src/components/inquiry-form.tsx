"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import type { Product } from "@prisma/client";

import { createInquiry } from "@/app/actions/inquiries";

type State = {
  ok?: boolean;
  message?: string;
};

const initialState: State = {};

export function InquiryForm({
  products,
  selectedProductId
}: {
  products: Pick<Product, "id" | "name">[];
  selectedProductId?: string;
}) {
  const [state, action, pending] = useActionState(createInquiry, initialState);

  return (
    <form action={action} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-ink">Send an inquiry</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Share what you are looking for and AI Energy will respond with product guidance and next steps.
        </p>
      </div>

      {state.message ? (
        <div className={`rounded-lg p-3 text-sm font-semibold ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input className="field" id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input className="field" id="phone" name="phone" autoComplete="tel" required />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="field" id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div>
        <label className="label" htmlFor="productId">
          Product of interest
        </label>
        <select className="field" id="productId" name="productId" defaultValue={selectedProductId || ""}>
          <option value="">General solar battery inquiry</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea
          className="field min-h-36 resize-y"
          id="message"
          name="message"
          required
          placeholder="Tell us about your property, existing solar system, energy goals, or preferred battery."
        />
      </div>

      <button className="button-primary w-full md:w-fit" type="submit" disabled={pending}>
        <Send size={17} aria-hidden />
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
