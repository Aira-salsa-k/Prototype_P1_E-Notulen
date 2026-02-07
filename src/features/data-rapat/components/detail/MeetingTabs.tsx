import { Tabs, Tab } from "@heroui/tabs";
import { Meeting } from "@/types/meeting";
import TabAbsensi from "@/features/notulen/TabAbsensi";
import TabNotulensi from "@/features/notulen/TabNotulensi";
import TabKesimpulan from "@/features/notulen/TabKesimpulan";
import TabDokumentasi from "@/features/notulen/TabDokumentasi";

interface MeetingTabsProps {
  meeting: Meeting;
  isReadOnly: boolean;
  participants: any[]; // Receive fixed participants
}

export function MeetingTabs({
  meeting,
  isReadOnly,
  participants,
}: MeetingTabsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[600px] overflow-hidden">
      <Tabs
        aria-label="Meeting Tabs"
        variant="underlined"
        classNames={{
          base: "w-full border-b border-gray-100 px-8 pt-4 bg-gray-50/50",
          tabList:
            "gap-8 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary h-1 rounded-t-full",
          tab: "max-w-fit px-0 h-14",
          tabContent:
            "group-data-[selected=true]:text-primary font-black text-gray-400 uppercase tracking-wider text-xs",
        }}
      >
        <Tab key="absensi" title="Daftar Hadir">
          <div className="p-8">
            <TabAbsensi
              meeting={meeting}
              isReadOnly={isReadOnly}
              initialRecords={participants}
            />
          </div>
        </Tab>
        <Tab key="notulensi" title="Notulensi Rapat">
          <div className="p-8">
            <TabNotulensi meeting={meeting} isReadOnly={isReadOnly} />
          </div>
        </Tab>
        <Tab key="kesimpulan" title="Kesimpulan">
          <div className="p-8 text-center max-w-3xl mx-auto">
            <TabKesimpulan isReadOnly={isReadOnly} />
          </div>
        </Tab>
        <Tab key="dokumentasi" title="Dokumentasi Visual">
          <div className="p-8">
            <TabDokumentasi isReadOnly={isReadOnly} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
