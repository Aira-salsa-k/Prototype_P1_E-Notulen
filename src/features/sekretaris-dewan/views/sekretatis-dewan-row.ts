import { SekretarisDewanProfile } from "../../../types/sekretaris-dewan";
import { AnggotaDewan } from "../../../types/anggota-dewan";
export interface SekretarisDewanRow {
  id: string;

  // untuk display
  name: string; // dari SekretarisDewanProfile
  username: string; // dari SekretarisDewanProfile
  nip: string; // dari SekretarisDewanProfile
  jabatan: string; // dari SekretarisDewanProfile
  periode: string; // hasil format // format: "2023 - 2027"
  isActive: boolean;

  // Metadata untuk keperluan operasional (Edit/Detail)
  _meta: {
    originalProfile: SekretarisDewanProfile;
  };
}
