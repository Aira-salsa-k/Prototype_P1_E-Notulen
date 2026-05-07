import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import JSZip from "jszip";
import React from "react";
import { Meeting } from "@/types/meeting";
import { BackupPDFTemplate } from "../components/BackupPDFTemplate";
import { useKopSuratStore } from "@/features/kop-surat/store/useKopSuratStore";

export const generateMeetingPDF = async (
  meeting: Meeting,
  folder: JSZip,
) => {
  try {
    const config = useKopSuratStore.getState().config;

    const blob = await pdf(
      <BackupPDFTemplate meeting={meeting} config={config} />
    ).toBlob();

    const fileName = `Notulensi_${format(new Date(meeting.date), "yyyy-MM-dd")}_${meeting.id}.pdf`;
    folder.file(fileName, blob);
  } catch (error) {
    console.error("Failed to generate PDF for meeting", meeting.id, error);
    throw error;
  }
};
