
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { mockMeetings } from "@/mocks/meeting";
import { Meeting } from "@/types/meeting";
import NotulenWorkspace from "@/features/notulen/NotulenWorkspace";
import { PDFDownloadButton } from "@/components/ui/btn-download.pdf/PDFDownloadButton";

export default function NotulenWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    // Mock Fetch
    const found = mockMeetings.find(m => m.id === resolvedParams.id);
    setMeeting(found || null);
  }, [resolvedParams.id]);

  if (!meeting) {
      return <div>Loading...</div>; // Or not found
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">
                  <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">{meeting.title}</h1>
                  <p className="text-gray-500">{meeting.date} • {meeting.room}</p>
              </div>
          </div>
          <div className="flex gap-2">
             <PDFDownloadButton label="Cetak Absensi" type="attendance"/>
             <PDFDownloadButton label="Cetak Notulen" type="minutes"/>
          </div>
      </div>
      
      <NotulenWorkspace meetingId={meeting.id} />
    </div>
  );
}
