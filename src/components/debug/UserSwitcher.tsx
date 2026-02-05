"use client";

import { useState } from "react";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  ShieldCheckIcon,
  UsersIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { useAuth, useAuthStore } from "@/store/useAuthStore";
import { mockUsers } from "@/mocks/user";
import { UserRole } from "@/types/user";

import { checkIsAdminLike } from "@/lib/auth/permissions";

export function UserSwitcher() {
  const { currentUser, isAuthenticated, actions } = useAuthStore();
  const router = useRouter();

  const handleLogin = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) return;

    const success = actions.login(userId);
    if (success) {
      // Determine dashboard path
      let path = "/dashboard-admin";
      if (user.role === "NOTULIS") path = "/dashboard-notulis";
      if (user.role === "ANGGOTA_DEWAN") path = "/dashboard-anggota-dewan";
      if (user.role === "SEKWAN" && !checkIsAdminLike(user))
        path = "/dashboard-sekwan";

      window.location.href = path;
    }
  };

  const handleLogout = () => {
    actions.logout();
    window.location.href = "/";
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <ShieldCheckIcon className="w-4 h-4" />;
      case "SEKWAN":
        return <UserIcon className="w-4 h-4" />;
      case "NOTULIS":
        return <PencilSquareIcon className="w-4 h-4" />;
      case "ANGGOTA_DEWAN":
        return <UsersIcon className="w-4 h-4" />;
      default:
        return <UserIcon className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "text-red-500 bg-red-50";
      case "SEKWAN":
        return "text-purple-500 bg-purple-50";
      case "NOTULIS":
        return "text-green-500 bg-green-50";
      case "ANGGOTA_DEWAN":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="w-full p-4 border-t border-gray-100">
        <Button
          fullWidth
          color="primary"
          variant="flat"
          onPress={() => handleLogin("user-admin-001")}
          className="font-bold"
        >
          Login Simulasi
        </Button>
      </div>
    );
  }

  // Group users by role for cleaner dropdown
  const adminUsers = mockUsers.filter((u) => u.role === "ADMIN");
  const sekwanUsers = mockUsers.filter((u) => u.role === "SEKWAN");
  const notulisUsers = mockUsers.filter((u) => u.role === "NOTULIS");
  const anggotaUsers = mockUsers
    .filter((u) => u.role === "ANGGOTA_DEWAN")
    .slice(0, 5); // Limit for UI

  return (
    <div className="w-full p-3 border-t border-gray-100 bg-white">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
          Login Simulasi (Debug)
        </span>
        <Dropdown placement="top-start" className="w-full min-w-[240px]">
          <DropdownTrigger>
            <button className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-gray-50 transition-colors group outline-none">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar
                  size="sm"
                  name={currentUser.name}
                  className="shrink-0"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-bold text-sm text-gray-700 truncate w-full text-left line-clamp-1">
                    {currentUser.name}
                  </span>
                  <div
                    className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full mt-0.5 font-bold ${getRoleColor(currentUser.role)}`}
                  >
                    {getRoleIcon(currentUser.role)}
                    <span>{currentUser.role}</span>
                  </div>
                </div>
              </div>
              <ChevronUpDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            className="max-h-[400px] overflow-y-auto"
          >
            <DropdownSection title="Ganti Akun" showDivider>
              <DropdownItem
                key="admin"
                startContent={
                  <ShieldCheckIcon className="w-4 h-4 text-red-500" />
                }
                description="Super Admin Access"
                onPress={() => handleLogin(adminUsers[0].id)}
              >
                Administrator
              </DropdownItem>
              <DropdownItem
                key="sekwan"
                startContent={<UserIcon className="w-4 h-4 text-purple-500" />}
                description="Sekretaris Dewan (Aktif)"
                onPress={() => handleLogin("user-sekwan-002")}
              >
                Moh. Nur Gani S.E.
              </DropdownItem>
            </DropdownSection>

            <DropdownSection title="Notulis Team">
              {notulisUsers.map((u) => (
                <DropdownItem
                  key={u.id}
                  onPress={() => handleLogin(u.id)}
                  startContent={
                    <PencilSquareIcon className="w-4 h-4 text-green-500" />
                  }
                >
                  {u.name}
                </DropdownItem>
              ))}
            </DropdownSection>

            <DropdownSection title="Anggota Dewan (Sample)">
              {anggotaUsers.map((u) => (
                <DropdownItem
                  key={u.id}
                  onPress={() => handleLogin(u.id)}
                  startContent={<UsersIcon className="w-4 h-4 text-blue-500" />}
                >
                  {u.name}
                </DropdownItem>
              ))}
            </DropdownSection>

            <DropdownSection title="Session">
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                onPress={() => handleLogout()}
              >
                Logout / Reset
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
