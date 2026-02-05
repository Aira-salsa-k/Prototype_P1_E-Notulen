"use client";

import { MeetingDetailView } from "@/features/data-rapat/components/MeetingDetailView";
import { useParams } from "next/navigation";

export default function NotulisMeetingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <MeetingDetailView meetingId={id} role="notulis" />;
}
