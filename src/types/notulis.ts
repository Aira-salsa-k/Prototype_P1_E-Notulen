// app/types/notulis.ts
export interface Notulis {
  id: string;
  userID: string; // relasi ke User
  fullName: string;
  NIP:string;
  isActive: boolean;
}
