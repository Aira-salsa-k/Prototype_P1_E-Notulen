"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { AnggotaFormData, AKD } from "@/types/anggota-dewan";
import { AKD_OPTIONS } from "@/lib/akd";
import { useState, useEffect } from "react";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKDBadge } from "../../../components/ui/badges/AKDBadge";

interface AnggotaDewanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AnggotaFormData) => void;
  initialData?: AnggotaFormData;
  mode: "add" | "edit";
}

export default function AnggotaDewanForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: AnggotaDewanFormProps) {
  const defaultFormData: AnggotaFormData = {
    name: "",
    jabatan: "",
    akd: [],
    username: "",
    password: "",
    status: "active",
  };

  const [formData, setFormData] = useState<AnggotaFormData>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || defaultFormData);
    }
  }, [isOpen, initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h2 className="text-xl font-semibold">
              {mode === "add" ? "Tambah Anggota Baru" : "Edit Anggota"}
            </h2>
          </ModalHeader>
          <ModalBody className="space-y-4">
            {/* Preview Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Preview:</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {formData.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{formData.name || "[Nama]"}</p>
                  <p className="text-sm text-gray-600">
                    {formData.jabatan || "[Jabatan]"} •{" "}
                    {formData.akd.length > 0
                      ? formData.akd
                          .map((akd) => AKD_CONFIG[akd]?.label ?? akd)
                          .join(", ")
                      : "[AKD]"}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      formData.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formData.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                label="Jabatan"
                value={formData.jabatan}
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                required
              />

              <Select
                label="AKD"
                selectionMode="multiple"
                selectedKeys={new Set(formData.akd)}
                onSelectionChange={(keys) =>
                  setFormData({
                    ...formData,
                    akd: Array.from(keys) as AKD[],
                  })
                }
                renderValue={(items) => (
                  <div className="flex gap-1 flex-wrap">
                    {items.map((item) => (
                      <AKDBadge key={item.key} akd={item.key as AKD} />
                    ))}
                  </div>
                )}
              >
                {AKD_OPTIONS.map((akd) => (
                  <SelectItem key={akd.value}>{akd.label}</SelectItem>
                ))}
              </Select>

              <Select
                label="Status"
                selectedKeys={[formData.status]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as "active" | "inactive";
                  setFormData({ ...formData, status: value });
                }}
              >
                <SelectItem key="active">Aktif</SelectItem>
                <SelectItem key="inactive">Tidak Aktif</SelectItem>
              </Select>

              <Input
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required={mode === "add"}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Batal
            </Button>

            <Button color="primary" type="submit">
              {mode === "add" ? "Tambah" : "Simpan Perubahan"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
