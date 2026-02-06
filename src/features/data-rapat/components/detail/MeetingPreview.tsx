import { Chip } from "@heroui/chip";
import { Meeting } from "@/types/meeting";
import NotulenPreview from "@/features/notulen/components/notulen/NotulenPreview";

interface MeetingPreviewProps {
  meeting: Meeting;
  participants: any[]; // Use specific type if available
}

export function MeetingPreview({ meeting, participants }: MeetingPreviewProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden min-h-[600px]">
        <div className="p-8 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              {meeting.status === "live"
                ? "PRATINJAU HASIL RAPAT (LIVE)"
                : "PRATINJAU HASIL RAPAT"}
            </h3>
            <p className="text-sm text-gray-500">
              {meeting.status === "live"
                ? "Pantau jalannya rapat dan draf notulensi secara langsung."
                : meeting.status === "completed"
                  ? "Hasil notulensi rapat yang telah diselesaikan dan diarsipkan."
                  : "Draf notulensi akan muncul di sini saat rapat diaktifkan oleh petugas."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {meeting.status === "live" && (
              <>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                <span className="text-sm font-bold text-blue-700 uppercase">
                  Live Monitoring
                </span>
              </>
            )}
            {meeting.status === "completed" && (
              <Chip
                color="success"
                variant="flat"
                size="sm"
                className="font-bold"
              >
                ARSIP SELESAI
              </Chip>
            )}
          </div>
        </div>
        <div className="p-8">
          <NotulenPreview meeting={meeting} participants={participants} />
        </div>
      </div>
    </div>
  );
}
