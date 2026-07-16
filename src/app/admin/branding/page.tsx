import { Palette } from "lucide-react";

import { AdminBrandingForm } from "@/components/admin-branding-form";
import { requireAdmin } from "@/lib/auth";
import { getSiteLogo } from "@/lib/site-branding";

export const dynamic = "force-dynamic";

export default async function AdminBrandingPage() {
  await requireAdmin();
  const currentLogo = await getSiteLogo();

  return (
    <section className="section-pad">
      <div className="container-shell grid gap-8">
        <div>
          <p className="font-bold uppercase tracking-[0.16em] text-energy-green">Branding</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Manage site logo</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Upload a replacement logo for the site header and footer. If no custom logo is uploaded, the built-in logo stays in place.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-energy-green">
              <Palette size={20} aria-hidden />
            </span>
            <div>
              <div className="font-black text-ink">Site branding</div>
              <div className="text-sm text-slate-500">Header and footer logo</div>
            </div>
          </div>
          <AdminBrandingForm currentLogo={currentLogo} />
        </div>
      </div>
    </section>
  );
}
