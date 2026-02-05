import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MeetingCategory, MeetingTypeVariant } from "@/types/meeting";

interface JenisRapatState {
  categories: MeetingCategory[];
  variants: MeetingTypeVariant[];
  isInitialized: boolean;
  _hasHydrated: boolean;
  actions: {
    setCategories: (categories: MeetingCategory[]) => void;
    setVariants: (variants: MeetingTypeVariant[]) => void;
    setHasHydrated: (state: boolean) => void;

    // Core CRUD
    addCategory: (category: MeetingCategory) => void;
    addVariant: (variant: MeetingTypeVariant) => void;
    updateVariant: (variant: MeetingTypeVariant) => void;
    deleteVariant: (id: string) => void;
    deleteCategory: (id: string) => void;

    markAsInitialized: () => void;
  };
}

export const useJenisRapatStore = create<JenisRapatState>()(
  persist(
    (set) => ({
      categories: [],
      variants: [],
      isInitialized: false,
      _hasHydrated: false,
      actions: {
        setCategories: (categories) => set({ categories }),
        setVariants: (variants) => set({ variants }),
        setHasHydrated: (state) => set({ _hasHydrated: state }),

        addCategory: (category) =>
          set((state) => ({
            categories: [
              ...state.categories,
              {
                ...category,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          })),

        addVariant: (variant) =>
          set((state) => ({
            variants: [
              ...state.variants,
              {
                ...variant,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          })),

        updateVariant: (variant) =>
          set((state) => ({
            variants: state.variants.map((v) =>
              v.id === variant.id ? { ...variant, updatedAt: new Date() } : v,
            ),
          })),

        deleteVariant: (id) =>
          set((state) => ({
            variants: state.variants.filter((v) => v.id !== id),
          })),

        deleteCategory: (id) =>
          set((state) => ({
            categories: state.categories.filter((c) => c.id !== id),
            variants: state.variants.filter((v) => v.categoryId !== id),
          })),

        markAsInitialized: () => set({ isInitialized: true }),
      },
    }),
    {
      name: "jenis-rapat-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true);
      },
      partialize: (state) => ({
        categories: state.categories,
        variants: state.variants,
        isInitialized: state.isInitialized,
      }),
    },
  ),
);

// Helper for easy actions access
export const useJenisRapatActions = () => useJenisRapatStore((s) => s.actions);
