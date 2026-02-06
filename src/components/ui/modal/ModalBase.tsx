"use client";

import { Modal, ModalContent } from "@heroui/modal";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  children: React.ReactNode;
  scrollBehavior?: "inside" | "outside" | "normal";
  classNames?: {
    wrapper?: string;
    base?: string;
    backdrop?: string;
  };
}

export function ModalBase({
  isOpen,
  onClose,
  size = "2xl",
  scrollBehavior = "inside",
  children,
  classNames: customClassNames,
}: ModalBaseProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior={scrollBehavior}
      placement="center"
      backdrop="opaque"
      classNames={{
        wrapper: customClassNames?.wrapper || "z-[60]",
        base: customClassNames?.base || "max-h-[90vh]",
        backdrop: customClassNames?.backdrop,
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
