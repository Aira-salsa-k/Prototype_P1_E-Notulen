"use client";

import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardHeader() {
  const { currentUser } = useAuthStore();

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "ADMINISTRATOR SISTEM";
      case "SEKWAN":
        return "SEKRETARIS DEWAN (Penanggung Jawab)";
      case "NOTULIS":
        return "STAFF PREISDANGAN & NOTULENSI";
      case "ANGGOTA_DEWAN":
        return "ANGGOTA DPRD KABUPATEN KEEROM";
      default:
        return "GUEST";
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-sans font-bold text-gray-900">
        Selamat Datang, {currentUser?.name || "Tamu"}
      </h1>
      <p className="text-lg text-gray-600 mt-1">
        {getRoleLabel(currentUser?.role)}
      </p>
    </div>
  );
}
