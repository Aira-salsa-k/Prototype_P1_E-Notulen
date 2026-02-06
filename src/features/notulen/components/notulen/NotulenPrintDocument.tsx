"use client";

import React from "react";
import { formatTanggalID } from "../../utils/dateFormat";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord } from "@/types/attendance";
import { NotulenSection, NotulenPoint, MeetingMinutes } from "@/types/notulen";
import { mockUsers } from "@/mocks/user";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockNotulis } from "@/mocks/notulis";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { KopSuratHeader } from "@/features/kop-surat/components/KopSuratHeader";

interface NotulenPrintDocumentProps {
  meeting: Meeting;
  participants: AttendanceRecord[];
  sections: NotulenSection[];
  points: Record<string, NotulenPoint[]>;
  minutesData: MeetingMinutes | null;
}

export const NotulenPrintDocument = ({
  meeting,
  participants,
  sections,
  points,
  minutesData,
}: NotulenPrintDocumentProps) => {
  // Sort sections based on the timestamp of their first point
  const sortedSections = [...sections]
    .filter((section) => points[section.id]?.length > 0) // Only show sections with points
    .sort((a, b) => {
      const pointsA = points[a.id] || [];
      const pointsB = points[b.id] || [];

      const firstPointTimeA =
        pointsA.length > 0
          ? new Date(pointsA[0].createdAt).getTime()
          : Infinity;
      const firstPointTimeB =
        pointsB.length > 0
          ? new Date(pointsB[0].createdAt).getTime()
          : Infinity;

      return firstPointTimeA - firstPointTimeB;
    });

  // Group attendance
  const dewan = participants.filter((p) => p.type === "ANGGOTA_DEWAN");
  const mitra = participants.filter((p) => p.type === "MITRA_KERJA");
  const ta = participants.filter((p) => p.type === "TENAGA_AHLI");

  // Helper: Resolve Name from ID
  const resolveName = (id: string) => {
    const participant = participants.find(
      (p) => p.entityId === id || p.id === id,
    );
    if (participant) return participant.name;

    const user = mockUsers.find((u) => u.id === id);
    if (user) return user.name;

    const anggota = generateMockAnggota().find((a) => a.id === id);
    if (anggota) {
      const u = mockUsers.find((user) => user.id === anggota.userId);
      if (u) return u.name;
    }

    return id || "Belum ditentukan";
  };

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Resolve Pimpinan Rapat
  const pimpinanNames = meeting.pimpinanRapatId
    ? resolveName(meeting.pimpinanRapatId)
    : (meeting.invitedAnggotaDewanIds || [])
        .map((id) => resolveName(id))
        .join(", ");

  // Resolve Name & NIP Helper
  const resolvePersonData = (
    id: string,
    type: "MEMBER" | "USER" | "SEKWAN" | "NOTULIS",
  ) => {
    if (!id)
      return {
        name: "..........................",
        nip: "...........................................",
      };

    if (type === "NOTULIS") {
      const notulis = mockNotulis.find((n) => n.userID === id);
      const user = mockUsers.find((u) => u.id === id);
      return {
        name: user?.name || "..........................",
        nip: notulis?.NIP || "...........................................",
      };
    }

    const name = resolveName(id);
    return { name, nip: "..........................................." };
  };

  // Resolve Sekwan Data
  const sekwanData = (() => {
    const sekwanProfile = generateMockSekretarisDewan().find(
      (s) => s.id === meeting.sekretarisId,
    );
    const user = mockUsers.find((u) => u.id === sekwanProfile?.userId);
    return {
      name: user?.name || "..........................",
      nip: sekwanProfile?.nip || "...........................................",
    };
  })();

  // Resolve Notulis Data
  const notulis1 = meeting.notulisIds?.[0]
    ? resolvePersonData(meeting.notulisIds[0], "NOTULIS")
    : {
        name: "..........................",
        nip: "...........................................",
      };
  const notulis2 = meeting.notulisIds?.[1]
    ? resolvePersonData(meeting.notulisIds[1], "NOTULIS")
    : {
        name: "..........................",
        nip: "...........................................",
      };

  return (
    <div
      id="notulen-print-document"
      className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] p-0 text-black font-arimo"
    >
      {/* HEADER PAGE 1 (Full Width Content, Padded Line) */}
      <KopSuratHeader
        contentClassName="px-2"
        lineClassName="mx-10"
        logoClassName="ml-8"
      />

      {/* BODY CONTENT (Consistent Side Padding) */}
      <div className="px-10 pb-12">
        {/* Notulen Title */}
        <div className="text-center mb-8">
          <h2 className="font-bold text-lg uppercase">NOTULEN RAPAT</h2>
          <p className="uppercase font-bold text-sm mt-1">{meeting.title}</p>
        </div>

        {/* METADATA SECTION */}
        <table className="w-full text-sm mb-8 border-collapse">
          <tbody>
            <tr>
              <td className="w-32 py-1 align-top">Masa Sidang</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">{meeting.masaSidang}</td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Hari / Tanggal</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">
                {formatTanggalID(meeting.date)}
              </td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Waktu</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">
                {meeting.startTime} - {meeting.endTime}
              </td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Tempat</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">{meeting.room}</td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Agenda</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">{meeting.agenda}</td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Pimpinan Rapat</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">{toTitleCase(pimpinanNames)}</td>
            </tr>
            <tr>
              <td className="w-32 py-1 align-top">Notulis</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top">
                {meeting.notulisIds?.length > 0 ? (
                  <ol className="list-decimal list-outside pl-4 m-0">
                    {meeting.notulisIds.map((id, idx) => (
                      <li key={idx}>{resolveName(id)}</li>
                    ))}
                  </ol>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ATTENDANCE SECTION */}
        <div className="mb-8 font-arimo">
          <h3 className="font-bold uppercase text-md mb-4 text-center">
            DAFTAR PESERTA RAPAT
          </h3>
          {/* 1. INTERNAL DEWAN */}
          <div className="mb-6">
            <h4 className="font-bold text-sm mb-2">
              DAFTAR HADIR ANGGOTA INTERNAL DPRK KEEROM
            </h4>
            <table className="w-full text-sm border border-black border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black px-2 py-1 w-12 text-center">
                    NO
                  </th>
                  <th className="border border-black px-2 py-1 w-1/2 text-center">
                    NAMA
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    JABATAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {dewan.length > 0 ? (
                  dewan.map((p, i) => (
                    <tr key={p.id}>
                      <td className="border border-black px-2 py-1 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {p.name}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {p.jabatan}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-black px-2 py-1 text-center italic"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 2. MITRA KERJA */}
          <div className="mb-6">
            <h4 className="font-bold text-sm mb-2">
              DAFTAR HADIR PEMERINTAH DAERAH KABUPATEN KEEROM/MITRA KERJA
            </h4>
            <table className="w-full text-sm border border-black border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black px-2 py-1 w-12 text-center">
                    NO
                  </th>
                  <th className="border border-black px-2 py-1 w-1/2 text-center">
                    NAMA
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    JABATAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {mitra.length > 0 ? (
                  mitra.map((p, i) => (
                    <tr key={p.id}>
                      <td className="border border-black px-2 py-1 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {p.name}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {p.jabatan ? `(${p.jabatan})` : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-black px-2 py-1 text-center italic"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 3. TENAGA AHLI */}
          <div className="mb-6">
            <h4 className="font-bold text-sm mb-2">DAFTAR HADIR TENAGA AHLI</h4>
            <table className="w-full text-sm border border-black border-collapse">
              <thead>
                <tr className="bg-gray-100 italic">
                  <th className="border border-black px-2 py-1 w-12 text-center">
                    NO
                  </th>
                  <th className="border border-black px-2 py-1 w-1/2 text-center">
                    NAMA
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    JABATAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {ta.length > 0 ? (
                  ta.map((p, i) => (
                    <tr key={p.id}>
                      <td className="border border-black px-2 py-1 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {p.name}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {p.jabatan}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-black px-2 py-1 text-center italic"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* OPENING SECTION */}
        <div className="mb-8 font-arimo text-justify text-sm">
          <p className="mb-4">
            Rapat dimulai oleh{" "}
            <span className="font-bold">{toTitleCase(pimpinanNames)}</span>
          </p>
        </div>

        {/* DISCUSSION FLOW SECTION */}
        <div className="space-y-6 font-arimo text-sm">
          {sortedSections.map((section) => {
            const participant = participants.find(
              (p) =>
                p.entityId === section.participanID ||
                p.id === section.participanID,
            );
            const displayFormat =
              participant?.displayFormat || section.displayFormat;

            return (
              <div key={section.id} className="page-break-inside-avoid mb-6">
                {/* SPEAKER HEADER */}
                <div className="font-bold uppercase mb-2 bg-gray-100 p-1 inline-block border border-gray-300 rounded-sm">
                  {displayFormat}
                </div>

                {/* POINTS */}
                <ul className="text-justify leading-relaxed list-disc pl-5 space-y-2">
                  {(points[section.id] || []).map((point) => (
                    <li key={point.id} className="pl-1 leading-relaxed">
                      {point.content}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CLOSING / KEPUTUSAN */}
        <div className="mt-12 px-10" style={{ pageBreakBefore: "always" }}>
          <h3 className="font-bold text-center text-sm mb-4">
            HASIL KEPUTUSAN RAPAT
          </h3>

          <table className="w-full text-sm border border-black border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100 italic">
                <th className="border border-black px-2 py-1 w-10 text-center">
                  NO
                </th>
                <th className="border border-black px-4 py-1 text-left">
                  HASIL KEPUTUSAN RAPAT
                </th>
              </tr>
            </thead>
            <tbody>
              {minutesData?.decisions && minutesData.decisions.length > 0 ? (
                minutesData.decisions.map((d, i) => (
                  <tr key={i}>
                    <td className="border border-black px-2 py-2 text-center align-top">
                      {i + 1}
                    </td>
                    <td className="border border-black px-4 py-2 text-justify">
                      {d}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="border border-black px-2 py-4 text-center italic"
                  >
                    Belum ada keputusan rapat
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {minutesData?.catatan && (
            <div className="mb-8 text-sm">
              <span className="font-bold underline">CATATAN :</span>
              <div className="mt-2 text-justify whitespace-pre-wrap leading-relaxed">
                {minutesData.catatan}
              </div>
            </div>
          )}

          <div className="space-y-4 text-sm mt-8 border-t border-gray-200 pt-6 italic">
            <p>
              Demikian hasil rapat yang dapat kami tuangkan di dalam Notulen
              Rapat.
            </p>
            <p>Waktu selesai Rapat : {meeting.endTime}</p>
            <p>Terimakasih.</p>
          </div>
        </div>

        {/* SIGNATURES SECTION */}
        <div className="mt-16 page-break-inside-avoid font-arimo text-sm">
          {/* Date Line */}
          <div className="text-right mb-12">
            <p>Arso, {formatTanggalID(meeting.date)}</p>
          </div>

          {/* Pimpinan & Sekwan */}
          <div className="flex justify-between items-start mb-24">
            <div className="text-center w-[250px]">
              <p className="font-bold uppercase mb-20">PIMPINAN RAPAT,</p>
              <p className="font-bold uppercase underline">
                {pimpinanNames || ".........................."}
              </p>
            </div>

            <div className="text-center w-[250px]">
              <p className="font-bold uppercase mb-20">
                SEKRETARIS DPRK KEEROM,
              </p>
              <p className="font-bold uppercase underline">{sekwanData.name}</p>
              <p>NIP. {sekwanData.nip}</p>
            </div>
          </div>

          {/* Notulis */}
          {meeting.notulisIds && meeting.notulisIds.length > 0 && (
            <div
              className={`flex ${meeting.notulisIds.length === 1 ? "justify-center" : "justify-between"} items-start`}
            >
              <div className="text-center w-[250px]">
                <p className="font-bold uppercase mb-20 italic">NOTULISI,</p>
                <p className="font-bold uppercase underline">{notulis1.name}</p>
                <p>NIP. {notulis1.nip}</p>
              </div>

              {meeting.notulisIds.length > 1 && (
                <div className="text-center w-[250px]">
                  <p className="font-bold uppercase mb-20 italic">
                    NOTULIS II,
                  </p>
                  <p className="font-bold uppercase underline">
                    {notulis2.name}
                  </p>
                  <p>NIP. {notulis2.nip}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DOCUMENTATION SECTION */}
        {minutesData?.dokumentasi && minutesData.dokumentasi.length > 0 && (
          <div className="mt-12 pt-12" style={{ pageBreakBefore: "always" }}>
            <div className="text-center mb-12">
              <h2 className="font-bold text-lg uppercase">
                DOKUMENTASI KEGIATAN
              </h2>
              <p className="uppercase font-bold text-sm mt-1">
                {meeting.title}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {minutesData.dokumentasi.map((url, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className="border border-gray-300 p-2 bg-white shadow-sm w-full max-w-[95%]">
                      <img
                        src={url}
                        alt={`Dokumentasi ${index + 1}`}
                        className="w-full h-auto object-contain max-h-[1000px]"
                      />
                    </div>
                  </div>

                  {/* Page break after every 2 photos */}
                  {(index + 1) % 2 === 0 &&
                    index + 1 < minutesData.dokumentasi.length && (
                      <div
                        style={{ pageBreakBefore: "always" }}
                        className="h-16"
                      />
                    )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* LAMPIRAN ABSENSI SECTION */}
        {(minutesData?.lampiranAbsensi?.anggotaDewan ||
          minutesData?.lampiranAbsensi?.mitraKerja ||
          minutesData?.lampiranAbsensi?.tenagaAhli) && (
          <div className="mt-12" style={{ pageBreakBefore: "always" }}>
            {/* 1. Anggota Dewan */}
            {minutesData.lampiranAbsensi.anggotaDewan && (
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="font-bold text-lg uppercase">
                    LAMPIRAN ABSENSI
                  </h2>
                  <p className="uppercase font-bold text-sm mt-1">
                    DAFTAR HADIR ANGGOTA INTERNAL DPRK KEEROM
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={minutesData.lampiranAbsensi.anggotaDewan}
                    alt="Scan Absen Anggota Dewan"
                    className="w-full h-auto object-contain border border-gray-200"
                  />
                </div>
              </div>
            )}

            {/* 2. Mitra Kerja */}
            {minutesData.lampiranAbsensi.mitraKerja && (
              <div className="mb-12" style={{ pageBreakBefore: "always" }}>
                <div className="text-center mb-8 pt-12">
                  <h2 className="font-bold text-lg uppercase">
                    LAMPIRAN ABSENSI
                  </h2>
                  <p className="uppercase font-bold text-sm mt-1">
                    DAFTAR HADIR MITRA KERJA
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={minutesData.lampiranAbsensi.mitraKerja}
                    alt="Scan Absen Mitra Kerja"
                    className="w-full h-auto object-contain border border-gray-200"
                  />
                </div>
              </div>
            )}

            {/* 3. Tenaga Ahli */}
            {minutesData.lampiranAbsensi.tenagaAhli && (
              <div className="mb-12" style={{ pageBreakBefore: "always" }}>
                <div className="text-center mb-8 pt-12">
                  <h2 className="font-bold text-lg uppercase">
                    LAMPIRAN ABSENSI
                  </h2>
                  <p className="uppercase font-bold text-sm mt-1">
                    DAFTAR HADIR TENAGA AHLI
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={minutesData.lampiranAbsensi.tenagaAhli}
                    alt="Scan Absen Tenaga Ahli"
                    className="w-full h-auto object-contain border border-gray-200"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
