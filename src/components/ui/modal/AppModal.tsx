"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { cn } from "@/lib/utils";

export interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  scrollBehavior?: "inside" | "outside" | "normal";
  children: React.ReactNode;
  classNames?: {
    wrapper?: string;
    base?: string;
    backdrop?: string;
  };
  className?: string; // Additional prop for easier styling
}

export const AppModal = ({
  isOpen,
  onClose,
  size = "2xl",
  scrollBehavior = "inside",
  children,
  classNames: customClassNames,
  className,
}: AppModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior={scrollBehavior}
      placement="center"
      backdrop="opaque"
      classNames={{
        wrapper: cn("z-[60]", customClassNames?.wrapper),
        base: cn("max-h-[90vh]", customClassNames?.base, className),
        backdrop: customClassNames?.backdrop,
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};
