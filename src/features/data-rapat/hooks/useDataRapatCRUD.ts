import { useState } from "react";
import { useDataRapatStore } from "../store/useDataRapatStore";
import { useUIStore } from "@/store/useUIStore";
import { Meeting } from "@/types/meeting";
import { nanoid } from "@/lib/utils";

export const useDataRapatCRUD = () => {
  const { actions } = useDataRapatStore();
  const { showNotification } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);

  const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, 800));

  const addMeeting = async (
    data: Omit<Meeting, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsLoading(true);
    try {
      await simulateDelay();
      const newMeeting: Meeting = {
        ...data,
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "scheduled", // Default status to scheduled (terjadwal)
        hasAccess: true, // Default
        accessControl: {
          id: nanoid(),
          meetingId: "",
          isGlobalAccessOn: false,
          isNotulisAccessOn: true,
          isMeetingSpecificAccessOn: false,
          allowedAnggotaDewanIds: [],
          allowedNotulisIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      // Fix accessControl meetingId reference
      newMeeting.accessControl.meetingId = newMeeting.id;

      actions.addMeeting(newMeeting);
      showNotification("success", "Jadwal rapat berhasil dibuat");
      return true;
    } catch (error) {
      console.error(error);
      showNotification("danger", "Gagal membuat jadwal rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeeting = async (id: string, updates: Partial<Meeting>) => {
    setIsLoading(true);
    try {
      await simulateDelay();
      actions.updateMeeting(id, { ...updates, updatedAt: new Date() });
      showNotification("success", "Jadwal rapat berhasil diperbarui");
      return true;
    } catch (error) {
      console.error(error);
      showNotification("danger", "Gagal memperbarui jadwal rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeeting = async (id: string) => {
    setIsLoading(true);
    try {
      await simulateDelay();
      actions.deleteMeeting(id);
      showNotification("success", "Jadwal rapat berhasil dihapus");
      return true;
    } catch (error) {
      console.error(error);
      showNotification("danger", "Gagal menghapus jadwal rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addMeeting,
    updateMeeting,
    deleteMeeting,
  };
};
