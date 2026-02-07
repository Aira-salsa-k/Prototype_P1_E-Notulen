"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { mockUsers } from "@/mocks/user";

export default function LoginSimulation() {
  const { currentUser, actions } = useAuthStore();
  const { login } = actions;
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const users = [
    {
      id: "user-admin-001",
      label: "Super Admin",
      role: "ADMIN",
      name: "Administrator Sistem",
      color: "bg-purple-600",
    },
    {
      id: "user-sekwan-002",
      label: "Sekwan (Gani) - AKTIF",
      role: "SEKWAN",
      name: "Moh. Nur Gani S.E.",
      color: "bg-blue-500",
    },
    {
      id: "user-sekwan-001",
      label: "Sekwan (Doris) - INAKTIF",
      role: "SEKWAN",
      name: "Doris Anastasia Yapen",
      color: "bg-orange-600",
    },
    {
      id: "user-notulis-001",
      label: "Notulis (Saleha)",
      role: "NOTULIS",
      name: "Saleha",
      color: "bg-green-600",
    },
    {
      id: "user-anggota-001",
      label: "Ketua Dewan (Kanisius)",
      role: "ANGGOTA_DEWAN",
      name: "Kanisius Kango",
      color: "bg-indigo-600",
    },
  ];

  const handleLogin = (userId: string, role: string) => {
    const userToLogin = mockUsers.find((u) => u.id === userId);
    if (!userToLogin) return;

    const success = login(userId);
    if (success) {
      // Determine dashboard path
      let path = "/dashboard-admin";
      if (role === "NOTULIS") path = "/dashboard-notulis";
      if (role === "ANGGOTA_DEWAN") path = "/dashboard-anggota-dewan";
      if (role === "SEKWAN" && !checkIsAdminLike(userToLogin))
        path = "/dashboard-sekwan";

      // Hard navigation to ensure all context/stores re-initialize for the new role
      window.location.href = path;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-full shadow-lg z-50 hover:bg-gray-800 transition-all opacity-50 hover:opacity-100"
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 w-80 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
          Simulasi Login (Debug)
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
          <p className="text-xs text-gray-500 mb-1">Sedang Login Sebagai:</p>
          <p className="font-bold text-gray-800">
            {currentUser?.name || "Guest (Belum Login)"}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              {currentUser?.role || "-"}
            </span>
            {currentUser && (
              <span className="text-[10px] font-mono text-gray-400">
                ID: {currentUser.id}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user.id, user.role)}
              disabled={currentUser?.id === user.id}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all relative overflow-hidden group
                  ${
                    currentUser?.id === user.id
                      ? "bg-gray-900 border-gray-900 text-white shadow-md ring-2 ring-offset-2 ring-gray-900"
                      : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-gray-300 shadow-sm"
                  }
               `}
            >
              <div className="flex justify-between items-start mb-1">
                <span
                  className={`font-bold ${currentUser?.id === user.id ? "text-white" : "text-gray-900"}`}
                >
                  {user.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${user.color}`}></span>
              </div>
              <div
                className={`text-xs ${currentUser?.id === user.id ? "text-gray-300" : "text-gray-500"}`}
              >
                {user.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
