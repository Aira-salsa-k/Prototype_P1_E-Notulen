import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface AddTaModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  setName: (val: string) => void;
  jabatan: string;
  setJabatan: (val: string) => void;
  onSave: () => void;
}

export const AddTaModal = ({
  isOpen,
  onClose,
  name,
  setName,
  jabatan,
  setJabatan,
  onSave,
}: AddTaModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Tambah Tenaga Ahli</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Nama Tenaga Ahli"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Jabatan/Spesialisasi"
            variant="bordered"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" onPress={onSave}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
