import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Meeting } from "@/types/meeting";

interface DataRapatState {
  meetings: Meeting[];
  selectedMeetingId: string | null;
  isInitialized: boolean;
  _hasHydrated: boolean;
}

interface DataRapatActions {
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  selectMeeting: (id: string | null) => void;
  markAsInitialized: () => void;
  setHasHydrated: (state: boolean) => void;
  startMeeting: (id: string, userId: string, userName: string) => void;
  finishMeeting: (id: string, userId: string, userName: string) => void;
  reopenMeeting: (id: string, userId: string, userName: string) => void;
}

export const useDataRapatStore = create<
  DataRapatState & { actions: DataRapatActions }
>()(
  persist(
    (set) => ({
      meetings: [],
      selectedMeetingId: null,
      isInitialized: false,
      _hasHydrated: false,
      actions: {
        setMeetings: (meetings) => set({ meetings }),
        addMeeting: (meeting) =>
          set((state) => ({ meetings: [meeting, ...state.meetings] })),
        updateMeeting: (id, updates) =>
          set((state) => ({
            meetings: state.meetings.map((m) =>
              m.id === id ? { ...m, ...updates } : m,
            ),
          })),
        deleteMeeting: (id) =>
          set((state) => ({
            meetings: state.meetings.filter((m) => m.id !== id),
          })),
        selectMeeting: (id) => set({ selectedMeetingId: id }),
        markAsInitialized: () => set({ isInitialized: true }),
        setHasHydrated: (state) => set({ _hasHydrated: state }),

        startMeeting: (id: string, userId: string, userName: string) =>
          set((state) => {
            const meeting = state.meetings.find((m) => m.id === id);
            if (!meeting) return {};

            const now = new Date();
            const newAuditLog: any = {
              id: `log-${now.getTime()}`,
              action: "START",
              userId,
              userName,
              timestamp: now,
              details: "Rapat dimulai dan absensi dikunci (snapshot).",
            };

            return {
              meetings: state.meetings.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      status: "live",
                      actualStartTime: now,
                      updatedAt: now,
                      auditLogs: [...(m.auditLogs || []), newAuditLog],
                    }
                  : m,
              ),
            };
          }),

        finishMeeting: (id: string, userId: string, userName: string) =>
          set((state) => {
            const now = new Date();
            const newAuditLog: any = {
              id: `log-${now.getTime()}`,
              action: "END",
              userId,
              userName,
              timestamp: now,
              details: "Rapat diselesaikan. Notulensi difinalisasi.",
            };

            return {
              meetings: state.meetings.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      status: "completed",
                      actualEndTime: now,
                      updatedAt: now,
                      auditLogs: [...(m.auditLogs || []), newAuditLog],
                    }
                  : m,
              ),
            };
          }),

        reopenMeeting: (id: string, userId: string, userName: string) =>
          set((state) => {
            const now = new Date();
            const newAuditLog: any = {
              id: `log-${now.getTime()}`,
              action: "REOPEN",
              userId,
              userName,
              timestamp: now,
              details: "DARURAT: Status dikembalikan ke Live (Koreksi).",
            };

            return {
              meetings: state.meetings.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      status: "live",
                      actualEndTime: undefined,
                      updatedAt: now,
                      auditLogs: [...(m.auditLogs || []), newAuditLog],
                    }
                  : m,
              ),
            };
          }),
      },
    }),
    {
      name: "data-rapat-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true);
      },
      partialize: (state) => ({
        meetings: state.meetings,
        isInitialized: state.isInitialized,
      }),
    },
  ),
);
