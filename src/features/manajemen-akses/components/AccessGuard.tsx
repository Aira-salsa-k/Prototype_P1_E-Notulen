"use client";

import { useEffect, useState } from "react";
import { useAccessStore } from "../store/useAccessStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { checkIsAdminLike } from "@/lib/auth/permissions";

interface AccessGuardProps {
  children: React.ReactNode;
  role: "admin" | "notulis" | "anggota_dewan" | "sekwan";
  userId?: string; // Required for 'notulis' role check
  fallback?: React.ReactNode;
}

export default function AccessGuard({
  children,
  role,
  userId,
  fallback,
}: AccessGuardProps) {
  const { globalAccess, notulisAccessMode, allowedNotulisIds } =
    useAccessStore();
  const { currentUser } = useAuthStore();
  const [isAllowed, setIsAllowed] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. ADMIN-LIKE CHECK (Highest Authority)
    const isAdminLike = checkIsAdminLike(currentUser);

    if (isAdminLike) {
      setIsAllowed(true);
      setIsReady(true);
      return;
    }

    // 2. GLOBAL ACCESS CHECK
    if (!globalAccess && role !== "admin") {
      setIsAllowed(false);
      setIsReady(true);
      return;
    }

    // 3. NOTULIS SPECIFIC CHECK
    if (role === "notulis") {
      if (notulisAccessMode === "all") {
        setIsAllowed(true);
      } else if (notulisAccessMode === "custom") {
        if (userId && allowedNotulisIds.includes(userId)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      }
    } else {
      // Other roles (anggota_dewan, sekwan) assume allowed if not caught by globalAccess check
      setIsAllowed(true);
    }

    setIsReady(true);
  }, [
    globalAccess,
    notulisAccessMode,
    allowedNotulisIds,
    role,
    userId,
    currentUser,
  ]);

  if (!isReady) return null;

  if (!isAllowed) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
            <ExclamationTriangleIcon className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Akses Terkunci
          </h1>
          <p className="text-gray-500">
            {role === "notulis"
              ? "Akun Anda saat ini tidak memiliki izin akses ke sistem. Hubungi Administrator."
              : "Sistem sedang dalam Mode Maintenance / Terkunci Global."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
