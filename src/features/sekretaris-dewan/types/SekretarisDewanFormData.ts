export interface SekretarisDewanFormData {
  userId: string; // pilih anggota dari dropdown, maka kita dapat userId-nya
 
  jabatan: string;
  periodeStart: Date | null;
  periodeEnd: Date | null;
  isActive: boolean;
  //   signatureTemplate?: string;
}

export const defaultSekretarisDewanFormData: SekretarisDewanFormData = {
  userId: "",
  
  jabatan: "",
  periodeStart: null,
  periodeEnd: null,
  isActive: true,
//   signatureTemplate: undefined,
};