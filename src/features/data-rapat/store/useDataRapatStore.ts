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
            // Audit logs removed as per request

            return {
              meetings: state.meetings.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      status: "live",
                      actualStartTime: now,
                      updatedAt: now,
                    }
                  : m,
              ),
            };
          }),

        finishMeeting: (id: string, userId: string, userName: string) =>
          set((state) => {
            const now = new Date();
            // Audit logs removed as per request

            return {
              meetings: state.meetings.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      // status: "completed", // Removed immediate completion
                      closingStartedAt: now, // Start countdown
                      updatedAt: now,
                    }
                  : m,
              ),
            };
          }),
      },
    }),
    {
      name: "data-rapat-storage",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return new Date(value);
          }
          return value;
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const now = new Date().getTime();
          const fiveHours = 5 * 60 * 60 * 1000;

          const updatedMeetings = state.meetings.map((m) => {
            if (m.status === "live" && m.closingStartedAt) {
              const closingTime =
                new Date(m.closingStartedAt).getTime() + fiveHours;
              if (now > closingTime) {
                return { ...m, status: "completed" as const };
              }
            }
            return m;
          });

          // Update meetings list if any changes were made
          const hasChanges = updatedMeetings.some(
            (m, i) => m.status !== state.meetings[i].status,
          );
          if (hasChanges) {
            state.meetings = updatedMeetings;
          }

          state.actions.setHasHydrated(true);
        }
      },
      partialize: (state) => ({
        meetings: state.meetings,
        isInitialized: state.isInitialized,
      }),
    },
  ),
);
