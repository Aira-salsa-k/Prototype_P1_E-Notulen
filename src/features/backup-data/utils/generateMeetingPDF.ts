import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import JSZip from "jszip";
import { MeetingResolved } from "@/types/meeting";
import { MeetingMinutes, NotulenSection, NotulenPoint } from "@/types/notulen";
import {
  mockNotulenSections,
  mockMeetingMinutes,
  mockNotulenProgress,
} from "@/mocks/notulen";
import { mockUsers } from "@/mocks/user";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockNotulis } from "@/mocks/notulis";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

// Helper to load image as base64
const loadImage = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Failed to load image", url, e);
    return null;
  }
};

// Helper to resolve names
const resolveName = (id: string, meeting: MeetingResolved): string => {
  // Try identifying from known participant lists attached to meeting object if available
  // Fallback to mocks
  const user = mockUsers.find((u) => u.id === id);
  if (user) return user.name;

  const anggota = generateMockAnggota().find(
    (a) => a.id === id || a.userId === id,
  );
  if (anggota) {
    const u = mockUsers.find((mu) => mu.id === anggota.userId);
    return u ? u.name : id;
  }

  return id;
};

export const generateMeetingPDF = async (
  meeting: MeetingResolved,
  folder: JSZip,
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // FETCH MOCK DATA SPECIFIC TO MEETING
  // In a real app, this would be passed in or fetched via API
  const sortedSections = mockNotulenSections
    .filter((s) => s.meetingID === meeting.id)
    .sort((a, b) => a.order - b.order);
  // Group points by section
  const points: Record<string, NotulenPoint[]> = {};
  sortedSections.forEach((s) => {
    points[s.id] = s.points || []; // In mock, points are inside section
  });

  const minutes =
    mockMeetingMinutes.find((m) => m.meetingId === meeting.id) || null;

  // --- STYLING CONSTANTS ---
  const margin = 20; // mm
  const pageWidth = 210;
  const contentWidth = pageWidth - margin * 2;
  const logoSize = 25;
  let yPos = 20;

  // --- HEADER (KOP SURAT) ---
  const logoUrl = "/logo-dprk.png";
  const logoBase64 = await loadImage(logoUrl);

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin, 15, logoSize, logoSize);
  }

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM", pageWidth / 2 + 10, 20, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.setFont("times", "normal");
  doc.text("Jln. Trans Irian Arso II, Keerom, Papua", pageWidth / 2 + 10, 26, {
    align: "center",
  });
  doc.text(
    "Telepon: (0967) 123456 | Email: setwan@keerom.go.id",
    pageWidth / 2 + 10,
    31,
    { align: "center" },
  );

  // Line separator
  doc.setLineWidth(0.5);
  doc.line(margin, 42, pageWidth - margin, 42);
  doc.setLineWidth(0.2);
  doc.line(margin, 43, pageWidth - margin, 43);

  yPos = 55;

  // --- NOTULEN TITLE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("NOTULEN RAPAT", pageWidth / 2, yPos, { align: "center" });
  yPos += 7;
  doc.setFontSize(10);
  doc.text(meeting.title.toUpperCase(), pageWidth / 2, yPos, {
    align: "center",
    maxWidth: contentWidth,
  });

  // Adjust yPos based on title height
  const titleLines = doc.splitTextToSize(
    meeting.title.toUpperCase(),
    contentWidth,
  );
  yPos += titleLines.length * 5 + 10;

  // --- METADATA TABLE ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const metaData = [
    ["Masa Sidang", ":", meeting.masaSidang || "-"],
    [
      "Hari / Tanggal",
      ":",
      format(new Date(meeting.date), "dd MMMM yyyy", { locale: id }),
    ],
    ["Waktu", ":", `${meeting.startTime} - ${meeting.endTime} WIT`],
    ["Tempat", ":", meeting.room],
    ["Agenda", ":", meeting.agenda],
    [
      "Pimpinan Rapat",
      ":",
      meeting.pimpinanRapatId
        ? resolveName(meeting.pimpinanRapatId, meeting)
        : "-",
    ],
    [
      "Notulis",
      ":",
      meeting.notulisIds.map((nid) => resolveName(nid, meeting)).join(", "),
    ],
  ];

  autoTable(doc, {
    startY: yPos,
    body: metaData,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 1 },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: "normal" },
      1: { cellWidth: 5 },
      2: { cellWidth: "auto" },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-ignore
  yPos = doc.lastAutoTable.finalY + 10;

  // --- PESERTA RAPAT ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DAFTAR PESERTA RAPAT", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;

  const drawPesertaTable = (title: string, dataIds: string[]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(title, margin, yPos);
    yPos += 3;

    if (!dataIds || dataIds.length === 0) {
      doc.setFont("helvetica", "italic");
      doc.text("Tidak ada data", margin + 5, yPos + 5);
      yPos += 15;
      return;
    }

    autoTable(doc, {
      startY: yPos,
      head: [["NO", "NAMA"]],
      body: dataIds.map((uid, i) => [i + 1, resolveName(uid, meeting)]),
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2, lineColor: [0, 0, 0] },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.1,
      },
      margin: { left: margin, right: margin },
      tableWidth: contentWidth,
    });

    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 8;
  };

  drawPesertaTable(
    "DAFTAR HADIR ANGGOTA INTERNAL DPRK KEEROM",
    meeting.invitedAnggotaDewanIds || [],
  );
  drawPesertaTable(
    "DAFTAR HADIR MITRA KERJA",
    meeting.invitedMitraKerjaIds || [],
  );

  yPos += 5;

  // --- PEMBAHASAN / SECTIONS ---
  if (sortedSections.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("JALANNYA RAPAT", pageWidth / 2, yPos, { align: "center" });
    yPos += 8;

    for (const section of sortedSections) {
      // Check page break
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Speaker Box
      doc.setFillColor(240, 240, 240);
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin, yPos, contentWidth, 8, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(section.displayFormat || "PEMBICARA", margin + 2, yPos + 5.5);
      yPos += 12;

      // Points
      if (section.points && section.points.length > 0) {
        doc.setFont("helvetica", "normal");
        section.points.forEach((point) => {
          const bullet = "•";
          const textLines = doc.splitTextToSize(
            point.content,
            contentWidth - 10,
          );

          // Check page break for points
          if (yPos + textLines.length * 5 > 270) {
            doc.addPage();
            yPos = 20;
          }

          doc.text(bullet, margin + 2, yPos);
          doc.text(textLines, margin + 8, yPos);
          yPos += textLines.length * 5 + 3;
        });
      }
      yPos += 5;
    }
  }

  // --- KEPUTUSAN / CLOSING ---
  doc.addPage();
  yPos = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("HASIL KEPUTUSAN RAPAT", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;

  if (minutes && minutes.decisions && minutes.decisions.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [["NO", "HASIL KEPUTUSAN"]],
      body: minutes.decisions.map((d, i) => [i + 1, d]),
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
      margin: { left: margin, right: margin },
    });
    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 10;
  }

  if (minutes?.catatan) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("CATATAN:", margin, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    const noteLines = doc.splitTextToSize(minutes.catatan, contentWidth);
    doc.text(noteLines, margin, yPos);
    yPos += noteLines.length * 5 + 15;
  }

  // --- SIGNATURES ---
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }

  const dateStr = `Arso, ${format(new Date(meeting.date), "dd MMMM yyyy", { locale: id })}`;
  doc.setFontSize(10);
  doc.text(dateStr, pageWidth - margin, yPos, { align: "right" });
  yPos += 10;

  // Signatures Layout
  // Left: Pimpinan, Right: Sekwan
  const leftX = margin + 20;
  const rightX = pageWidth - margin - 50;

  doc.setFont("helvetica", "bold");
  doc.text("PIMPINAN RAPAT,", leftX, yPos, { align: "center" });
  doc.text("SEKRETARIS DPRK KEEROM,", rightX, yPos, { align: "center" });

  yPos += 25; // Space for signature

  // Placeholder names
  const pimpinanName = meeting.pimpinanRapatId
    ? resolveName(meeting.pimpinanRapatId, meeting)
    : "(......................)";

  // Resolve sekwan
  const sekwanProfile = generateMockSekretarisDewan().find(
    (s) => s.id === meeting.sekretarisId,
  );
  const sekwanUser = mockUsers.find((u) => u.id === sekwanProfile?.userId);
  const sekwanName = sekwanUser?.name || "(......................)";
  const sekwanNip = sekwanProfile?.nip || "....................";

  doc.text(pimpinanName.toUpperCase(), leftX, yPos, { align: "center" });
  doc.setLineWidth(0.3);
  const pWidth = doc.getTextWidth(pimpinanName.toUpperCase());
  doc.line(leftX - pWidth / 2, yPos + 1, leftX + pWidth / 2, yPos + 1); // Underline

  doc.text(sekwanName.toUpperCase(), rightX, yPos, { align: "center" });
  const sWidth = doc.getTextWidth(sekwanName.toUpperCase());
  doc.line(rightX - sWidth / 2, yPos + 1, rightX + sWidth / 2, yPos + 1); // Underline

  yPos += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`NIP. ${sekwanNip}`, rightX, yPos, { align: "center" });

  // --- DOKUMENTASI ---
  if (minutes?.dokumentasi && minutes.dokumentasi.length > 0) {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("DOKUMENTASI KEGIATAN", pageWidth / 2, 20, { align: "center" });

    let imgY = 30;
    for (const imgUrl of minutes.dokumentasi) {
      const imgBase64 = await loadImage(imgUrl);
      if (imgBase64) {
        if (imgY + 80 > 280) {
          doc.addPage();
          imgY = 20;
        }
        // Center image
        // Assume landscape ratio for simplicity or fit to width
        const imgWidth = 120;
        const imgHeight = 80;
        const xPos = (pageWidth - imgWidth) / 2;

        doc.addImage(imgBase64, "JPEG", xPos, imgY, imgWidth, imgHeight);
        imgY += imgHeight + 10;
      }
    }
  }

  // --- LAMPIRAN ABSENSI ---
  const absensi = minutes?.lampiranAbsensi;
  if (absensi && (absensi.anggotaDewan || absensi.mitraKerja)) {
    if (absensi.anggotaDewan) {
      doc.addPage();
      doc.setFont("helvetica", "bold");
      doc.text("LAMPIRAN ABSENSI", pageWidth / 2, 20, { align: "center" });
      doc.text("ANGGOTA DEWAN", pageWidth / 2, 26, { align: "center" });

      const imgBase64 = await loadImage(absensi.anggotaDewan);
      if (imgBase64) {
        doc.addImage(imgBase64, "PNG", margin, 35, contentWidth, 150);
      }
    }
    if (absensi.mitraKerja) {
      doc.addPage();
      doc.setFont("helvetica", "bold");
      doc.text("LAMPIRAN ABSENSI", pageWidth / 2, 20, { align: "center" });
      doc.text("MITRA KERJA", pageWidth / 2, 26, { align: "center" });

      const imgBase64 = await loadImage(absensi.mitraKerja);
      if (imgBase64) {
        doc.addImage(imgBase64, "PNG", margin, 35, contentWidth, 150);
      }
    }
  }

  // SAVE
  const pdfBlob = doc.output("blob");
  const fileName = `Notulensi_${format(new Date(meeting.date), "yyyy-MM-dd")}_${meeting.id}.pdf`;
  folder.file(fileName, pdfBlob);
};
