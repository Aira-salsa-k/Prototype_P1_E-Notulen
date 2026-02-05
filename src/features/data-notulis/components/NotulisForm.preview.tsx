"use client";

import React from "react";
import { NotulisFormData } from "../types/notulis-form-data";
import clsx from "clsx";

interface Props {
  data: NotulisFormData;
}

export function NotulisFormPreview({ data }: Props) {
  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 font-semibold text-xl">
          {data.name ? data.name.charAt(0) : "?"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-900">
          {data.name || "Nama Notulis"}
        </span>
        <span className="text-sm text-gray-500 font-mono">
          NIP. {data.NIP || "—"}
        </span>
        <span className="text-sm text-blue-600">
          @{data.username || "username"}
        </span>
      </div>

      {/* Status */}
      <div className="ml-auto self-end">
        <span
          className={clsx(
            "text-sm font-medium px-2 py-1 rounded-full",
            data.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-200 text-gray-600",
          )}
        >
          {data.isActive ? "Aktif" : "Tidak Aktif"}
        </span>
      </div>
    </div>
  );
}
