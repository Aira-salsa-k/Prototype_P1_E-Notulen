"use client";

import React from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord } from "@/types/attendance";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import {
  formatTanggalID,
  formatTanggalTanpaHari,
} from "../../utils/dateFormat";
import { KopSuratHeader } from "@/features/kop-surat/components/KopSuratHeader";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";

interface NotulenPreviewProps {
  meeting: Meeting;
  participants: AttendanceRecord[];
}

export default function NotulenPreview({
  meeting,
  participants,
}: NotulenPreviewProps) {
  const { sections, points, minutesData } = useNotulenStore();
  const { sekretarisDewan: allSekwanProfiles, users: allSekwanUsers } =
    useSekretarisDewanStore();
  const { notulisList: allNotulisProfiles, users: allNotulisUsers } =
    useNotulisStore();
  const { anggota: allAnggota, users: allAnggotaUsers } = useAnggotaStore();

  // Consolidate users into one map for easier lookup.
  // Prioritize Sekwan and Notulis stores over Anggota store for more specific 'real data'.
  const allUsers = [...allSekwanUsers, ...allNotulisUsers, ...allAnggotaUsers];

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

  // Group attendance by type
  const dewan = participants.filter((p) => p.type === "ANGGOTA_DEWAN");
  const mitra = participants.filter((p) => p.type === "MITRA_KERJA");
  const ta = participants.filter((p) => p.type === "TENAGA_AHLI");

  // Helper: Resolve Name from ID
  const resolveName = (id: string) => {
    // 1. Try finding in participants (they already have resolved names)
    const participant = participants.find(
      (p) => p.entityId === id || p.id === id,
    );
    if (participant) return participant.name;

    // 2. Try finding in allUsers
    const user = allUsers.find((u) => u.id === id);
    if (user) return user.name;

    // 3. Try finding in allAnggota (for Profile IDs like 'anggota-001')
    const anggota = allAnggota.find((a) => a.id === id);
    if (anggota) {
      const u = allUsers.find((user) => user.id === anggota.userId);
      if (u) return u.name;
    }

    const notulis = allNotulisProfiles.find(
      (n) => n.id === id || n.userID === id,
    );
    if (notulis) {
      const u = allUsers.find((user) => user.id === notulis.userID);
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

  // Resolve Notulis
  const notulisNames = meeting.notulisIds?.map((id) => resolveName(id)) || [];

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
      const notulis = allNotulisProfiles.find(
        (n) => n.id === id || n.userID === id,
      );
      const userId = notulis ? notulis.userID : id;
      const user = allNotulisUsers.find((u) => u.id === userId);
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
    const sekwanProfile = allSekwanProfiles.find(
      (s) => s.id === meeting.sekretarisId || s.userId === meeting.sekretarisId,
    );
    const userId = sekwanProfile ? sekwanProfile.userId : meeting.sekretarisId;
    const user = allSekwanUsers.find((u) => u.id === userId);
    return {
      name: user?.name || "..........................",
      nip: sekwanProfile?.nip || "...........................................",
    };
  })();

  // Resolve All Notulis Data
  const resolvedNotulisList = (meeting.notulisIds || []).map((id) =>
    resolvePersonData(id, "NOTULIS"),
  );

  const notulis1 = resolvedNotulisList[0] || {
    name: "..........................",
    nip: "...........................................",
  };
  const notulis2 = resolvedNotulisList[1] || {
    name: "..........................",
    nip: "...........................................",
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm pt-8 pb-10 px-16 max-w-[210mm] mx-auto min-h-[297mm] text-black font-arimo">
      {/* KOP SURAT PREVIEW */}
      <div className="text-center mb-8 pb-4">
        <KopSuratHeader />
      </div>

      <div className="text-center mb-8">
        <h1 className="font-bold text-lg uppercase mb-2">NOTULEN</h1>
        <p className="uppercase font-bold text-sm mt-1">{meeting.title}</p>
      </div>

      {/* METADATA TABLE */}
      <table className="w-full text-sm mb-8 border-collapse">
        <tbody>
          <tr>
            <td className="w-32 py-0.5 align-top">Masa Sidang</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">{meeting.masaSidang}</td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Hari / Tanggal</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">
              {formatTanggalID(meeting.date)}
            </td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Waktu</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">
              {meeting.startTime} WIT - {meeting.endTime} WIT
            </td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Tempat</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">{meeting.room}</td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Agenda</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">{meeting.agenda}</td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Pimpinan Rapat</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">{pimpinanNames}</td>
          </tr>
          <tr>
            <td className="w-32 py-0.5 align-top">Notulis</td>
            <td className="w-4 py-0.5 align-top">:</td>
            <td className="py-0.5 align-top">
              {resolvedNotulisList.length > 0 ? (
                <ol className="list-decimal list-outside pl-4 m-0">
                  {resolvedNotulisList.map((notulis, idx) => (
                    <li key={idx}>{notulis.name}</li>
                  ))}
                </ol>
              ) : (
                "-"
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ATTENDANCE TABLES */}
      <div className="mb-8">
        <h3 className="font-bold uppercase text-md mb-4 text-center ">
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
                    <td className="border border-black px-2 py-1">{p.name}</td>
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
                <th className="border border-black px-2 py-1 w-1/2 text-center uppercase">
                  NAMA / INSTANSI
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
                    <td className="border border-black px-2 py-1">{p.name}</td>
                    <td className="border border-black px-2 py-1 text-center">
                      {p.jabatan ? `${p.jabatan}` : ""}
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
              {ta.length > 0 ? (
                ta.map((p, i) => (
                  <tr key={p.id}>
                    <td className="border border-black px-2 py-1 text-center">
                      {i + 1}
                    </td>
                    <td className="border border-black px-2 py-1">{p.name}</td>
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

      {/* MINUTES CONTENT */}
      <div className="mb-6">
        <div className="space-y-6">
          {sortedSections.map((section, index) => {
            const participant = participants.find(
              (p) =>
                p.id === section.participanID ||
                p.entityId === section.participanID,
            );
            const displayFormat =
              participant?.displayFormat || section.displayFormat;

            return (
              <div key={section.id}>
                {index === 0 && (
                  <div className="mb-4 text-justify leading-relaxed text-sm">
                    <p>
                      Rapat dimulai oleh{" "}
                      <span className="font-bold">{pimpinanNames}</span>
                    </p>
                  </div>
                )}
                <div className="font-bold uppercase text-sm mb-2 bg-gray-100 p-1 inline-block border border-gray-300 rounded-sm">
                  {displayFormat}
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
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
      </div>

      {/* CLOSING / KEPUTUSAN */}
      <div className="mt-12" style={{ pageBreakBefore: "always" }}>
        <h3 className="font-bold text-center text-sm mb-4">
          HASIL KEPUTUSAN RAPAT
        </h3>

        <table className="w-full text-sm border border-black border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-2 py-1 w-10 text-center">
                NO
              </th>
              <th className="border border-black px-2 py-1 text-left">
                HASIL KEPUTUSAN RAPAT
              </th>
            </tr>
          </thead>
          <tbody>
            {minutesData?.decisions && minutesData.decisions.length > 0 ? (
              minutesData.decisions.map((d, i) => (
                <tr key={i}>
                  <td className="border border-black px-2 py-1 text-center align-top">
                    {i + 1}
                  </td>
                  <td className="border border-black px-2 py-1 text-justify">
                    {d}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="border border-black px-2 py-1 text-center italic"
                >
                  Belum ada keputusan rapat
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {minutesData?.catatan && (
          <div className="mb-6 text-sm">
            <span className="font-bold underline">CATATAN :</span>
            <div className="mt-1 text-justify whitespace-pre-wrap">
              {minutesData.catatan}
            </div>
          </div>
        )}

        <div className="space-y-4 text-sm mt-8">
          <p>
            Demikian hasil rapat yang dapat kami tuangkan di dalam Notulen
            Rapat.
          </p>
          <p>Waktu selesai Rapat : {meeting.endTime} WIT</p>
          <p>Terimakasih.</p>
        </div>
      </div>

      {/* SIGNATURES */}
      <div className="mt-12 page-break-inside-avoid font-arimo text-sm">
        {/* Date Line */}
        <div className="text-right mb-8">
          <p>Arso, {formatTanggalTanpaHari(meeting.date)}</p>
        </div>

        {/* Pimpinan & Sekwan */}
        <div className="flex justify-between items-start mb-24">
          <div className="text-center w-[250px]">
            <p className="font-bold uppercase mb-20">PIMPINAN RAPAT,</p>
            <p className="font-bold uppercase">
              {pimpinanNames || ".........................."}
            </p>
          </div>

          <div className="text-center w-[250px]">
            <p className="font-bold uppercase mb-20">SEKRETARIS DPRK KEEROM,</p>
            <p className="font-bold uppercase underline">{sekwanData.name}</p>
            <p>NIP. {sekwanData.nip}</p>
          </div>
        </div>

        {/* Notulis */}
        {meeting.notulisIds && meeting.notulisIds.length > 0 && (
          <div
            className={`flex ${meeting.notulisIds.length === 1 ? "justify-center" : "justify-between"} items-start`}
          >
            {/* Notulis I */}
            <div className="text-center w-[250px]">
              <p className="font-bold uppercase mb-20">NOTULIS I</p>
              <p className="font-bold uppercase underline">{notulis1.name}</p>
              <p>NIP. {notulis1.nip}</p>
            </div>

            {/* Notulis II */}
            {meeting.notulisIds.length > 1 && (
              <div className="text-center w-[250px]">
                <p className="font-bold uppercase mb-20">NOTULIS II,</p>
                <p className="font-bold uppercase underline">{notulis2.name}</p>
                <p>NIP. {notulis2.nip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DOKUMENTASI KEGIATAN */}
      {minutesData?.dokumentasi && minutesData.dokumentasi.length > 0 && (
        <div style={{ pageBreakBefore: "always" }}>
          <div className="text-center mb-12 mt-20">
            <h2 className="font-bold text-lg uppercase">
              DOKUMENTASI KEGIATAN
            </h2>
            <p className="uppercase font-bold text-sm mt-1">{meeting.title}</p>
          </div>

          <div className="space-y-8">
            {minutesData.dokumentasi.map((url, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className=" p-2 bg-white w-full max-w-[85%] aspect-video flex items-center justify-center overflow-hidden">
                    <img
                      src={url}
                      alt={`Dokumentasi ${index + 1}`}
                      className="w-full h-full object-cover"
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

      {/* LAMPIRAN ABSENSI */}
      {(minutesData?.lampiranAbsensi?.anggotaDewan ||
        minutesData?.lampiranAbsensi?.mitraKerja ||
        minutesData?.lampiranAbsensi?.tenagaAhli) && (
        <div style={{ pageBreakBefore: "always" }}>
          {/* 1. Anggota Dewan */}
          {minutesData.lampiranAbsensi.anggotaDewan && (
            <div className="mb-12 mt-20">
              <div className="text-center mb-8">
                <h2 className="font-bold text-lg uppercase">
                  LAMPIRAN ABSENSI
                </h2>
                <p className="uppercase font-bold text-sm mt-1">
                  DAFTAR HADIR ANGGOTA INTERNAL DPRK KEEROM
                </p>
              </div>
              <div className="p-4 min-h-[500px] flex items-center justify-center">
                <img
                  src={minutesData.lampiranAbsensi.anggotaDewan}
                  alt="Scan Absen Anggota Dewan"
                  className="w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* 2. Mitra Kerja */}
          {minutesData.lampiranAbsensi.mitraKerja && (
            <div style={{ pageBreakBefore: "always" }}>
              <div className="text-center mb-8 mt-20">
                <h2 className="font-bold text-lg uppercase">
                  LAMPIRAN ABSENSI
                </h2>
                <p className="uppercase font-bold text-sm mt-1">
                  DAFTAR HADIR MITRA KERJA
                </p>
              </div>
              <div className="p-4 min-h-[500px] flex items-center justify-center">
                <img
                  src={minutesData.lampiranAbsensi.mitraKerja}
                  alt="Scan Absen Mitra Kerja"
                  className="w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* 3. Tenaga Ahli */}
          {minutesData.lampiranAbsensi.tenagaAhli && (
            <div style={{ pageBreakBefore: "always" }}>
              <div className="text-center mb-8 mt-20">
                <h2 className="font-bold text-lg uppercase">
                  LAMPIRAN ABSENSI
                </h2>
                <p className="uppercase font-bold text-sm mt-1">
                  DAFTAR HADIR TENAGA AHLI
                </p>
              </div>
              <div className="p-4 min-h-[500px] flex items-center justify-center">
                <img
                  src={minutesData.lampiranAbsensi.tenagaAhli}
                  alt="Scan Absen Tenaga Ahli"
                  className="w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
