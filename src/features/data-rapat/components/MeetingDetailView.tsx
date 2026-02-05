"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  PrinterIcon,
  UserIcon,
  IdentificationIcon,
  StarIcon,
  PlayIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/useAuthStore";
import { Select, SelectItem } from "@heroui/select";
import { useRouter } from "next/navigation";

// Store & Mocks
// Store & Mocks
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { mockUsers } from "@/mocks/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { Meeting } from "@/types/meeting";

import { checkIsAdminLike, canManageLifecycle } from "@/lib/auth/permissions";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { useAttendance } from "@/features/notulen/hooks/useAttendance";
import NotulenPreview from "@/features/notulen/components/notulen/NotulenPreview";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";

// Tabs
import TabAbsensi from "@/features/notulen/TabAbsensi";
import TabNotulensi from "@/features/notulen/TabNotulensi";
import TabKesimpulan from "@/features/notulen/TabKesimpulan";
import TabDokumentasi from "@/features/notulen/TabDokumentasi";

interface MeetingDetailViewProps {
  meetingId: string;
  role: "admin" | "notulis" | "anggota_dewan" | "sekwan";
}

export function MeetingDetailView({ meetingId, role }: MeetingDetailViewProps) {
  const router = useRouter();
  const { meetings } = useDataRapatStore();
  const { categories, variants } = useJenisRapatStore();
  const { currentUser } = useAuthStore();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const { actions: notulenActions } = useNotulenStore();
  const { records: participants } = useAttendance(meeting || ({} as Meeting));

  const handleStartMeeting = () => {
    if (!meeting || !currentUser) return;
    if (
      confirm(
        "Mulai rapat sekarang? Setelah dimulai, daftar hadir akan dikunci dan perubahan jenis rapat tidak akan disinkronisasi lagi.",
      )
    ) {
      useDataRapatStore
        .getState()
        .actions.startMeeting(meeting.id, currentUser.id, currentUser.name);
    }
  };

  const handleFinishMeeting = () => {
    if (!meeting || !currentUser) return;
    if (
      confirm(
        "Selesaikan rapat? Pastikan semua notulensi dan kesimpulan sudah final.",
      )
    ) {
      useDataRapatStore
        .getState()
        .actions.finishMeeting(meeting.id, currentUser.id, currentUser.name);
    }
  };

  const handleReopenMeeting = () => {
    if (!meeting || !currentUser) return;
    if (
      confirm(
        "PERINGATAN: Membuka kembali rapat yang sudah selesai.\n\nGunakan fitur ini hanya untuk koreksi darurat. Tindakan ini akan tercatat dalam log audit.",
      )
    ) {
      useDataRapatStore
        .getState()
        .actions.reopenMeeting(meeting.id, currentUser.id, currentUser.name);
    }
  };

  useEffect(() => {
    if (meetingId) {
      notulenActions.initializeMeeting(meetingId);
    }
  }, [meetingId, notulenActions]);

  useEffect(() => {
    const found = meetings.find((m) => m.id === meetingId);
    if (found) {
      setMeeting(found);

      // Auto-set default Pimpinan Rapat if empty and not in read-only mode
      if (
        role !== "anggota_dewan" &&
        !found.pimpinanRapatId &&
        found.invitedAnggotaDewanIds &&
        found.invitedAnggotaDewanIds.length > 0
      ) {
        useDataRapatStore.getState().actions.updateMeeting(found.id, {
          pimpinanRapatId: found.invitedAnggotaDewanIds[0],
        });
      }
    }
  }, [meetingId, meetings, role]);

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <p>Memuat data rapat...</p>
      </div>
    );
  }

  const isReadOnly = role === "anggota_dewan" || meeting.status === "completed";

  // Resolve Names
  const variant = variants.find((v) => v.id === meeting.subMeetingCategoryID);
  const category = categories.find((c) => c.id === meeting.meetingCategoryID);

  const sekwanProfile = generateMockSekretarisDewan().find(
    (s) => s.id === meeting.sekretarisId,
  );
  const sekwanUser = mockUsers.find((u) => u.id === sekwanProfile?.userId);

  const notulisUsers =
    meeting.notulisIds
      ?.map((id) => mockUsers.find((u) => u.id === id))
      .filter(Boolean) || [];

  const formatDateIndo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const getMemberName = (id: string) => {
    // Try finding in mockUsers (userId)
    const user = mockUsers.find((u) => u.id === id);
    if (user) return user.name;

    // Try finding in mockAnggota (anggotaId)
    const anggota = generateMockAnggota().find((a) => a.id === id);
    if (anggota) {
      const u = mockUsers.find((user) => user.id === anggota.userId);
      if (u) return u.name;
    }

    return id || "Belum ditentukan";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* HEADER: Navigation & Metadata */}
      <div className="flex justify-between items-center bg-transparent px-2">
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<ArrowLeftIcon className="w-4 h-4" />}
            onPress={() => router.back()}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Kembali
          </Button>
          {/* <Button
            color="default"
            variant="flat"
            startContent={<PrinterIcon className="w-4 h-4" />}
            className="font-bold text-gray-700"
            onPress={() => window.print()}
          >
            Cetak PDF
          </Button> */}
        </div>

        <div className="flex gap-2 items-center">
          {meeting.status === "scheduled" &&
            canManageLifecycle(currentUser) && (
              <Button
                color="success"
                variant="solid"
                startContent={<PlayIcon className="w-4 h-4" />}
                className="font-black text-white shadow-lg shadow-green-500/30 px-6"
                onPress={handleStartMeeting}
              >
                AKTIFKAN RAPAT (LIVE)
              </Button>
            )}

          {meeting.status === "live" && canManageLifecycle(currentUser) && (
            <Button
              color="danger"
              variant="solid"
              startContent={<CheckBadgeIcon className="w-4 h-4" />}
              className="font-black text-white shadow-sm shadow-red-500/30 px-6"
              onPress={handleFinishMeeting}
            >
              SELESAIKAN & KUNCI RAPAT
            </Button>
          )}

          {meeting.status === "completed" && checkIsAdminLike(currentUser) && (
            <Button
              color="warning"
              variant="flat"
              startContent={<ArrowPathIcon className="w-4 h-4" />}
              className="font-bold text-orange-700 bg-orange-50 border border-orange-200"
              onPress={handleReopenMeeting}
            >
              BUKA KEMBALI RAPAT
            </Button>
          )}
        </div>
      </div>

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
                    className="font-black border-none animate-pulse bg-red-100 text-red-600 uppercase tracking-tighter"
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
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block mb-1">
                  Dasar Surat
                </span>
                <div className="font-mono text-xs text-blue-600 font-bold break-all">
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
                    onChange={(e) => {
                      useDataRapatStore
                        .getState()
                        .actions.updateMeeting(meeting.id, {
                          pimpinanRapatId: e.target.value,
                        });
                    }}
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
                    <span className="text-sm text-gray-400">
                      Belum ditunjuk
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Force preview mode for Notulis if meeting is completed */}
      {/* CONTENT: Conditional View based on Role */}
      {role === "anggota_dewan" ||
      (role === "notulis" && meeting.status === "completed") ? (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden min-h-[600px]">
            <div className="p-8 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                  {meeting.status === "live"
                    ? "PRATINJAU HASIL RAPAT (LIVE)"
                    : "PRATINJAU HASIL RAPAT"}
                </h3>
                <p className="text-sm text-gray-500">
                  {meeting.status === "live"
                    ? "Pantau jalannya rapat dan draf notulensi secara langsung."
                    : meeting.status === "completed"
                      ? "Hasil notulensi rapat yang telah diselesaikan dan diarsipkan."
                      : "Draf notulensi akan muncul di sini saat rapat diaktifkan oleh petugas."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {meeting.status === "live" && (
                  <>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                    </span>
                    <span className="text-sm font-bold text-blue-700 uppercase">
                      Live Monitoring
                    </span>
                  </>
                )}
                {meeting.status === "completed" && (
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="font-bold"
                  >
                    ARSIP SELESAI
                  </Chip>
                )}
              </div>
            </div>
            <div className="p-8">
              <NotulenPreview meeting={meeting} participants={participants} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[600px] overflow-hidden">
          <Tabs
            aria-label="Meeting Tabs"
            variant="underlined"
            classNames={{
              base: "w-full border-b border-gray-100 px-8 pt-4 bg-gray-50/50",
              tabList:
                "gap-8 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary h-1 rounded-t-full",
              tab: "max-w-fit px-0 h-14",
              tabContent:
                "group-data-[selected=true]:text-primary font-black text-gray-400 uppercase tracking-wider text-xs",
            }}
          >
            <Tab key="absensi" title="Daftar Hadir">
              <div className="p-8">
                <TabAbsensi meeting={meeting} isReadOnly={isReadOnly} />
              </div>
            </Tab>
            <Tab key="notulensi" title="Notulensi Rapat">
              <div className="p-8">
                <TabNotulensi meeting={meeting} isReadOnly={isReadOnly} />
              </div>
            </Tab>
            <Tab key="kesimpulan" title="Kesimpulan">
              <div className="p-8 text-center max-w-3xl mx-auto">
                <TabKesimpulan isReadOnly={isReadOnly} />
              </div>
            </Tab>
            <Tab key="dokumentasi" title="Dokumentasi Visual">
              <div className="p-8">
                <TabDokumentasi isReadOnly={isReadOnly} />
              </div>
            </Tab>
            <Tab key="audit" title="Log Audit">
              <div className="p-8 max-w-4xl mx-auto">
                <div className="flex border-l-2 border-gray-100 ml-4 flex-col gap-8">
                  {(meeting.auditLogs || []).length > 0 ? (
                    [...(meeting.auditLogs || [])]
                      .sort(
                        (a, b) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime(),
                      )
                      .map((log) => (
                        <div key={log.id} className="relative pl-8">
                          <div
                            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                              log.action === "START"
                                ? "bg-green-500"
                                : log.action === "END"
                                  ? "bg-red-500"
                                  : log.action === "CREATE"
                                    ? "bg-blue-500"
                                    : "bg-orange-500"
                            }`}
                          />
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">
                                {log.action}
                              </span>
                              <span className="text-xs text-gray-400 font-medium">
                                {new Date(log.timestamp).toLocaleString(
                                  "id-ID",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                            </div>
                            <div className="text-sm font-bold text-gray-800">
                              {log.details ||
                                (log.action === "START"
                                  ? "Rapat dimulai"
                                  : log.action === "END"
                                    ? "Rapat diselesaikan"
                                    : "Aksi dilakukan")}
                            </div>
                            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                              <UserIcon className="w-3 h-3" />
                              Oleh:{" "}
                              <span className="font-semibold">
                                {log.userName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-10 text-gray-400 italic">
                      Belum ada log aktivitas tercatat.
                    </div>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
