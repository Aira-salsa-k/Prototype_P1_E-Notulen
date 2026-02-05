
"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { 
  UserGroupIcon, 
  PencilSquareIcon, 
  DocumentTextIcon, 
  PhotoIcon 
} from "@heroicons/react/24/outline";
import TabAbsensi from "./TabAbsensi";
import TabNotulensi from "./TabNotulensi"
import TabKesimpulan from "./TabKesimpulan";
import TabDokumentasi from "./TabDokumentasi";
import { useEffect } from "react";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";

interface NotulenWorkspaceProps {
  meetingId: string;
}

export default function NotulenWorkspace({ meetingId }: NotulenWorkspaceProps) {
  const { actions } = useNotulenStore();

  // Ambil data meeting tunggal dari store
  const meeting = useMeetingStore((state) => 
    state.meetings.find((m) => m.id === meetingId)
  );

  useEffect(() => {
    actions.initializeMeeting(meetingId);
  }, [meetingId, actions]);

  // Handle jika data meeting belum dimuat atau tidak ditemukan
  if (!meeting) {
    return <div className="p-8 text-center">Memuat data rapat...</div>;
  }

  useEffect(() => {
    actions.initializeMeeting(meetingId);
  }, [meetingId, actions]);

  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined" 
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-blue-600",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-blue-600 font-semibold"
        }}
      >
        <Tab
          key="absensi"
          title={
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5"/>
              <span>Absensi</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardBody>
             <TabAbsensi 
                meeting={meeting} 
                isReadOnly={false} 
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="notulen"
          title={
            <div className="flex items-center space-x-2">
              <PencilSquareIcon className="w-5 h-5"/>
              <span>Notulensi</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardBody>
              <TabNotulensi meeting={meeting} isReadOnly={false}/>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="kesimpulan"
          title={
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="w-5 h-5"/>
              <span>Kesimpulan</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardBody>
               <TabKesimpulan />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="dokumentasi"
          title={
            <div className="flex items-center space-x-2">
              <PhotoIcon className="w-5 h-5"/>
              <span>Dokumentasi</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-sm border border-gray-200">
             <CardBody>
                <TabDokumentasi />
             </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
