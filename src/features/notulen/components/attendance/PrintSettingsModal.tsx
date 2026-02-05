import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { DateValue } from "@internationalized/date";

interface PrintSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  printDate: DateValue | null;
  setPrintDate: (val: DateValue | null) => void;
  selectedSignatoryId: string;
  setSelectedSignatoryId: (val: string) => void;
  signatories: { userId: string; name: string; jabatan: string }[];
  printHeaderTitle: string;
  setPrintHeaderTitle: (val: string) => void;
  printMode: "FULL" | "NO_METADATA" | "METADATA_ONLY";
  setPrintMode: (val: "FULL" | "NO_METADATA" | "METADATA_ONLY") => void;
  onConfirm: () => void;
}

export const PrintSettingsModal = ({
  isOpen,
  onClose,
  printDate,
  setPrintDate,
  selectedSignatoryId,
  setSelectedSignatoryId,
  signatories,
  printHeaderTitle,
  setPrintHeaderTitle,
  printMode,
  setPrintMode,
  onConfirm,
}: PrintSettingsModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="border-b">Pengaturan Cetak Absensi</ModalHeader>
        <ModalBody className="py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Tanggal di Absensi"
              labelPlacement="outside"
              variant="bordered"
              value={printDate}
              onChange={setPrintDate}
            />
            <Select
              label="Penandatangan"
              labelPlacement="outside"
              variant="bordered"
              selectedKeys={selectedSignatoryId ? [selectedSignatoryId] : []}
              onChange={(e) => setSelectedSignatoryId(e.target.value)}
            >
              {signatories.map((m) => (
                <SelectItem key={m.userId} textValue={m.name}>
                  <div className="flex flex-col">
                    <span className="font-bold">{m.name}</span>
                    <span className="text-tiny text-gray-400">{m.jabatan}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </div>

          <Textarea
            label="Judul / Kop Absensi"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Masukkan judul absensi..."
            value={printHeaderTitle}
            onChange={(e) => setPrintHeaderTitle(e.target.value)}
            minRows={2}
          />

     

            <div className="space-y-2">
  <label className="text-sm font-medium text-foreground">
    Mode Cetak
  </label>

  <div className="grid grid-cols-3 gap-4 mt-2">
    <button
      type="button"
      onClick={() => setPrintMode("FULL")}
      className={`
        p-4 rounded-xl border text-left transition
        ${printMode === "FULL"
          ? "border-primary bg-primary/10"
          : "border-default-200 hover:border-primary"}
      `}
    >
      <div className="font-semibold">Lengkap</div>
      <div className="text-sm text-default-500">
        Kop, metadata, dan tabel.
      </div>
    </button>

    <button
      type="button"
      onClick={() => setPrintMode("NO_METADATA")}
      className={`
        p-4 rounded-xl border text-left transition
        ${printMode === "NO_METADATA"
          ? "border-primary bg-primary/10"
          : "border-default-200 hover:border-primary"}
      `}
    >
      <div className="font-semibold">Tanpa Metadata</div>
      <div className="text-sm text-default-500">
        Metadata disembunyikan.
      </div>
    </button>

    <button
      type="button"
      onClick={() => setPrintMode("METADATA_ONLY")}
      className={`
        p-4 rounded-xl border text-left transition
        ${printMode === "METADATA_ONLY"
          ? "border-primary bg-primary/10"
          : "border-default-200 hover:border-primary"}
      `}
    >
      <div className="font-semibold">Hanya Metadata</div>
      <div className="text-sm text-default-500">
        Header & metadata saja.
      </div>
    </button>
  </div>
</div>

        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" onPress={onConfirm} startContent={<PrinterIcon className="w-4 h-4" />}>
            Cetak Sekarang
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
