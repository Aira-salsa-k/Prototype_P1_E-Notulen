import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useUIStore } from "@/store/useUIStore";
import { User } from "@/types/user";
import { Meeting } from "@/types/meeting";

export function useMeetingActions() {
  const { actions } = useDataRapatStore();
  const { showNotification } = useUIStore();

  const startMeeting = async (meeting: Meeting, currentUser: User | null) => {
    if (!meeting || !currentUser) return;
    try {
      actions.startMeeting(meeting.id, currentUser.id, currentUser.name);
      showNotification(
        "success",
        "Rapat berhasil dimulai! Daftar hadir dikunci.",
      );
    } catch (error) {
      showNotification("danger", "Gagal memulai rapat. Silakan coba lagi.");
    }
  };

  const finishMeeting = async (meeting: Meeting, currentUser: User | null) => {
    if (!meeting || !currentUser) return;
    try {
      actions.finishMeeting(meeting.id, currentUser.id, currentUser.name);
      showNotification(
        "success",
        "Rapat telah diselesaikan. Mode hitung mundur aktif.",
      );
    } catch (error) {
      showNotification(
        "danger",
        "Gagal menyelesaikan rapat. Silakan coba lagi.",
      );
    }
  };

  return {
    startMeeting,
    finishMeeting,
  };
}
