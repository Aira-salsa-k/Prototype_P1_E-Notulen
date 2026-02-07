import { useState, useMemo } from "react";
import { useDisclosure } from "@heroui/modal";
import {
  AttendanceRecord,
  AttendanceStatus,
  ParticipantType,
} from "@/types/attendance";
import { useMitraStore } from "@/features/mitra-kerja/store/useMitraKerjaStore";

interface UseAttendanceFormsProps {
  meetingId: string;
  records: AttendanceRecord[];
  setRecords: (records: AttendanceRecord[]) => void;
  updateMeetingStore: (records: AttendanceRecord[]) => void;
}

export function useAttendanceForms({
  meetingId,
  records,
  setRecords,
  updateMeetingStore,
}: UseAttendanceFormsProps) {
  // Modals
  const disclosureAddMitra = useDisclosure();
  const disclosureAddTa = useDisclosure();
  const disclosureEdit = useDisclosure();

  // Store Data
  const { institutions: allInstitutions } = useMitraStore();

  // Temporary State for Add Forms
  const [filterAKD, setFilterAKD] = useState<string>("ALL");
  const [mitraSource, setMitraSource] = useState<
    "person" | "institution" | "manual"
  >("institution");

  const [selectedMitraId, setSelectedMitraId] = useState("");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("");
  const [manualInstitutionName, setManualInstitutionName] = useState("");
  const [mitraPersonName, setMitraPersonName] = useState("");
  const [mitraPosition, setMitraPosition] = useState("");

  const [newTaName, setNewTaName] = useState("");
  const [newTaJabatan, setNewTaJabatan] = useState("");

  // State for Editing
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(
    null,
  );

  // Derived Form Data
  const filteredInstitutions = useMemo(() => {
    if (filterAKD === "ALL") return allInstitutions;
    return allInstitutions.filter((i) => i.akdID === filterAKD);
  }, [filterAKD, allInstitutions]);

  const filteredMitraPersons = useMemo(() => {
    // Note: We currently don't have a person store for mitra,
    // so we fallback to institutions or manual
    return [];
  }, [filterAKD]);

  // Handlers
  const handleAddMitra = () => {
    let newRecord: AttendanceRecord | null = null;
    const base = {
      meetingId: meetingId,
      type: "MITRA_KERJA" as ParticipantType,
      status: "HADIR" as AttendanceStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (mitraSource === "institution") {
      const inst = allInstitutions.find((i) => i.id === selectedInstitutionId);
      if (!inst) return;
      newRecord = {
        ...base,
        id: `att-mitra-${Date.now()}`,
        entityId: inst.id,
        name: (mitraPersonName || inst.name).toUpperCase(),
        jabatan: (mitraPosition || "Utusan").toUpperCase(),
        institution: inst.name.toUpperCase(),
        displayFormat:
          `${mitraPersonName || inst.name} ® ${inst.name}`.toUpperCase(),
      };
    } else if (mitraSource === "manual") {
      if (!manualInstitutionName) return;
      newRecord = {
        ...base,
        id: `att-mitra-${Date.now()}`,
        entityId: `manual-inst-${Date.now()}`,
        name: mitraPersonName || manualInstitutionName,
        jabatan: mitraPosition || "Utusan",
        institution: manualInstitutionName,
        displayFormat:
          `${mitraPersonName || manualInstitutionName} ® ${manualInstitutionName}`.toUpperCase(),
      };
    }

    if (newRecord) {
      const updated = [...records, newRecord];
      setRecords(updated);
      updateMeetingStore(updated);

      setMitraPersonName("");
      setMitraPosition("");
      setSelectedMitraId("");
      setSelectedInstitutionId("");
      setManualInstitutionName("");
      disclosureAddMitra.onClose();
    }
  };

  const handleAddTa = () => {
    if (!newTaName) return;

    const newRecord: AttendanceRecord = {
      id: `att-ta-${Date.now()}`,
      meetingId: meetingId,
      entityId: `manual-ta-${Date.now()}`,
      type: "TENAGA_AHLI",
      status: "HADIR",
      name: newTaName.toUpperCase(),
      jabatan: (newTaJabatan || "Tenaga Ahli").toUpperCase(),
      displayFormat:
        `${newTaName} ® ${newTaJabatan || "TENAGA AHLI"}`.toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    updateMeetingStore(updated);

    setNewTaName("");
    setNewTaJabatan("");
    disclosureAddTa.onClose();
  };

  const handleEdit = (record: AttendanceRecord) => {
    setEditingRecord(record);
    disclosureEdit.onOpen();
  };

  const handleUpdateRecord = () => {
    if (!editingRecord) return;

    // Recalculate displayFormat on update
    let newDisplayFormat = editingRecord.displayFormat;
    if (editingRecord.type === "ANGGOTA_DEWAN") {
      newDisplayFormat =
        `${editingRecord.name} ® ${editingRecord.jabatan}`.toUpperCase();
    } else if (editingRecord.type === "MITRA_KERJA") {
      newDisplayFormat =
        `${editingRecord.name} ® ${editingRecord.institution || "INSTANSI TERKAIT"}`.toUpperCase();
    } else if (editingRecord.type === "TENAGA_AHLI") {
      newDisplayFormat =
        `${editingRecord.name} ® ${editingRecord.jabatan || "TENAGA AHLI"}`.toUpperCase();
    }

    const updatedRecord = { ...editingRecord, displayFormat: newDisplayFormat };
    const updated = records.map((r) =>
      r.id === editingRecord.id ? updatedRecord : r,
    );

    setRecords(updated);
    updateMeetingStore(updated);
    disclosureEdit.onClose();
  };

  return {
    // Modal Controls
    disclosureAddMitra,
    disclosureAddTa,
    disclosureEdit,

    // Form States
    filterAKD,
    setFilterAKD,
    mitraSource,
    setMitraSource,
    selectedMitraId,
    setSelectedMitraId,
    selectedInstitutionId,
    setSelectedInstitutionId,
    manualInstitutionName,
    setManualInstitutionName,
    mitraPersonName,
    setMitraPersonName,
    mitraPosition,
    setMitraPosition,
    newTaName,
    setNewTaName,
    newTaJabatan,
    setNewTaJabatan,
    editingRecord,
    setEditingRecord,

    // Derived Data
    filteredInstitutions,
    filteredMitraPersons,

    // Handlers
    handleAddMitra,
    handleAddTa,
    handleEdit,
    handleUpdateRecord,
  };
}
