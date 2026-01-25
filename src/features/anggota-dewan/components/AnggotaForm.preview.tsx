import { AnggotaFormData } from "../types/AnggotaFormData";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKDBadge } from "@/components/ui/badges/AKDBadge";

export function AnggotaFormPreview({ data }: { data: AnggotaFormData }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">
            {data.name?.charAt(0) || "?"}
          </span>
        </div>

        <div>
          <p className="font-semibold">{data.name || "[Nama]"}</p>
          <p className="text-sm text-gray-600">
            {data.jabatan || "[Jabatan]"} •{" "}
            {data.akd.length
              ? data.akd.map((a) => AKD_CONFIG[a]?.label ?? a).join(", ")
              : "[AKD]"}
          </p>
        </div>
      </div>
    </div>
  );
}
