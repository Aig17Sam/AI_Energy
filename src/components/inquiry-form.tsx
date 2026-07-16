"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import { createInquiry } from "@/app/actions/inquiries";

type State = {
  ok?: boolean;
  message?: string;
};

const initialState: State = {};

export function InquiryForm({
  selectedProductId
}: {
  selectedProductId?: string;
}) {
  const [state, action, pending] = useActionState(createInquiry, initialState);

  return (
    <form action={action} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-ink">Send an inquiry</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Share your contact details and home energy setup so AI Energy can respond with quote guidance and next steps.
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
            Full name
          </label>
          <input className="field" id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input className="field" id="phone" name="phone" autoComplete="tel" minLength={6} required />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="field" id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="state">
            State
          </label>
          <select className="field" id="state" name="state" required defaultValue="">
            <option value="" disabled>
              Select state
            </option>
            <option value="ACT">ACT</option>
            <option value="NSW">NSW</option>
            <option value="NT">NT</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="postcode">
            Postcode
          </label>
          <input className="field" id="postcode" name="postcode" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="postal-code" required />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="hasSolar">
          Do you have solar?
        </label>
        <select className="field" id="hasSolar" name="hasSolar" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Planning to install solar">Planning to install solar</option>
          <option value="Not sure">Not sure</option>
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
          minLength={10}
          required
          placeholder="Tell us about your property, existing solar system, energy goals, or preferred battery."
        />
      </div>

      {selectedProductId ? <input type="hidden" name="productId" value={selectedProductId} /> : null}

      <button className="button-primary w-full md:w-fit" type="submit" disabled={pending}>
        <Send size={17} aria-hidden />
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
