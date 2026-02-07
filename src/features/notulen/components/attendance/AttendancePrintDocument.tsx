import React from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord } from "@/types/attendance";
import { formatTanggalID } from "../../utils/dateFormat";
import { KopSuratHeader } from "@/features/kop-surat/components/KopSuratHeader";

export interface PrintSettings {
  customDate: string;
  customHeaderTitle: string;
  signatoryName: string;
  signatoryRole: string;
  mode: "FULL" | "NO_METADATA" | "METADATA_ONLY";
}

interface AttendancePrintDocumentProps {
  meeting: Meeting;
  title: string;
  data: AttendanceRecord[];
  settings: PrintSettings | null;
}

export const AttendancePrintDocument = ({
  meeting,
  title,
  data,
  settings,
}: AttendancePrintDocumentProps) => {
  if (!settings) return null;

  const isMetadataHidden = settings.mode === "NO_METADATA";
  const isEverythingElseHidden = settings.mode === "METADATA_ONLY";

  // Chunking logic: 22 items per page
  const ITEMS_PER_PAGE = 22;
  const chunks = [];
  if (data.length === 0) {
    chunks.push([]);
  } else {
    for (let i = 0; i < data.length; i += ITEMS_PER_PAGE) {
      chunks.push(data.slice(i, i + ITEMS_PER_PAGE));
    }
  }

  return (
    <div
      id="attendance-print-document"
      className="hidden print:block absolute top-0 left-0 w-full  h-full bg-white z-[9999]"
    >
      {chunks.map((chunk, pageIdx) => (
        <div
          key={pageIdx}
          className={`w-full min-h-screen relative p-0 ${pageIdx < chunks.length - 1 ? "page-break-after-always" : ""}`}
        >
          {/* Kop Surat (Repeated on every page) */}
          <div
            className={`${isEverythingElseHidden ? "invisible" : "visible"}`}
          >
            <KopSuratHeader
              contentClassName="px-2"
              lineClassName="mx-10"
              logoClassName="ml-8"
            />
          </div>

          <div className="px-10 pb-10">
            {/* Title (Repeated on every page) */}
            <div
              className={`text-center mb-2 mt-2 ${isEverythingElseHidden ? "invisible" : "visible"}`}
            >
              <h2
                style={{ fontFamily: "Cambria, serif", fontSize: "10pt" }}
                className="font-bold uppercase text-black whitespace-pre-wrap"
              >
                {settings.customHeaderTitle}
              </h2>
            </div>

            <div
              className={`mb-3 ${isEverythingElseHidden ? "invisible" : "visible"}`}
            >
              <div className="border-b-[1px] border-black"></div>
              <div className="border-b-[3px] border-[#FFFF00] mt-[1px]"></div>
              <div className="border-b-[1px] border-black mt-[1px]"></div>
            </div>

            {/* Metadata Section (Repeated on every page if visible) */}
            <div
              className={`mb-3 ${isMetadataHidden ? "invisible" : "visible"} `}
            >
              <table
                className="w-full text-black"
                style={{ fontFamily: "Cambria, serif", fontSize: "9.5pt" }}
              >
                <tbody>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Masa Sidang
                    </td>
                    <td
                      className="align-top"
                      style={{
                        width: "12px",
                        padding: "1px 0",
                        lineHeight: "1",
                      }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {meeting.masaSidang || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Dasar Surat
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {meeting.dasarSurat || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Hari/Tanggal
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {formatTanggalID(settings.customDate)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Waktu
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {meeting.startTime} - {meeting.endTime}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Tempat
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {meeting.room}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="font-bold align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      Acara
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      :
                    </td>
                    <td
                      className="align-top"
                      style={{ padding: "1px 0", lineHeight: "1" }}
                    >
                      {meeting.title}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table */}
            <div
              className={`border border-black ${isEverythingElseHidden ? "invisible" : "visible"}`}
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FABF8F] text-black border-b border-black text-center">
                  <tr
                    style={{ fontFamily: "Cambria, serif", fontSize: "11pt" }}
                    className="uppercase font-bold"
                  >
                    <th className="px-2 py-1 w-12 border-r border-black">No</th>
                    <th className="px-3 py-1 border-r border-black">
                      Nama Lengkap
                    </th>
                    <th className="px-3 py-1 border-r border-black">Jabatan</th>
                    <th className="px-3 py-1 w-48 border-r border-black">
                      Tanda Tangan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black text-black">
                  {chunk.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center italic text-gray-500"
                      >
                        Tidak ada data {title.toLowerCase()}.
                      </td>
                    </tr>
                  ) : (
                    chunk.map((item, idx) => {
                      const globalIdx = pageIdx * ITEMS_PER_PAGE + idx;
                      return (
                        <tr
                          key={item.id}
                          style={{
                            fontFamily: "Cambria, serif",
                            fontSize: "9.5pt",
                          }}
                        >
                          <td className="px-2 py-[3px] text-center border-r font-medium align-middle">
                            {globalIdx + 1}
                          </td>
                          <td className="px-3 py-[3px] border-r border-black align-middle">
                            <div>{item.name}</div>
                            {item.type === "MITRA_KERJA" &&
                              item.institution &&
                              item.institution !== item.name && (
                                <div className="text-xs mt-1 italic">
                                  {item.institution}
                                </div>
                              )}
                          </td>
                          <td className="px-3 py-[3px] border-r border-black align-middle text-center">
                            {item.jabatan}
                          </td>
                          <td className="px-1 py-[3px] align-middle">
                            <div
                              className={`text-sm ${
                                (globalIdx + 1) % 2 === 0 ? "ml-27" : "ml-4"
                              }`}
                            >
                              {globalIdx + 1}. ...............
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Signatory (Only on the LAST page) */}
            {pageIdx === chunks.length - 1 && (
              <div
                className={`flex justify-end mt-4 page-break-inside-avoid text-black ${isEverythingElseHidden ? "invisible" : "visible"}`}
              >
                <div
                  className="min-w-[250px]"
                  style={{ fontFamily: "Cambria, serif", fontSize: "10pt" }}
                >
                  <p className="font-bold uppercase">DEWAN PERWAKILAN RAKYAT</p>
                  <p className="font-bold uppercase">KABUPATEN KEEROM</p>
                  <p className="font-bold uppercase mb-10">
                    {settings.signatoryRole},
                  </p>
                  <p className="font-bold uppercase">
                    {settings.signatoryName || ".........................."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <style jsx>{`
        .page-break-after-always {
          page-break-after: always;
        }
      `}</style>
    </div>
  );
};
