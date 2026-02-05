"use client";

import React, { useState } from "react";
import { useBackupData } from "../hooks/useBackupData";
import { BackupFilter } from "./BackupFilter";
import { BackupList } from "./BackupList";
import { Button, Spinner } from "@heroui/react";
import JSZip from "jszip"; // Requires npm install jszip
import { saveAs } from "file-saver"; // Requires npm install file-saver
import { format } from "date-fns";
import { generateMeetingPDF } from "../utils/generateMeetingPDF";

export const BackupDataPage = () => {
  const {
    filterType,
    setFilterType,
    selectedDate,
    setSelectedDate,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    filteredMeetings,
    totalFiles,
  } = useBackupData();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (filteredMeetings.length === 0) return;

    setIsDownloading(true);
    try {
      const zip = new JSZip();

      // Folder for Notulensi
      const folder = zip.folder("notulensi_backup");

      if (!folder) throw new Error("Failed to create zip folder");

      // Generate PDFs concurrently
      await Promise.all(
        filteredMeetings.map((meeting) => generateMeetingPDF(meeting, folder)),
      );

      // Generate ZIP
      const blob = await zip.generateAsync({ type: "blob" });
      const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
      saveAs(blob, `backup_notulensi_${timestamp}.zip`);
    } catch (error) {
      console.error("Failed to generate backup", error);
      alert("Terjadi kesalahan saat membuat backup.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Backup Data Notulensi
          </h1>
          <p className="text-gray-500">
            Unduh arsip notulensi rapat dalam format ZIP berdasarkan periode
            waktu.
          </p>
        </div>

        <Button
          color="primary"
          size="lg"
          isLoading={isDownloading}
          onPress={handleDownload}
          isDisabled={totalFiles === 0}
          className="font-semibold shadow-md"
        >
          {isDownloading ? "Memproses..." : `Download ZIP (${totalFiles} File)`}
        </Button>
      </div>

      <BackupFilter
        filterType={filterType}
        setFilterType={setFilterType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
      />

      <BackupList meetings={filteredMeetings} />
    </div>
  );
};
