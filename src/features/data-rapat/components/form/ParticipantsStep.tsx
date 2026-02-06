"use client";

import { MeetingOfficers } from "./sections/MeetingOfficers";
import { MeetingSchedule } from "./sections/MeetingSchedule";
import { MeetingLocation } from "./sections/MeetingLocation";

export function ParticipantsStep() {
  return (
    <div className="p-10 space-y-6 animate-fade-in w-full h-full">
      {/* FIRST ROW: Petugas | Waktu Pelaksanaan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <MeetingOfficers />
        <MeetingSchedule />
      </div>

      {/* SECOND ROW: Lokasi & Referensi (Full Width) */}
      <MeetingLocation />
    </div>
  );
}
