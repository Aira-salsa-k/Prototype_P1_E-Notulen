export interface SekretarisDewanFormData {
  username: string;
  password?: string; // Optional for edit
  name: string;
  nip: string;
  jabatan: string;
  periodeStart: Date | null;
  periodeEnd: Date | null;
  isActive: boolean;
  //   signatureTemplate?: string;
}

export const defaultSekretarisDewanFormData: SekretarisDewanFormData = {
  username: "",
  password: "",
  name: "",
  nip: "",
  jabatan: "",
  periodeStart: null,
  periodeEnd: null,
  isActive: true,
  //   signatureTemplate: undefined,
};
