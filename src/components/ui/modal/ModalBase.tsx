"use client";

import { Modal, ModalContent } from "@heroui/modal";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  children: React.ReactNode;
}

export function ModalBase({
  isOpen,
  onClose,
  size = "2xl",
  children,
}: ModalBaseProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      placement="center"
      backdrop="opaque"
      classNames={{
        wrapper: "z-[60]",
        base: "max-h-[90vh]",
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
