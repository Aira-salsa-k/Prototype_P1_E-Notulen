import { SubMeetingCategory } from "@/types/meeting";

/**
 * Sub-kategori rapat berdasarkan jenis kegiatan
 * Setiap sub-kategori terkait dengan kategori rapat tertentu
 */
export const mockSubMeetingCategories: SubMeetingCategory[] = [
  // Rapat Pleno / Paripurna (DI LUAR AKD)
  {
    id: "sub-paripurna-biasa",
    name: "Rapat Paripurna Biasa",
    meetingCategoryID: "m4",
  },
  {
    id: "sub-paripurna-istimewa",
    name: "Rapat Paripurna Istimewa",
    meetingCategoryID: "m4",
  },
  {
    id: "sub-paripurna-lkpj",
    name: "Penyampaian LKPJ Bupati",
    meetingCategoryID: "m4",
  },

  // Pansus (DI LUAR AKD)
  {
    id: "sub-pansus-pembentukan",
    name: "Rapat Pembentukan Pansus",
    meetingCategoryID: "m7",
  },
  {
    id: "sub-pansus-kerja",
    name: "Rapat Kerja Pansus",
    meetingCategoryID: "m7",
  },
];
