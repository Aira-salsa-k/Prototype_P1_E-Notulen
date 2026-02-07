import { SubMeetingCategory } from "@/types/meeting";

/**
 * Sub-kategori rapat berdasarkan jenis kegiatan
 * Setiap sub-kategori terkait dengan kategori rapat tertentu
 */
export const mockSubMeetingCategories: SubMeetingCategory[] = [
  // Rapat Pleno / Paripurna
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

  // Rapat Komisi
  {
    id: "sub-raker-komisi",
    name: "Rapat Kerja Komisi",
    meetingCategoryID: "m1", // Bisa digunakan semua komisi
  },
  {
    id: "sub-rdp-komisi",
    name: "Rapat Dengar Pendapat",
    meetingCategoryID: "m1",
  },
  {
    id: "sub-rdpu-komisi",
    name: "Rapat Dengar Pendapat Umum",
    meetingCategoryID: "m1",
  },
  {
    id: "sub-kunjungan-kerja",
    name: "Kunjungan Kerja",
    meetingCategoryID: "m1",
  },

  // Rapat Badan Anggaran
  {
    id: "sub-banggar-kua-ppas",
    name: "Pembahasan KUA-PPAS",
    meetingCategoryID: "m5",
  },
  {
    id: "sub-banggar-rapbd",
    name: "Pembahasan RAPBD",
    meetingCategoryID: "m5",
  },
  {
    id: "sub-banggar-rka",
    name: "Pembahasan RKA Perubahan",
    meetingCategoryID: "m5",
  },

  // Rapat Badan Musyawarah
  {
    id: "sub-bamus-agenda",
    name: "Penyusunan Agenda Masa Sidang",
    meetingCategoryID: "m6",
  },
  {
    id: "sub-bamus-koordinasi",
    name: "Rapat Koordinasi Internal",
    meetingCategoryID: "m6",
  },

  // Rapat Bapemperda
  {
    id: "sub-bapemperda-ranperda",
    name: "Pembahasan Ranperda",
    meetingCategoryID: "m8",
  },
  {
    id: "sub-bapemperda-prolegda",
    name: "Penyusunan Prolegda",
    meetingCategoryID: "m8",
  },

  // Rapat Badan Kehormatan
  {
    id: "sub-bk-etik",
    name: "Evaluasi Kode Etik",
    meetingCategoryID: "m9",
  },
  {
    id: "sub-bk-pengaduan",
    name: "Pemeriksaan Pengaduan",
    meetingCategoryID: "m9",
  },

  // Pansus
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
