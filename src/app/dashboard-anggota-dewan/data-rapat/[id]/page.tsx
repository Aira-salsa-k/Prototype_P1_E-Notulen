"use client";

import { MeetingDetailView } from "@/features/data-rapat/components/MeetingDetailView";
import { useParams } from "next/navigation";

export default function AnggotaMeetingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <MeetingDetailView meetingId={id} role="anggota_dewan" />;
}
