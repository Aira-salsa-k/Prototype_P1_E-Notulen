// app/types/notulis.ts
export interface Notulis {
  id: string;
  userID: string; // relasi ke User
  NIP: string;
  isActive: boolean;
}
