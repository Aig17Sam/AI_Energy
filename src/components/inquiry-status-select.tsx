"use client";

import { useState, useTransition } from "react";
import type { InquiryStatus } from "@prisma/client";

import { updateInquiryStatus } from "@/app/admin/actions";

type InquiryStatusSelectProps = {
  inquiryId: string;
  status: InquiryStatus;
};

export function InquiryStatusSelect({ inquiryId, status }: InquiryStatusSelectProps) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(nextStatus: InquiryStatus) {
    setSelectedStatus(nextStatus);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("id", inquiryId);
      formData.set("status", nextStatus);
      await updateInquiryStatus(formData);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <select
        className={`field h-11 min-w-36 font-bold transition ${getInquirySelectClass(selectedStatus)}`}
        value={selectedStatus}
        onChange={(event) => handleStatusChange(event.target.value as InquiryStatus)}
        disabled={isPending}
        aria-label="Inquiry status"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CLOSED">Closed</option>
      </select>
      {isPending ? <span className="text-sm font-semibold text-slate-500">Saving...</span> : null}
    </div>
  );
}

function getInquirySelectClass(status: InquiryStatus) {
  return {
    NEW: "border-emerald-200 bg-emerald-50 text-emerald-900",
    CONTACTED: "border-sky-200 bg-sky-50 text-sky-900",
    CLOSED: "border-slate-200 bg-slate-100 text-slate-700"
  }[status];
}
