import { useState, useRef, useEffect } from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord, ParticipantType } from "@/types/attendance";
import { PrintSettings } from "@/features/notulen/components/attendance/AttendancePrintDocument";
import { DateValue, parseDate, today } from "@internationalized/date";

interface UseAttendancePrintProps {
  meeting: Meeting;
  records: AttendanceRecord[];
  allMembers: { userId: string; name: string; jabatan: string }[];
}

export function useAttendancePrint({
  meeting,
  records,
  allMembers,
}: UseAttendancePrintProps) {
  // Print Logic State & Modal
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [pendingPrintSection, setPendingPrintSection] = useState<{
    type: ParticipantType;
    title: string;
  } | null>(null);

  // Print Settings Form State
  const [printDate, setPrintDate] = useState<DateValue | null>(
    today("Asia/Jakarta"),
  );
  const [printHeaderTitle, setPrintHeaderTitle] = useState("");
  const [selectedSignatoryId, setSelectedSignatoryId] = useState("");
  const [printMode, setPrintMode] = useState<
    "FULL" | "NO_METADATA" | "METADATA_ONLY"
  >("FULL");

  // Output State
  const [printData, setPrintData] = useState<AttendanceRecord[]>([]);
  const [printTitle, setPrintTitle] = useState("");
  const [finalPrintSettings, setFinalPrintSettings] =
    useState<PrintSettings | null>(null);

  const printTriggerRef = useRef<boolean>(false);

  // Effect to trigger print
  useEffect(() => {
    if (printTriggerRef.current) {
      setTimeout(() => {
        window.print();
        printTriggerRef.current = false;
      }, 100);
    }
  }, [printData, finalPrintSettings]);

  const openPrintSettings = (type: ParticipantType, title: string) => {
    setPendingPrintSection({ type, title });
    // Try to parse meeting date, fallback to today
    try {
      setPrintDate(parseDate(meeting.date));
    } catch {
      setPrintDate(today("Asia/Jakarta"));
    }

    if (type === "ANGGOTA_DEWAN") {
      setPrintHeaderTitle("DAFTAR HADIR\nDEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM");
    } else if (type === "MITRA_KERJA") {
      setPrintHeaderTitle("DAFTAR HADIR\nPEMERINTAH DAERAH KABUPATEN KEEROM");
    } else {
      setPrintHeaderTitle(`DAFTAR HADIR TENAGA AHLI\n${meeting.title}`);
    }

    if (allMembers.length > 0) {
      setSelectedSignatoryId(allMembers[0].userId);
    }

    setPrintMode("FULL");
    setIsPrintModalOpen(true);
  };

  const handleConfirmPrint = () => {
    if (!pendingPrintSection) return;

    const filteredData = records.filter(
      (r) => r.type === pendingPrintSection.type,
    );
    const signatoryProfile = allMembers.find(
      (m) => m.userId === selectedSignatoryId,
    );

    const settings: PrintSettings = {
      customDate: printDate?.toString() || "",
      customHeaderTitle: printHeaderTitle,
      signatoryName: signatoryProfile?.name || "",
      signatoryRole: signatoryProfile?.jabatan || "Anggota DPRD",
      mode: printMode,
    };

    setPrintData(filteredData);
    setPrintTitle(pendingPrintSection.title);
    setFinalPrintSettings(settings);

    setIsPrintModalOpen(false);
    printTriggerRef.current = true;
  };

  return {
    isPrintModalOpen,
    setIsPrintModalOpen,
    printDate,
    setPrintDate,
    printHeaderTitle,
    setPrintHeaderTitle,
    selectedSignatoryId,
    setSelectedSignatoryId,
    printMode,
    setPrintMode,
    printData,
    printTitle,
    finalPrintSettings,
    openPrintSettings,
    handleConfirmPrint,
  };
}
