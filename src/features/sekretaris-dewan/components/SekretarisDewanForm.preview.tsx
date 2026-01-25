import { PreviewCard } from "@/components/ui/preview/PreviewCard";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";

import clsx from "clsx";
export interface SekretarisDewanPreviewData {
  name: string;
  jabatan: string;
  periode: string;
  isActive: boolean;
}

interface Props {
  data: SekretarisDewanPreviewData;
}

export function SekretarisDewanFormPreview({ data }: Props) {
  
  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
        <span className="text-indigo-600 font-semibold text-xl">
          {data.name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-900">{data.name}</span>
        <span className="text-md text-gray-600">{data.jabatan}</span>
        <span className="text-md text-gray-500">{data.periode}</span>
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