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
        <ModalHeader className="border-b">
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
            <div className="space-y-4">
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
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nama Utusan"
                  placeholder="Opsional"
                  variant="bordered"
                  value={mitraPersonName}
                  onChange={(e) =>
                    setMitraPersonName(e.target.value)
                  }
                />
                <Input
                  label="Jabatan Utusan"
                  placeholder="Opsional"
                  variant="bordered"
                  value={mitraPosition}
                  onChange={(e) =>
                    setMitraPosition(e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {mitraSource === "manual" && (
            <div className="space-y-4">
              <Input
                label="Nama Instansi Baru"
                variant="bordered"
                value={manualInstitutionName}
                onChange={(e) =>
                  setManualInstitutionName(e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nama Utusan"
                  variant="bordered"
                  value={mitraPersonName}
                  onChange={(e) =>
                    setMitraPersonName(e.target.value)
                  }
                />
                <Input
                  label="Jabatan Utusan"
                  variant="bordered"
                  value={mitraPosition}
                  onChange={(e) =>
                    setMitraPosition(e.target.value)
                  }
                />
              </div>
            </div>
          )}
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
