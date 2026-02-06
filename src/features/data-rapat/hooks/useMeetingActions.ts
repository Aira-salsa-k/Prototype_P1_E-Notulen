import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { User } from "@/types/user";
import { Meeting } from "@/types/meeting";

export function useMeetingActions() {
  const { actions } = useDataRapatStore();

  const startMeeting = (meeting: Meeting, currentUser: User | null) => {
    if (!meeting || !currentUser) return;
    if (
      confirm(
        "Mulai rapat sekarang? Setelah dimulai, daftar hadir akan dikunci dan perubahan jenis rapat tidak akan disinkronisasi lagi.",
      )
    ) {
      actions.startMeeting(meeting.id, currentUser.id, currentUser.name);
    }
  };

  const finishMeeting = (meeting: Meeting, currentUser: User | null) => {
    if (!meeting || !currentUser) return;
    if (
      confirm(
        "Selesaikan rapat? Rapat akan masuk mode hitung mundur 5 jam sebelum dikunci permanen.",
      )
    ) {
      actions.finishMeeting(meeting.id, currentUser.id, currentUser.name);
    }
  };

  return {
    startMeeting,
    finishMeeting,
  };
}
