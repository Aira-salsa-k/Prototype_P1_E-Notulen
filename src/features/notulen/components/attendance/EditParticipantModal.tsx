import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { RadioGroup, Radio } from "@heroui/radio";
import { AttendanceRecord } from "@/types/attendance";
import { AKD_LIST } from "../../constants/attendance";
import { useMitraStore } from "@/features/mitra-kerja/store/useMitraKerjaStore";

interface EditParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
  setRecord: (record: AttendanceRecord | null) => void;
  onSave: () => void;
  filterAKD: string;
  setFilterAKD: (val: string) => void;
  filteredInstitutions: any[];
}

export const EditParticipantModal = ({
  isOpen,
  onClose,
  record,
  setRecord,
  onSave,
  filterAKD,
  setFilterAKD,
  filteredInstitutions,
}: EditParticipantModalProps) => {
  const { institutions: allInstitutions } = useMitraStore();
  const [instMode, setInstMode] = useState<"list" | "manual">("list");

  // Reset instMode when modal opens or record changes
  useEffect(() => {
    if (isOpen && record?.type === "MITRA_KERJA") {
      // Check if current institution is in the store list
      const isKnown = allInstitutions.some(
        (i) => i.name === record.institution,
      );
      setInstMode(isKnown ? "list" : "manual");
    }
  }, [isOpen, record?.id, allInstitutions]);

  if (!record) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader className="border-b">Edit Peserta</ModalHeader>
        <ModalBody className="py-4 space-y-4">
          <Input
            label="Nama"
            variant="bordered"
            value={record.name || ""}
            onChange={(e) =>
              setRecord({ ...record, name: e.target.value.toUpperCase() })
            }
          />
          <Input
            label="Jabatan"
            variant="bordered"
            value={record.jabatan || ""}
            onChange={(e) =>
              setRecord({ ...record, jabatan: e.target.value.toUpperCase() })
            }
          />

          {record.type === "MITRA_KERJA" && (
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <RadioGroup
                label="Sumber Instansi"
                orientation="horizontal"
                value={instMode}
                onValueChange={(val: any) => setInstMode(val)}
              >
                <Radio value="list">Pilih dari Daftar</Radio>
                <Radio value="manual">Input Manual</Radio>
              </RadioGroup>

              {instMode === "list" && (
                <div className="space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Select
                    label="Filter AKD"
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

                  <Select
                    label="Pilih Instansi"
                    variant="bordered"
                    placeholder="Cari Instansi..."
                    selectedKeys={
                      allInstitutions.find((i) => i.name === record.institution)
                        ?.id
                        ? [
                            allInstitutions.find(
                              (i) => i.name === record.institution,
                            )!.id,
                          ]
                        : []
                    }
                    onChange={(e) => {
                      const inst = allInstitutions.find(
                        (i) => i.id === e.target.value,
                      );
                      if (inst) {
                        setRecord({ ...record, institution: inst.name });
                      }
                    }}
                  >
                    {filteredInstitutions.map((inst) => (
                      <SelectItem key={inst.id} textValue={inst.name}>
                        {inst.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              )}

              {instMode === "manual" && (
                <Input
                  label="Nama Instansi"
                  variant="bordered"
                  value={record.institution || ""}
                  placeholder="Masukkan nama instansi baru..."
                  onChange={(e) =>
                    setRecord({
                      ...record,
                      institution: e.target.value.toUpperCase(),
                    })
                  }
                />
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" onPress={onSave}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
