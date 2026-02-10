// app/mocks/meeting-category.ts// Mocks cleaned up - variants are now in meeting-variants.ts
import { MeetingCategory } from "@/types/meeting";

const now = new Date();

export const mockMeetingCategories: MeetingCategory[] = [
  {
    id: "m1",
    name: "Komisi I",
    color: "info",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m2",
    name: "Komisi II",
    color: "secondary",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m3",
    name: "Komisi III",
    color: "success",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m4",
    name: "Pleno",
    color: "info",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m5",
    name: "Banggar",
    color: "warning",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m6",
    name: "Bamus",
    color: "info",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m7",
    name: "Pansus",
    color: "secondary",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m8",
    name: "Bapemperda",
    color: "success",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m9",
    name: "BK",
    color: "warning",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },

];
