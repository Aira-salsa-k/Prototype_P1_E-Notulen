"use client";

import { Tabs, Tab } from "@heroui/tabs";
import {
  KeyIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import TabGlobalAccess from "@/features/manajemen-akses/components/TabGlobalAccess";
import TabNotulisAccess from "@/features/manajemen-akses/components/TabNotulisAccess";
import TabMeetingAccess from "@/features/manajemen-akses/components/TabMeetingAccess";

export default function AccessManagementPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Manajemen Akses Sistem
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Pusat kontrol keamanan dan hak akses sistem. Atur mode maintenance
          global, izin login notulis, dan penguncian data rapat.
        </p>
        <div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-200 to-transparent mt-6" />
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-divider/50 shadow-sm min-h-[600px]">
        <Tabs
          aria-label="Access Control Tabs"
          variant="underlined"
          classNames={{
            base: "w-full border-b border-gray-100 px-0 pb-0",
            tabList:
              "gap-8 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary h-1 rounded-t-full",
            tab: "max-w-fit px-0 h-14",
            tabContent:
              "group-data-[selected=true]:text-primary font-bold text-gray-500 group-data-[selected=true]:scale-105 transition-transform",
          }}
        >
          <Tab
            key="global"
            title={
              <div className="flex items-center gap-2">
                <KeyIcon className="w-5 h-5" />
                <span>Akses Global</span>
              </div>
            }
          >
            <div className="py-8">
              <TabGlobalAccess />
            </div>
          </Tab>

          <Tab
            key="notulis"
            title={
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span>Akses Notulis</span>
              </div>
            }
          >
            <div className="py-8">
              <TabNotulisAccess />
            </div>
          </Tab>

          <Tab
            key="meeting"
            title={
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5" />
                <span>Akses Rapat</span>
              </div>
            }
          >
            <div className="py-8">
              <TabMeetingAccess />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
