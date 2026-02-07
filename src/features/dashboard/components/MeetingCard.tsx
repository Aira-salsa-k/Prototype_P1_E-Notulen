// app/components/dashboard/MeetingCard.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { semanticToHeroColor } from "@/lib/semantic/semantic-chip";
import { MeetingResolved } from "@/types/meeting";

import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { AppButton } from "@/components/ui/button/AppButton";

interface MeetingCardProps {
  meeting: MeetingResolved;
  defaultOpen?: boolean;
}

export default function MeetingCard({
  meeting,
  defaultOpen = false,
}: MeetingCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { currentUser } = useAuthStore();

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  // Determine dashboard base path based on role
  const getDashboardPath = () => {
    if (!currentUser) return "/dashboard-admin";

    // Admin and Sekwan (who is admin-like) go to dashboard-admin
    if (checkIsAdminLike(currentUser)) return "/dashboard-admin";

    // Role-based dashboard mapping
    const roleMap: Record<string, string> = {
      SEKWAN: "/dashboard-sekwan",
      NOTULIS: "/dashboard-notulis",
      ANGGOTA_DEWAN: "/dashboard-anggota-dewan",
    };

    return roleMap[currentUser.role] || "/dashboard-admin";
  };

  return (
    <Card className="mb-6 border border-gray-200 shadow-sm">
      {/* HEADER */}
      <CardFooter className="bg-gray-50 px-6 py-4 border-t border-gray-200 space-y-3">
        <div className="flex flex-col w-full ">
          <div className="flex w-full items-center justify-between mb-4">
            <div className="flex px-3 bg-red-100 rounded-2xl">
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-red-900">LIVE</h5>
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link href={`${getDashboardPath()}/data-rapat/${meeting.id}`}>
                <AppButton size="sm" color="ungu">
                  Masuk ke halaman Rapat
                </AppButton>
              </Link>
            </div>
          </div>

          {/* BARIS BAWAH: TITLE + DESC */}
          <div
            className="cursor-pointer flex flex-row justify-between gap-2"
            onClick={() => setOpen(!open)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                {meeting.title}
              </h3>
              {/* <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {meeting.description}
            </p> */}
            </div>

            <div className="flex flex-end items-end">
              <ChevronDownIcon
                onClick={() => setOpen(!open)}
                className={`h-6 w-6 cursor-pointer transition-transform duration-300  ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </CardFooter>

      {/* DETAIL */}
      {open && (
        <CardBody className="px-6 pb-6 pt-4">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 shrink-0" />
                    <span className="break-words">{meeting.room}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>
                      {meeting.startTime} - {meeting.endTime} WIT
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Jenis Rapat
                  </h4>
                  {meeting.meetingCategory && (
                    <MeetingTypeBadge
                      categoryName={meeting.meetingCategory.name}
                      color={meeting.meetingCategory.color}
                      size="md"
                      subCategoryName={meeting.subMeetingCategory?.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
