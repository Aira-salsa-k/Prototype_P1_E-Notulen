"use client";

import React from "react";
import { Meeting } from "@/types/meeting";
import { AttendancePrintDocument } from "./components/attendance/AttendancePrintDocument";

// Components
import { AttendanceTable } from "./components/attendance/AttendanceTable";
import { AddMitraModal } from "./components/attendance/AddMitraModal";
import { AddTaModal } from "./components/attendance/AddTaModal";
import { EditParticipantModal } from "./components/attendance/EditParticipantModal";
import { PrintSettingsModal } from "./components/attendance/PrintSettingsModal";

// Hooks & Logic
import { useAttendance } from "./hooks/useAttendance";

interface TabAbsensiProps {
  meeting: Meeting;
  isReadOnly?: boolean;
  initialRecords?: any[];
}

export default function TabAbsensi({
  meeting,
  isReadOnly = false,
  initialRecords,
}: TabAbsensiProps) {
  const {
    records,
    allMembers,
    filteredInstitutions,

    // Print State
    printData,
    printTitle,
    finalPrintSettings,
    isPrintModalOpen,
    setIsPrintModalOpen,
    printDate,
    setPrintDate,
    printHeaderTitle,
    setPrintHeaderTitle,
    selectedSignatoryId,
    setSelectedSignatoryId,
    printMode,
    setPrintMode,

    // Modal States
    disclosureAddMitra,
    disclosureAddTa,
    disclosureEdit,

    // Form States
    filterAKD,
    setFilterAKD,
    mitraSource,
    setMitraSource,
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

    // Handlers
    handleStatusChange,
    handleAddMitra,
    handleAddTa,
    handleDelete,
    handleEdit,
    handleUpdateRecord,
    openPrintSettings,
    handleConfirmPrint,
  } = useAttendance(meeting, initialRecords);

  return (
    <>
      {/* Hidden Print Document - Must be outside print:hidden scope */}
      <AttendancePrintDocument
        meeting={meeting}
        title={printTitle}
        data={printData}
        settings={finalPrintSettings}
      />

      <div className="space-y-8 print:hidden">
        {/* Render Tables */}
        <AttendanceTable
          type="ANGGOTA_DEWAN"
          title="Anggota Dewan"
          data={records.filter((r) => r.type === "ANGGOTA_DEWAN")}
          isReadOnly={isReadOnly}
          canAdd={false}
          onPrint={openPrintSettings}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AttendanceTable
          type="MITRA_KERJA"
          title="Mitra Kerja"
          data={records.filter((r) => r.type === "MITRA_KERJA")}
          isReadOnly={isReadOnly}
          canAdd={true}
          onAdd={disclosureAddMitra.onOpen}
          onPrint={openPrintSettings}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AttendanceTable
          type="TENAGA_AHLI"
          title="Tenaga Ahli"
          data={records.filter((r) => r.type === "TENAGA_AHLI")}
          isReadOnly={isReadOnly}
          canAdd={true}
          onAdd={disclosureAddTa.onOpen}
          onPrint={openPrintSettings}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modular Modals */}
      <AddMitraModal
        isOpen={disclosureAddMitra.isOpen}
        onClose={disclosureAddMitra.onClose}
        filterAKD={filterAKD}
        setFilterAKD={setFilterAKD}
        mitraSource={mitraSource}
        setMitraSource={setMitraSource}
        selectedInstitutionId={selectedInstitutionId}
        setSelectedInstitutionId={setSelectedInstitutionId}
        mitraPersonName={mitraPersonName}
        setMitraPersonName={setMitraPersonName}
        mitraPosition={mitraPosition}
        setMitraPosition={setMitraPosition}
        manualInstitutionName={manualInstitutionName}
        setManualInstitutionName={setManualInstitutionName}
        filteredInstitutions={filteredInstitutions}
        onSave={handleAddMitra}
      />

      <AddTaModal
        isOpen={disclosureAddTa.isOpen}
        onClose={disclosureAddTa.onClose}
        name={newTaName}
        setName={setNewTaName}
        jabatan={newTaJabatan}
        setJabatan={setNewTaJabatan}
        onSave={handleAddTa}
      />

      <EditParticipantModal
        isOpen={disclosureEdit.isOpen}
        onClose={disclosureEdit.onClose}
        record={editingRecord}
        setRecord={setEditingRecord}
        onSave={handleUpdateRecord}
        filterAKD={filterAKD}
        setFilterAKD={setFilterAKD}
        filteredInstitutions={filteredInstitutions}
      />

      <PrintSettingsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        printDate={printDate}
        setPrintDate={setPrintDate}
        selectedSignatoryId={selectedSignatoryId}
        setSelectedSignatoryId={setSelectedSignatoryId}
        signatories={allMembers}
        printHeaderTitle={printHeaderTitle}
        setPrintHeaderTitle={setPrintHeaderTitle}
        printMode={printMode}
        setPrintMode={setPrintMode}
        onConfirm={handleConfirmPrint}
      />

      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body * {
            visibility: hidden;
          }
          #attendance-print-document,
          #attendance-print-document * {
            visibility: visible;
          }
          #attendance-print-document .invisible,
          #attendance-print-document .invisible * {
            visibility: hidden !important;
          }
          #attendance-print-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
}
