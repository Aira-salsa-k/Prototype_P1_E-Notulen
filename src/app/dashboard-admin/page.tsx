// app/dashboard/page.tsx
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import LiveMeetings from "@/features/dashboard/components/LiveMeetings";
import MeetingTypes from "@/features/dashboard/components/MeetingTypes";
import { Button } from "@heroui/button";
import { AppButton } from "@/components/ui/button/AppButton";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen sm:px-6 py-2">
      <DashboardHeader />
      <StatsGrid />
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="order-1 lg:order-2 lg:col-span-1">
          <MeetingTypes />
        </div>
       
        <div className="order-2 lg:order-1 lg:col-span-2">
          <LiveMeetings />
        </div>
      </div>
    </div>
  );
}
