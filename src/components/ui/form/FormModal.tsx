"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

export function FormModal({
  isOpen,
  title,
  onClose,
  footer,
  children,
  size = "2xl",
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="outside">
      <ModalContent>
        <ModalHeader>
          <h1 className="text-xl font-semibold">{title}</h1>
        </ModalHeader>

        <ModalBody className="space-y-4">{children}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
