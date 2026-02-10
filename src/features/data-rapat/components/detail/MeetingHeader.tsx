import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import {
  ArrowLeftIcon,
  PlayIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { canManageLifecycle } from "@/lib/auth/permissions";
import { User } from "@/types/user";
import { Meeting } from "@/types/meeting";
import { LifecycleConfirmationModal } from "./LifecycleConfirmationModal";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { AppButton } from "@/components/ui/button/AppButton";

interface MeetingHeaderProps {
  meeting: Meeting;
  currentUser: User | null;
  onBack: () => void;
  onStart: () => void;
  onFinish: () => void;
}

export function MeetingHeader({
  meeting,
  currentUser,
  onBack,
  onStart,
  onFinish,
}: MeetingHeaderProps) {
  const [modalType, setModalType] = useState<"start" | "finish" | null>(null);

  const handleConfirm = () => {
    if (modalType === "start") {
      onStart();
    } else if (modalType === "finish") {
      onFinish();
    }
    setModalType(null);
  };
  return (
    <div className="flex justify-between items-center bg-transparent px-2">
      <div className="flex gap-2">
        <Button
          variant="flat"
          startContent={<ArrowLeftIcon className="w-4 h-4" />}
          onPress={onBack}
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          Kembali
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        {meeting.status === "scheduled" && canManageLifecycle(currentUser) && (
          <AppButton
            color="hijau"
            variant="solid"
            startContent={<PlayIcon className="w-4 h-4" />}
            className="font-black px-6"
            onPress={() => setModalType("start")}
          >
            AKTIFKAN RAPAT (LIVE)
          </AppButton>
        )}

        {meeting.status === "live" && canManageLifecycle(currentUser) && (
          <>
            {!meeting.closingStartedAt ? (
              <AppButton
                color="ungu"
                variant="solid"
                startContent={<CheckBadgeIcon className="w-4 h-4" />}
                className="font-black px-6"
                onPress={() => setModalType("finish")}
              >
                SELESAIKAN & KUNCI RAPAT
              </AppButton>
            ) : (
              <CountdownTimer
                meetingId={meeting.id}
                closingStartedAt={meeting.closingStartedAt}
              />
            )}
          </>
        )}
      </div>

      <LifecycleConfirmationModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirm}
        type={modalType || "start"}
      />
    </div>
  );
}

function CountdownTimer({
  meetingId,
  closingStartedAt,
}: {
  meetingId: string;
  closingStartedAt: Date | string;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const { actions } = useDataRapatStore();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(closingStartedAt).getTime();
      const end = start + 5 * 60 * 60 * 1000; // 5 hours
      const now = new Date().getTime();
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        // Auto-complete the meeting in store when time is up
        actions.updateMeeting(meetingId, { status: "completed" });
        return "Locked";
      }
    };

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [closingStartedAt, meetingId, actions]);

  return (
    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200">
      <span className="text-xs font-bold uppercase">Auto-Close in:</span>
      <span className="font-mono font-bold text-lg">{timeLeft}</span>
    </div>
  );
}
