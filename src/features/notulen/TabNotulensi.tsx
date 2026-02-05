"use client";

import { useEffect, useRef, useState } from "react";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import {
  PrinterIcon,
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Meeting } from "@/types/meeting";

// Components
import NotulenEditor from "./components/notulen/NotulenEditor";
import NotulenPreview from "./components/notulen/NotulenPreview";
import { NotulenPrintDocument } from "./components/notulen/NotulenPrintDocument";
import { useAttendance } from "./hooks/useAttendance";

interface TabNotulensiProps {
  meeting: Meeting;
  isReadOnly?: boolean;
}

export default function TabNotulensi({
  meeting,
  isReadOnly = false,
}: TabNotulensiProps) {
  const { sections, points, actions, minutesData } = useNotulenStore();
  const [activeTab, setActiveTab] = useState("editor");
  const printTriggerRef = useRef<boolean>(false);

  // Meeting Isolation: Initialize store every time we enter a different meeting
  useEffect(() => {
    if (meeting?.id) {
      actions.initializeMeeting(meeting.id);
    }
  }, [meeting?.id, actions]);

  // We reuse useAttendance hook here just to get the *latest* participant list
  // (because TabAbsensi might have updated the meeting store, and we want to reflect that)
  // However, useAttendance needs 'meeting' prop.
  // Ideally, we should pull from useDataRapatStore directly if 'meeting' prop is stale,
  // but let's trust the 'meeting' prop or the store sync.

  // Actually, to get "all participants including newly added ones", we should rely on what `TabAbsensi` does.
  // `useAttendance` returns `records` which is the complete attendance list.
  const { records: participants } = useAttendance(meeting);

  // Trigger print mechanism
  const handlePrint = () => {
    // We defer the print call slightly to ensure the hidden print document is rendered
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center print:hidden">
        <Tabs
          aria-label="Notulen Mode"
          color="primary"
          variant="bordered"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab
            key="editor"
            title={
              <div className="flex items-center space-x-2">
                <PencilSquareIcon className="w-4 h-4" />
                <span>Tulis Notulen</span>
              </div>
            }
          />
          <Tab
            key="preview"
            title={
              <div className="flex items-center space-x-2">
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                <span>Preview Hasil</span>
              </div>
            }
          />
        </Tabs>

        <Button
          color="secondary"
          variant="flat"
          startContent={<PrinterIcon className="w-4 h-4" />}
          onPress={handlePrint}
        >
          Cetak PDF
        </Button>
      </div>

      {/* CONTENT AREA */}
      <div className="print:hidden">
        {activeTab === "editor" ? (
          <NotulenEditor
            meetingId={meeting.id}
            isReadOnly={isReadOnly}
            participants={participants}
          />
        ) : (
          <NotulenPreview meeting={meeting} participants={participants} />
        )}
      </div>

      {/* HIDDEN PRINT DOCUMENT */}
      <NotulenPrintDocument
        meeting={meeting}
        participants={participants}
        sections={sections}
        points={points}
        minutesData={minutesData}
      />

      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body * {
            visibility: hidden;
          }
          #notulen-print-document,
          #notulen-print-document * {
            visibility: visible;
          }
          #notulen-print-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          /* Ensure backgrounds print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
