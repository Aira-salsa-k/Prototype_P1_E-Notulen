import { SekretarisDewanProfile } from "../../../types/sekretaris-dewan";
import { AnggotaDewan } from "../../../types/anggota-dewan";
export interface SekretarisDewanRow {
  id: string;

  userId: string; // dari AnggotaDewan

  // untuk display
  name: string; // dari AnggotaDewan
  jabatan: string; // dari SekretarisDewanProfile
  periode: string; // hasil format // format: "2023 - 2027"
  isActive: boolean;

  // Metadata untuk keperluan operasional (Edit/Detail)
  _meta: {
    originalProfile: SekretarisDewanProfile;
    originalAnggota: AnggotaDewan;
  };
}
