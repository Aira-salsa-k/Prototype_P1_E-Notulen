import { create } from "zustand";
import {
  AttendanceRecord,
  AttendanceStatus,
  ParticipantType,
} from "@/types/attendance";
import { NotulenSection, NotulenPoint, MeetingMinutes } from "@/types/notulen";
import { mockNotulenSections, mockMeetingMinutes } from "@/mocks/notulen";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";

interface NotulenState {
  currentMeetingId: string | null;

  // Attendance State
  attendance: AttendanceRecord[];

  // Minutes State
  sections: NotulenSection[];
  points: Record<string, NotulenPoint[]>; // keyed by sectionId
  minutesData: MeetingMinutes | null;

  actions: {
    initializeMeeting: (meetingId: string) => void;

    // Attendance Actions
    // markAttendance: (recordId: string, status: AttendanceStatus) => void;
    // setAttendanceList: (records: AttendanceRecord[]) => void;

    // Minutes Actions
    addSection: (section: NotulenSection) => void;
    addPoint: (sectionId: string, point: NotulenPoint) => void;
    updatePoint: (sectionId: string, pointId: string, content: string) => void;
    deletePoint: (sectionId: string, pointId: string) => void;

    toggleSectionLock: (sectionId: string, userId: string) => void;
    setSectionLock: (
      sectionId: string,
      isLocked: boolean,
      userId: string,
    ) => void;

    updateConclusion: (content: string) => void;
    updateDecisions: (decisions: string[]) => void;
    updateNotes: (content: string) => void;
    addDocumentation: (url: string) => void;
    removeDocumentation: (url: string) => void;
    updateLampiranAbsensi: (
      type: "anggotaDewan" | "mitraKerja" | "tenagaAhli",
      url: string,
    ) => void;
  };
}

export const useNotulenStore = create<NotulenState>((set, get) => {
  // Helper to sync current state back to MeetingStore for persistence
  const syncToMeetingStore = (
    meetingId: string,
    updates: Partial<{
      sections: NotulenSection[];
      points: Record<string, NotulenPoint[]>;
      minutesData: MeetingMinutes | null;
    }>,
  ) => {
    const { sections, points, minutesData } = get();

    // Transform flat sections and points map into a single structure for persistence
    const sectionsToSave = (updates.sections || sections).map((s) => ({
      ...s,
      points: (updates.points || points)[s.id] || s.points || [],
    }));

    useMeetingStore.getState().actions.updateMeeting(meetingId, {
      notulenSections: sectionsToSave,
      minutesData:
        updates.minutesData !== undefined ? updates.minutesData : minutesData,
    });
  };

  return {
    currentMeetingId: null,
    attendance: [],
    sections: [],
    points: {},
    minutesData: null,

    actions: {
      initializeMeeting: (meetingId) => {
        // Isolation Check: If already loaded the same meeting, don't reset to avoid data loss
        if (get().currentMeetingId === meetingId) return;

        // 1. Try to load from MeetingStore first (Persistence Layer)
        const meetingInStore = useMeetingStore
          .getState()
          .meetings.find((m) => m.id === meetingId);

        if (meetingInStore?.notulenSections?.length) {
          set({
            currentMeetingId: meetingId,
            sections: meetingInStore.notulenSections,
            points: meetingInStore.notulenSections.reduce(
              (acc, section) => {
                acc[section.id] = section.points || [];
                return acc;
              },
              {} as Record<string, NotulenPoint[]>,
            ),
            minutesData: meetingInStore.minutesData || null,
          });
          return;
        }

        // 2. Fallback: Load from mocks if no user-generated data exists yet
        const filteredMockSections = mockNotulenSections.filter(
          (s) => s.meetingID === meetingId,
        );

        set({
          currentMeetingId: meetingId,
          sections: filteredMockSections,
          points: filteredMockSections.reduce(
            (acc, section) => {
              acc[section.id] = section.points;
              return acc;
            },
            {} as Record<string, NotulenPoint[]>,
          ),
          minutesData: mockMeetingMinutes.find(
            (m) => m.meetingId === meetingId,
          ) || {
            id: "minutes-" + meetingId,
            meetingId: meetingId,
            decisions: [],
            dokumentasi: [],
            lampiranAbsensi: {},
            isSigned: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      },

      addSection: (section) => {
        set((state) => {
          const newSections = [...state.sections, section];
          syncToMeetingStore(state.currentMeetingId!, {
            sections: newSections,
          });
          return { sections: newSections };
        });
      },

      addPoint: (sectionId, point) => {
        set((state) => {
          const currentPoints = state.points[sectionId] || [];
          const newPointsMap = {
            ...state.points,
            [sectionId]: [...currentPoints, point],
          };
          syncToMeetingStore(state.currentMeetingId!, { points: newPointsMap });
          return { points: newPointsMap };
        });
      },

      updatePoint: (sectionId, pointId, content) => {
        set((state) => {
          const currentPoints = state.points[sectionId] || [];
          const newPointsMap = {
            ...state.points,
            [sectionId]: currentPoints.map((p) =>
              p.id === pointId ? { ...p, content } : p,
            ),
          };
          syncToMeetingStore(state.currentMeetingId!, { points: newPointsMap });
          return { points: newPointsMap };
        });
      },

      deletePoint: (sectionId, pointId) => {
        set((state) => {
          const currentPoints = state.points[sectionId] || [];
          const newPointsMap = {
            ...state.points,
            [sectionId]: currentPoints.filter((p) => p.id !== pointId),
          };
          syncToMeetingStore(state.currentMeetingId!, { points: newPointsMap });
          return { points: newPointsMap };
        });
      },

      toggleSectionLock: (sectionId, userId) => {
        set((state) => {
          const newSections = state.sections.map((s) =>
            s.id === sectionId
              ? {
                  ...s,
                  isLocked: !s.isLocked,
                  lockedBy: !s.isLocked ? userId : undefined,
                }
              : s,
          );
          syncToMeetingStore(state.currentMeetingId!, {
            sections: newSections,
          });
          return { sections: newSections };
        });
      },

      setSectionLock: (sectionId, isLocked, userId) => {
        set((state) => {
          const newSections = state.sections.map((s) =>
            s.id === sectionId
              ? {
                  ...s,
                  isLocked,
                  lockedBy: isLocked ? userId : undefined,
                }
              : s,
          );
          syncToMeetingStore(state.currentMeetingId!, {
            sections: newSections,
          });
          return { sections: newSections };
        });
      },

      updateConclusion: (content) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? { ...state.minutesData, kesimpulan: content }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },

      updateDecisions: (decisions) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? { ...state.minutesData, decisions }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },

      updateNotes: (content) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? { ...state.minutesData, catatan: content }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },

      addDocumentation: (url) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? {
                ...state.minutesData,
                dokumentasi: [...state.minutesData.dokumentasi, url],
              }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },
      removeDocumentation: (url: string) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? {
                ...state.minutesData,
                dokumentasi: state.minutesData.dokumentasi.filter(
                  (u) => u !== url,
                ),
              }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },

      updateLampiranAbsensi: (type, url) => {
        set((state) => {
          const newMinutes = state.minutesData
            ? {
                ...state.minutesData,
                lampiranAbsensi: {
                  ...state.minutesData.lampiranAbsensi,
                  [type]: url,
                },
              }
            : null;
          syncToMeetingStore(state.currentMeetingId!, {
            minutesData: newMinutes,
          });
          return { minutesData: newMinutes };
        });
      },
    },
  };
});
