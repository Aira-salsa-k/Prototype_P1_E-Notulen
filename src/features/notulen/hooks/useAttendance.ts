import { Meeting } from "@/types/meeting";
import { useAttendanceRecords } from "./useAttendanceRecords";
import { useAttendanceInitialization } from "./useAttendanceInitialization";
import { useAttendanceForms } from "./useAttendanceForms";
import { useAttendancePrint } from "./useAttendancePrint";

export function useAttendance(meeting: Meeting, initialRecords?: any[]) {
  // 1. Records Management
  const {
    records,
    setRecords,
    updateMeetingStore,
    handleStatusChange,
    handleDelete,
    allMembers,
  } = useAttendanceRecords(meeting, initialRecords);

  // 2. Initialization Logic
  useAttendanceInitialization({
    meeting,
    recordsLength: records.length,
    setRecords,
  });

  // 3. Forms & Modals Handlers
  const forms = useAttendanceForms({
    meetingId: meeting?.id,
    records,
    setRecords,
    updateMeetingStore,
  });

  // 4. Print Logic
  const printDocs = useAttendancePrint({
    meeting,
    records,
    allMembers,
  });

  return {
    // Records & Members
    records,
    allMembers,
    // Forms expose filtered lists too
    filteredInstitutions: forms.filteredInstitutions,
    filteredMitraPersons: forms.filteredMitraPersons,

    // Print State
    printData: printDocs.printData,
    printTitle: printDocs.printTitle,
    finalPrintSettings: printDocs.finalPrintSettings,
    isPrintModalOpen: printDocs.isPrintModalOpen,
    setIsPrintModalOpen: printDocs.setIsPrintModalOpen,
    printDate: printDocs.printDate,
    setPrintDate: printDocs.setPrintDate,
    printHeaderTitle: printDocs.printHeaderTitle,
    setPrintHeaderTitle: printDocs.setPrintHeaderTitle,
    selectedSignatoryId: printDocs.selectedSignatoryId,
    setSelectedSignatoryId: printDocs.setSelectedSignatoryId,
    printMode: printDocs.printMode,
    setPrintMode: printDocs.setPrintMode,

    // Modal States
    disclosureAddMitra: forms.disclosureAddMitra,
    disclosureAddTa: forms.disclosureAddTa,
    disclosureEdit: forms.disclosureEdit,

    // Form States
    filterAKD: forms.filterAKD,
    setFilterAKD: forms.setFilterAKD,
    mitraSource: forms.mitraSource,
    setMitraSource: forms.setMitraSource,
    selectedMitraId: forms.selectedMitraId,
    setSelectedMitraId: forms.setSelectedMitraId,
    selectedInstitutionId: forms.selectedInstitutionId,
    setSelectedInstitutionId: forms.setSelectedInstitutionId,
    manualInstitutionName: forms.manualInstitutionName,
    setManualInstitutionName: forms.setManualInstitutionName,
    mitraPersonName: forms.mitraPersonName,
    setMitraPersonName: forms.setMitraPersonName,
    mitraPosition: forms.mitraPosition,
    setMitraPosition: forms.setMitraPosition,
    newTaName: forms.newTaName,
    setNewTaName: forms.setNewTaName,
    newTaJabatan: forms.newTaJabatan,
    setNewTaJabatan: forms.setNewTaJabatan,
    editingRecord: forms.editingRecord,
    setEditingRecord: forms.setEditingRecord,

    // Handlers
    handleStatusChange,
    handleAddMitra: forms.handleAddMitra,
    handleAddTa: forms.handleAddTa,
    handleDelete,
    handleEdit: forms.handleEdit,
    handleUpdateRecord: forms.handleUpdateRecord,
    openPrintSettings: printDocs.openPrintSettings,
    handleConfirmPrint: printDocs.handleConfirmPrint,
  };
}
