import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { AKD_LIST } from "../../constants/attendance";
import { mockMitraInstitutions } from "@/mocks/mitra-kerja";

interface AddMitraModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterAKD: string;
  setFilterAKD: (val: string) => void;
  mitraSource: "person" | "institution" | "manual";
  setMitraSource: (val: "person" | "institution" | "manual") => void;
  selectedInstitutionId: string;
  setSelectedInstitutionId: (val: string) => void;
  mitraPersonName: string;
  setMitraPersonName: (val: string) => void;
  mitraPosition: string;
  setMitraPosition: (val: string) => void;
  manualInstitutionName: string;
  setManualInstitutionName: (val: string) => void;
  filteredInstitutions: typeof mockMitraInstitutions;
  onSave: () => void;
}

export const AddMitraModal = ({
  isOpen,
  onClose,
  filterAKD,
  setFilterAKD,
  mitraSource,
  setMitraSource,
  selectedInstitutionId,
  setSelectedInstitutionId,
  mitraPersonName,
  setMitraPersonName,
  mitraPosition,
  setMitraPosition,
  manualInstitutionName,
  setManualInstitutionName,
  filteredInstitutions,
  onSave,
}: AddMitraModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader className="border-b border-gray-200">
          Tambah Peserta Mitra Kerja
        </ModalHeader>
        <ModalBody className="py-4 space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-2">
            <Select
              label="Filter Berdasarkan AKD"
              size="sm"
              variant="flat"
              selectedKeys={[filterAKD]}
              onChange={(e) => setFilterAKD(e.target.value)}
            >
              {AKD_LIST.map((akd) => (
                <SelectItem key={akd.id} textValue={akd.name}>
                  {akd.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <RadioGroup
            label="Sumber Data"
            orientation="horizontal"
            value={mitraSource}
            onValueChange={(val: any) => setMitraSource(val)}
          >
            <Radio value="institution">Instansi Terdaftar</Radio>
            <Radio value="manual">Manual / Baru</Radio>
          </RadioGroup>

          {mitraSource === "institution" && (
            <Select
              label="Pilih Instansi"
              variant="bordered"
              placeholder="Cari Instansi..."
              selectedKeys={
                selectedInstitutionId ? [selectedInstitutionId] : []
              }
              onChange={(e) => setSelectedInstitutionId(e.target.value)}
            >
              {filteredInstitutions.map((inst) => (
                <SelectItem key={inst.id} textValue={inst.name}>
                  {inst.name}
                </SelectItem>
              ))}
            </Select>
          )}

          {mitraSource === "manual" && (
            <Input
              label="Nama Instansi Baru (Opsional)"
              variant="bordered"
              value={manualInstitutionName}
              onChange={(e) => setManualInstitutionName(e.target.value)}
            />
          )}

          <div className="pt-4 mt-2 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap Utusan (Opsional)"
                placeholder="Contoh: Bpk. Ahmad"
                variant="bordered"
                value={mitraPersonName}
                onChange={(e) => setMitraPersonName(e.target.value)}
              />
              <Input
                label="Jabatan Utusan (Opsional)"
                placeholder="Contoh: Direktur"
                variant="bordered"
                value={mitraPosition}
                onChange={(e) => setMitraPosition(e.target.value)}
              />
            </div>
          </div>
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
