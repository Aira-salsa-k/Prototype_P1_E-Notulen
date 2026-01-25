"use client";

import { Modal, ModalContent } from "@heroui/modal";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
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
      scrollBehavior="outside"
      placement="center"
      backdrop="opaque"
      classNames={{
        // Memastikan wrapper memenuhi layar dan konten di tengah
        wrapper: "items-center sm:items-center justify-center",
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
