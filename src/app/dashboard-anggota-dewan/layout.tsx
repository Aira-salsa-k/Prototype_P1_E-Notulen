// app/dashboard/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import SidebarContent from "@/components/sidebar/SidebarContent";

import UserProfile from "@/components/sidebar/UserProfile";
import LoginSimulation from "@/features/auth/components/LoginSimulation";

// Main Layout Component
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { actions } = useAuthStore();

  const handleLogout = () => {
    actions.logout();
    router.push("/");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="h-screen flex bg-gray-50 font-sans overflow-hidden">
      {/* SIDEBAR (SEMUA DEVICE) */}
      <aside
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
      h-full
      relative flex-shrink-0
      ${isCollapsed ? "w-20" : "w-64"}
      border-r border-gray-200 bg-indigo-950/95
      flex flex-col transition-all duration-300
    `}
      >
        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-150 z-10 bg-amber-200 border-6 border-indigo-950 rounded-full p-1.5 shadow-md hover:shadow-lg transition"
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="h-4 w-4 text-amber-800" />
          ) : (
            <ChevronDoubleLeftIcon className="h-4 w-4 text-amber-800" />
          )}
        </button>

        {/* CONTENT */}
        <div className="flex-1 pt-8 pb-4 overflow-y-auto">
          <SidebarContent pathname={pathname} isCollapsed={isCollapsed} />
        </div>

        <UserProfile isCollapsed={isCollapsed} onLogout={handleLogout} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto">
        <div className="py-6 px-4 sm:px-4 lg:px-6">{children}</div>
      </main>

      <LoginSimulation />
    </div>
  );
}
