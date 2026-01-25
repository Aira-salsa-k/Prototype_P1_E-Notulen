import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
  CogIcon,
  DocumentIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  CalendarIcon as CalendarIconSolid,
  CogIcon as CogIconSolid,
  DocumentIcon as DocumentIconSolid,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

import { useSelectedLayoutSegment } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


import UserProfile from "@/components/sidebar/UserProfile";

export default function SidebarContent({
  pathname,
  isCollapsed,
}: {
  pathname: string;
  isCollapsed: boolean;
}) {
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: "Anggota Dewan",
      href: "/dashboard/anggota-dewan",
      icon: UsersIcon,
      activeIcon: UsersIconSolid,
    },
    {
      name: "Mitra Kerja",
      href: "/dashboard/mitra-kerja",
      icon: UserGroupIcon,
      activeIcon: UserGroupIconSolid,
    },
    {
      name: "Sekretaris Dewan",
      href: "/dashboard/sekretaris-dewan",
      icon: UserIcon,
      activeIcon: UserIconSolid,
    },
    {
      name: "Notulis",
      href: "/dashboard/notulis",
      icon: DocumentTextIcon,
      activeIcon: DocumentTextIconSolid,
    },
    {
      name: "Jenis Rapat",
      href: "/dashboard/jenis-rapat",
      icon: CalendarIcon,
      activeIcon: CalendarIconSolid,
    },
    {
      name: "Data Rapat",
      href: "/dashboard/data-rapat",
      icon: DocumentIcon,
      activeIcon: DocumentIconSolid,
    },
    {
      name: "Manajemen Akses",
      href: "/dashboard/manajemen-akses",
      icon: CogIcon,
      activeIcon: CogIconSolid,
    },
    {
      name: "Kop Surat",
      href: "/dashboard/kop-surat",
      icon: DocumentTextIcon,
      activeIcon: DocumentTextIconSolid,
    },
  ];

  // Normalize path by removing trailing slash
  const normalizePath = (path: string) => {
    return path.replace(/\/$/, "") || "/";
  };

  // Get the base segment from pathname
  const currentPath = normalizePath(pathname);

  return (
    <>
      {/* Logo with smooth transition */}

      <div className="mb-8 px-4">
        <div className="flex items-center h-12 relative">
          {/* LOGO */}
          <div
            className={clsx(
              "flex-shrink-0 transition-transform duration-300 ease-in-out",
              isCollapsed ? "translate-x-[calc(50%-24.5px)]" : "translate-x-0"
            )}
          >
            <div className="h-12 w-12 rounded-full bg-indigo-400/10 flex items-center justify-center shadow-md shadow-indigo-900/10 overflow-hidden">
              <Image
                src="/logo_entar_large.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain p-1"
              />
            </div>
          </div>

          {/* TEXT */}
          <div
            className={clsx(
              "overflow-hidden transition-all duration-300 ease-in-out ml-3",
              isCollapsed
                ? "max-w-0 opacity-0 translate-x-[-8px]"
                : "max-w-[160px] opacity-100 translate-x-0"
            )}
          >
            <div className="whitespace-nowrap">
              <h1 className="text-bold text-md font-bold text-neutral-50 leading-none">
                E-NTAR
              </h1>
              <p className="text-[12px] font-bold text-neutral-50 mt-1">
                Notulen Rapat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4 space-y-1">
        {navigationItems.map((item) => {
          const itemPath = normalizePath(item.href);

          // Check if current path matches exactly or starts with the item path
          // (excluding root "/dashboard" from matching subpaths)
          const isActive =
            itemPath === "/dashboard"
              ? currentPath === "/dashboard"
              : currentPath.startsWith(itemPath);

          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                isCollapsed ? "px-3 justify-center" : "px-4",
                isActive
                  ? "bg-indigo-200 text-indigo-900 border-l-4 border-indigo-900/30"
                  : "text-neutral-100 hover:bg-indigo-900/40 hover:text-netral-200 border-l-4 border-transparent"
              )}
              title={isCollapsed ? item.name : ""}
            >
              <Icon
                className={clsx(
                  "flex-shrink-0 transition-colors duration-200",
                  isCollapsed ? "h-6 w-6" : "h-5 w-5 mr-3",
                  isActive
                    ? "text-blue-900/80"
                    : "text-indigo-300 group-hover:text-indigo-300"
                )}
                aria-hidden="true"
              />

              {/* Text with smooth transition */}
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-40 opacity-100"
                )}
              >
                <span className="truncate whitespace-nowrap">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}