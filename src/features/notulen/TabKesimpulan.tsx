"use client";

import { useEffect, useState, useRef } from "react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { AppButton } from "@/components/ui/button/AppButton";

interface TabKesimpulanProps {
  isReadOnly?: boolean;
}

export default function TabKesimpulan({
  isReadOnly = false,
}: TabKesimpulanProps) {
  const { minutesData, actions } = useNotulenStore();

  const [decisions, setDecisions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isInitialized = useRef(false);

  // Initialize state from store only once
  useEffect(() => {
    if (minutesData && !isInitialized.current) {
      setDecisions(minutesData.decisions || ["", ""]);
      setNotes(minutesData.catatan || "");
      isInitialized.current = true;
    }
  }, [minutesData]);

  // Auto-save logic
  useEffect(() => {
    if (isReadOnly || !isInitialized.current) return;

    // Check if there are actual changes compared to what's in the store
    const isDifferent =
      JSON.stringify(decisions) !== JSON.stringify(minutesData?.decisions) ||
      notes !== (minutesData?.catatan || "");

    if (!isDifferent) {
      setHasUnsavedChanges(false);
      return;
    }

    setHasUnsavedChanges(true);
    setIsSaving(true);

    const timer = setTimeout(() => {
      actions.updateDecisions(decisions);
      actions.updateNotes(notes);
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 1500); // 1.5 second debounce for auto-save

    return () => clearTimeout(timer);
  }, [decisions, notes, actions, minutesData, isReadOnly]);

  const handleDecisionChange = (index: number, value: string) => {
    const newDecisions = [...decisions];
    newDecisions[index] = value;
    setDecisions(newDecisions);
  };

  const addDecision = () => {
    setDecisions([...decisions, ""]);
  };

  const removeDecision = (index: number) => {
    if (decisions.length <= 2) return;
    const newDecisions = decisions.filter((_, i) => i !== index);
    setDecisions(newDecisions);
  };

  const handleManualSave = () => {
    actions.updateDecisions(decisions);
    actions.updateNotes(notes);
    setHasUnsavedChanges(false);
    setIsSaving(false);
  };

  if (isReadOnly) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Hasil Keputusan Rapat
          </h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[100px] text-gray-800">
            {minutesData?.decisions && minutesData.decisions.length > 0 ? (
              <ol className="list-decimal pl-5 space-y-1">
                {minutesData.decisions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500 italic">Belum ada keputusan.</p>
            )}
          </div>
        </div>

        {minutesData?.catatan && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Catatan</h3>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 whitespace-pre-wrap text-gray-800">
              {minutesData.catatan}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20 relative">
      {/* KEPUTUSAN */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Hasil Keputusan Rapat
            </h3>
            <p className="text-gray-500 text-sm">
              Masukan poin-poin keputusan rapat (minimal 2 poin).
            </p>
          </div>
          <AppButton
            size="sm"
            color="ungu-muda"
           
            startContent={<PlusIcon className="w-4 h-4" />}
            onClick={addDecision}
          >
            Tambah Poin
          </AppButton>
        </div>

        <div className="space-y-3">
          {decisions.map((decision, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="mt-3 text-gray-500 font-medium w-6 text-right">
                {index + 1}.
              </span>
              <div className="flex-1">
                <Textarea
                  minRows={1}
                  variant="bordered"
                  placeholder={`Poin keputusan ke-${index + 1}`}
                  value={decision}
                  onChange={(e) => handleDecisionChange(index, e.target.value)}
                  className="bg-white"
                />
              </div>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onClick={() => removeDecision(index)}
                isDisabled={decisions.length <= 2}
                className="mt-1"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* CATATAN */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Catatan (Opsional)
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Tambahkan catatan tambahan jika diperlukan.
        </p>
        <Textarea
          minRows={4}
          variant="bordered"
          placeholder="Tulis catatan tambahan disini..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-white"
        />
      </div>

      {/* STATUS INDICATOR & SAVE BUTTON */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-sm p-2 pl-4 rounded-full border shadow-lg animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-2 text-sm">
          {isSaving ? (
            <>
              <ArrowPathIcon className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-blue-600 font-medium">Menyimpan...</span>
            </>
          ) : hasUnsavedChanges ? (
            <>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-amber-600 font-medium">Ada perubahan</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">
                Tersimpan otomatis
              </span>
            </>
          )}
        </div>
        <Button
          color={hasUnsavedChanges ? "primary" : "default"}
          variant={hasUnsavedChanges ? "solid" : "flat"}
          size="sm"
          onPress={handleManualSave}
          isDisabled={!hasUnsavedChanges}
          className="rounded-full px-6"
        >
          Simpan Sekarang
        </Button>
      </div>
    </div>
  );
}
