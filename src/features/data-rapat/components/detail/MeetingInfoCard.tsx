import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Select, SelectItem } from "@heroui/select";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  IdentificationIcon,
  UserIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import { Meeting } from "@/types/meeting";
import { formatDateIndo, getMemberName } from "@/features/data-rapat/utils";

interface MeetingInfoCardProps {
  meeting: Meeting;
  relations: {
    category?: any;
    variant?: any;
    sekwanUser?: any;
    sekwanProfile?: any;
    notulisUsers: any[];
  };
  isReadOnly: boolean;
  onUpdatePimpinan: (id: string) => void;
}

export function MeetingInfoCard({
  meeting,
  relations,
  isReadOnly,
  onUpdatePimpinan,
}: MeetingInfoCardProps) {
  const { category, variant, sekwanUser, sekwanProfile, notulisUsers } =
    relations;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <MeetingTypeBadge
                categoryName={
                  category?.name || meeting.meetingCategoryID || "RAPAT"
                }
                subCategoryName={variant?.subName}
                color={category?.color || "default"}
                size="sm"
              />
              {meeting.status === "live" && (
                <Chip
                  size="sm"
                  color="danger"
                  variant="flat"
                  className="font-black border-none animate-pulse bg-red-100 text-red-600 "
                  startContent={
                    <span className="flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                  }
                >
                  Sedang Berlangsung (LIVE)
                </Chip>
              )}
              {meeting.status === "completed" && (
                <Chip
                  size="sm"
                  color="success"
                  variant="flat"
                  className="font-bold uppercase bg-green-50 text-green-700 border border-green-200"
                  startContent={<CheckBadgeIcon className="w-4 h-4 mr-1" />}
                >
                  Selesai & Diarsipkan
                </Chip>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {meeting.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              {meeting.agenda}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 min-w-[200px]">
            <div className="text-right p-3 bg-gray-50 rounded-xl border border-gray-100 w-full">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block mb-1">
                Masa Sidang
              </span>
              <div className="font-bold text-gray-800">
                {meeting.masaSidang || "-"}
              </div>
            </div>
            <div className="text-right p-3 bg-gray-50 rounded-xl border border-gray-100 w-full">
              <span className="text-[10px] text-gray-400 font-black block mb-1">
                Dasar Surat
              </span>
              <div className="font-mono text-xs font-bold break-all">
                {meeting.dasarSurat || "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <CalendarDaysIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Hari & Tanggal
              </div>
              <div className="font-bold text-gray-900">
                {formatDateIndo(meeting.date)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <ClockIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Waktu Pelaksanaan
              </div>
              <div className="font-bold text-gray-900">
                {meeting.startTime} - {meeting.endTime} WIT
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
              <MapPinIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Lokasi Ruangan
              </div>
              <div className="font-bold text-gray-900">{meeting.room}</div>
            </div>
          </div>
        </div>

        {/* NEW: PERSONNEL METADATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 mt-8 border-t border-gray-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
              <StarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                Pimpinan Rapat
              </div>
              {!isReadOnly ? (
                <Select
                  aria-label="Pilih Pimpinan Rapat"
                  placeholder="Pilih Pimpinan"
                  variant="flat"
                  size="sm"
                  selectedKeys={
                    meeting.pimpinanRapatId ? [meeting.pimpinanRapatId] : []
                  }
                  onChange={(e) => onUpdatePimpinan(e.target.value)}
                  classNames={{
                    trigger:
                      "bg-transparent shadow-none hover:bg-gray-100 -ml-2 h-8 min-h-0",
                    value: "font-bold text-gray-900",
                  }}
                >
                  {(meeting.invitedAnggotaDewanIds || []).map((id) => {
                    const name = getMemberName(id);
                    return (
                      <SelectItem key={id} textValue={name}>
                        {name}
                      </SelectItem>
                    );
                  })}
                </Select>
              ) : (
                <div className="font-bold text-gray-900">
                  {getMemberName(meeting.pimpinanRapatId || "")}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <IdentificationIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Penanggung Jawab (Sekwan)
              </div>
              <div className="font-bold text-gray-900">
                {sekwanUser?.name || "Belum ditentukan"}
              </div>
              <div className="text-xs text-gray-500 italic">
                {sekwanProfile?.jabatan}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Notulis Bertugas
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                {notulisUsers.length > 0 ? (
                  notulisUsers.map((u) => (
                    <Chip
                      key={u?.id}
                      size="sm"
                      variant="flat"
                      color="success"
                      className="font-semibold"
                    >
                      {u?.name}
                    </Chip>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">Belum ditunjuk</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
