import Image from "next/image";
import Link from "next/link";
import { Edit, ImageIcon, Plus, Trash2 } from "lucide-react";
import { deleteStudyCase } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminStudyCasesPage() {
  await requireAdmin();
  const studyCases = await prisma.studyCase.findMany({ include: { images: { orderBy: { sortOrder: "asc" } } }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return <section className="section-pad"><div className="container-shell grid gap-8">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="font-bold uppercase tracking-[0.16em] text-energy-green">Study cases</p><h1 className="mt-2 text-4xl font-black text-ink">Manage showcase cards</h1><p className="mt-3 text-slate-600">Edit existing cases, manage their pictures, or add a new project.</p></div>
      <Link href="/admin/study-cases/new" className="button-primary shrink-0"><Plus size={18} aria-hidden />Add new case</Link>
    </div>
    <div className="grid gap-4">{studyCases.map((item) => <div key={item.id} className="grid items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr_auto]">
      <div className="relative h-24 overflow-hidden rounded-md bg-mist-blue">{item.images[0] ? <Image src={item.images[0].url} alt="" fill className="object-cover" sizes="140px" /> : <ImageIcon className="m-auto h-full text-energy-green" />}</div>
      <div><div className="font-black text-ink">{item.title}</div><p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.description}</p><div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">{item.images.length}/5 pictures · {item.isActive ? "Visible" : "Hidden"} · Order {item.sortOrder}</div></div>
      <div className="flex gap-2"><Link href={`/admin/study-cases/${item.id}`} className="button-secondary h-10 px-3" aria-label={`Edit ${item.title}`}><Edit size={16} /></Link><form action={deleteStudyCase}><input type="hidden" name="id" value={item.id} /><button className="button-secondary h-10 px-3 text-red-700" aria-label={`Delete ${item.title}`}><Trash2 size={16} /></button></form></div>
    </div>)}{!studyCases.length ? <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center"><ImageIcon className="mx-auto text-energy-green" size={32} aria-hidden /><h2 className="mt-4 text-xl font-black text-ink">No study cases yet</h2><p className="mt-2 text-slate-600">Add your first customer project to show it on the website.</p><Link href="/admin/study-cases/new" className="button-primary mx-auto mt-5 w-fit"><Plus size={18} aria-hidden />Add new case</Link></div> : null}</div>
  </div></section>;
}
