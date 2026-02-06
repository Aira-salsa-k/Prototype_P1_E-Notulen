"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { MeetingFormData } from "../../MeetingFormModal";

export function MeetingAttendeesPreview() {
  const { control } = useFormContext<MeetingFormData>();
  const variants = useJenisRapatStore((state) => state.variants);

  // Use useWatch for better reactivity
  const variantId = useWatch({
    control,
    name: "meetingVariantID",
  });

  // Derive members directly from the variant
  const selectedVariant = variants.find((v) => v.id === variantId);
  const members = selectedVariant?.members || [];

  return (
    <div className="h-full flex flex-col">
      <Card className="bg-white border border-gray-200 text-card-foreground shadow-sm flex-1 flex flex-col">
        <CardBody className="p-0 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">
                  Daftar Undangan Rapat
                </h4>
                <p className="text-[10px] text-gray-600 font-medium">
                  Anggota dewan yang terdaftar
                </p>
              </div>
            </div>
            <Chip
              size="sm"
              color="primary"
              variant="flat"
              className="font-bold text-primary"
            >
              {members.length} Orang
            </Chip>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto">
            {members.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0 z-[5]">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider w-12">
                      No
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                      Nama Peserta
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider w-40">
                      Jabatan Rapat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {members.map((member, index) => (
                    <tr
                      key={member.memberId || index}
                      className={`group hover:bg-indigo-50/50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold group-hover:bg-indigo-800 group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-gray-900 group-hover:text-indigo-900 transition-colors">
                            {member.name}
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium">
                            {member.jabatan || "Anggota Dewan"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-primary/10 text-primary font-semibold text-[10px]"
                        >
                          {member.meetingRole || "Anggota"}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <UserGroupIcon className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Belum ada peserta terdaftar
                </p>
                <p className="text-xs text-gray-400">
                  Pilih Jenis Rapat untuk memuat daftar peserta
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
