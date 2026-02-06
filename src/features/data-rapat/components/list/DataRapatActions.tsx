import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Meeting } from "@/types/meeting";
import { User } from "@/types/user";
import {
  canEditMeeting,
  canDeleteMeeting,
  canManageLifecycle,
} from "@/lib/auth/permissions";
import { useMeetingActions } from "@/features/data-rapat/hooks/useMeetingActions";

interface DataRapatActionsProps {
  meeting: Meeting;
  currentUser: User | null;
  onView: (meeting: Meeting) => void;
  onEdit?: (meeting: Meeting) => void;
  onDelete?: (id: string) => void;
}

export function DataRapatActions({
  meeting,
  currentUser,
  onView,
  onEdit,
  onDelete,
}: DataRapatActionsProps) {
  const { startMeeting, finishMeeting } = useMeetingActions();

  return (
    <>
      {/* DESKTOP ACTIONS */}
      <div className="hidden lg:flex items-center justify-center gap-2">
        <Tooltip content="Lihat Detail" color="default">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="default"
            onPress={() => onView(meeting)}
            className="text-gray-500 hover:text-gray-900"
          >
            <EyeIcon className="w-5 h-5" />
          </Button>
        </Tooltip>

        {/* Lifecycle Actions */}
        {/* {canManageLifecycle(currentUser, meeting) && (
          <>
            {meeting.status === "scheduled" && (
              <Tooltip content="Mulai Rapat (Live)" color="success">
                <Button
                  size="sm"
                  color="success"
                  variant="flat"
                  className="font-bold text-success-600"
                  onPress={() => startMeeting(meeting, currentUser)}
                >
                  Mulai Live
                </Button>
              </Tooltip>
            )}

            {meeting.status === "live" && (
              <Tooltip content="Selesaikan Rapat" color="warning">
                <Button
                  size="sm"
                  color="warning"
                  variant="flat"
                  className="font-bold text-warning-600"
                  onPress={() => finishMeeting(meeting, currentUser)}
                >
                  Selesai
                </Button>
              </Tooltip>
            )}
          </>
        )} */}

        {canEditMeeting(currentUser, meeting) && (
          <Tooltip content="Edit Jadwal" color="primary">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
              onPress={() => {
                if (onEdit) onEdit(meeting);
              }}
              className="text-primary hover:scale-105 transition-transform"
            >
              <PencilIcon className="w-5 h-5" />
            </Button>
          </Tooltip>
        )}

        {canDeleteMeeting(currentUser, meeting) && (
          <Tooltip content="Hapus Jadwal" color="danger">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="danger"
              onPress={() => {
                if (onDelete) onDelete(meeting.id);
              }}
              className="hover:scale-105 transition-transform"
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          </Tooltip>
        )}
      </div>

      {/* MOBILE ACTIONS */}
      <div className="flex lg:hidden justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Aksi Rapat">
            <DropdownItem
              key="view"
              startContent={<EyeIcon className="w-4 h-4" />}
              onPress={() => onView(meeting)}
            >
              Lihat Detail
            </DropdownItem>
            {canEditMeeting(currentUser, meeting) ? (
              <DropdownItem
                key="edit"
                startContent={<PencilIcon className="w-4 h-4" />}
                onPress={() => {
                  if (onEdit) onEdit(meeting);
                }}
              >
                Edit Jadwal
              </DropdownItem>
            ) : null}
            {canDeleteMeeting(currentUser, meeting) ? (
              <DropdownItem
                key="delete"
                color="danger"
                className="text-danger"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => {
                  if (onDelete) onDelete(meeting.id);
                }}
              >
                Hapus Jadwal
              </DropdownItem>
            ) : null}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}
