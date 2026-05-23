"use client";

import { useActionState } from "react";
import { BatteryCharging, Lock } from "lucide-react";

import { loginAdmin } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, { ok: false, message: "" });

  return (
    <section className="section-pad bg-mist-blue">
      <div className="container-shell flex justify-center">
        <form action={action} className="grid w-full max-w-md gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-energy-green">
              <BatteryCharging size={23} aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-black text-ink">Admin login</h1>
              <p className="text-sm text-slate-600">Manage products, prices, and inquiries.</p>
            </div>
          </div>
          {"message" in state && state.message ? (
            <div className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">{String(state.message)}</div>
          ) : null}
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="field" id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input className="field" id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button className="button-primary w-full" type="submit" disabled={pending}>
            <Lock size={17} aria-hidden />
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
