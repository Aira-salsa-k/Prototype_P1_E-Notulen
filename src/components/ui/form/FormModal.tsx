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
}

export function FormModal({
  isOpen,
  title,
  onClose,
  footer,
  children,
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="outside">
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
