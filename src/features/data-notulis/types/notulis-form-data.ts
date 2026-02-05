export interface NotulisFormData {
  // User Account Fields
  username: string;
  password?: string; // Optional for edit mode

  // Notulis Profile Fields
  name: string;
  NIP: string;
  isActive: boolean;
}
