"use client";

import { MeetingMainInfo } from "./sections/MeetingMainInfo";
import { MeetingAgenda } from "./sections/MeetingAgenda";
import { MeetingAttendeesPreview } from "./sections/MeetingAttendeesPreview";

export function MeetingInfoStep() {
  return (
    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in w-full h-full">
      {/* LEFT COLUMN: Detail Utama + Agenda */}
      <div className="space-y-6">
        <MeetingMainInfo />
        <MeetingAgenda />
      </div>

      {/* RIGHT COLUMN: Preview Peserta */}
      <MeetingAttendeesPreview />
    </div>
  );
}
