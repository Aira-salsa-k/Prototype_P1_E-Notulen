import { MeetingTypeVariant } from "@/types/meeting";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockUsers } from "@/mocks/user";

const allMembers = generateMockAnggota();
const now = new Date();

/**
 * Helper untuk menentukan jabatan rapat berdasarkan index
 * jabatan adalah jabatan dalam rapat (Ketua, Wakil Ketua I, Sekretaris, Anggota)
 * BUKAN jabatan struktural (KETUA DPRD, ANGGOTA DPRD)
 */
const getJabatanRapat = (index: number): string => {
  if (index === 0) return "Ketua";
  if (index === 1) return "Wakil Ketua I";
  if (index === 2) return "Sekretaris";
  return "Anggota";
};

/**
 * Meeting Type Variants - Template peserta rapat berdasarkan jenis rapat
 *
 * PENTING: ID di sini disesuaikan dengan ID subMeetingCategoryID yang digunakan di meeting.ts
 * Agar sinkronisasi data absensi berjalan otomatis dengan jabatan rapat yang benar.
 */
export const mockMeetingTypeVariants: MeetingTypeVariant[] = [];
