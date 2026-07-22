import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminStudyCaseForm } from "@/components/admin-study-case-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewStudyCasePage() {
  await requireAdmin();
  return <section className="section-pad"><div className="container-shell grid gap-6">
    <Link href="/admin/study-cases" className="flex w-fit items-center gap-2 font-bold text-slate-600 transition hover:text-ink"><ArrowLeft size={18} aria-hidden />Back to study cases</Link>
    <div><p className="font-bold uppercase tracking-[0.16em] text-energy-green">Study cases</p><h1 className="mt-2 text-4xl font-black text-ink">Add a new case</h1><p className="mt-3 text-slate-600">Create the card, write its description, and add up to five project pictures.</p></div>
    <AdminStudyCaseForm />
  </div></section>;
}
