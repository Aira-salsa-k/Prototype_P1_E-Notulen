import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  KeyIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

interface TableActionsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onResetPassword?: (item: T) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canResetPassword?: boolean;
}

export const TableActions = <T,>({
  item,
  onEdit,
  onDelete,
  onResetPassword,
  canEdit = true,
  canDelete = true,
  canResetPassword = true,
}: TableActionsProps<T>) => {
  // If no handlers are provided, or permission is false, don't show the button
  const showEdit = onEdit && canEdit;
  const showDelete = onDelete && canDelete;
  const showReset = onResetPassword && canResetPassword;

  if (!showEdit && !showDelete && !showReset) return null;

  return (
    <>
      {/* DESKTOP ACTIONS */}
      <div className="hidden lg:flex items-center gap-1.5">
        {showReset && (
          <Tooltip content="Reset Password" color="warning">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="warning"
              onPress={() => onResetPassword(item)}
              className="hover:scale-105 transition-transform bg-amber-200/80"
            >
              <KeyIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
        )}

        {showEdit && (
          <Tooltip content="Edit" color="primary">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
              onPress={() => onEdit(item)}
              className="text-primary hover:scale-105 transition-transform"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
        )}

        {showDelete && (
          <Tooltip color="danger" content="Hapus">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="danger"
              onPress={() => onDelete(item)}
              className="text-danger"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
        )}
      </div>

      {/* MOBILE / TABLET ACTIONS */}
      <div className="flex lg:hidden justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Aksi">
            {showReset ? (
              <DropdownItem
                key="reset"
                startContent={<KeyIcon className="h-4 w-4" />}
                onPress={() => onResetPassword(item)}
              >
                Reset Password
              </DropdownItem>
            ) : (
              (null as any)
            )}

            {showEdit ? (
              <DropdownItem
                key="edit"
                startContent={<PencilIcon className="h-4 w-4" />}
                onPress={() => onEdit(item)}
              >
                Edit
              </DropdownItem>
            ) : (
              (null as any)
            )}

            {showDelete ? (
              <DropdownItem
                key="delete"
                color="danger"
                startContent={<TrashIcon className="h-4 w-4" />}
                onPress={() => onDelete(item)}
              >
                Hapus
              </DropdownItem>
            ) : (
              (null as any)
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};
