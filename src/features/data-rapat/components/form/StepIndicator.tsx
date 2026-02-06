import { CheckIcon } from "@heroicons/react/24/outline";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          currentStep === 1
            ? "bg-white/20 text-white font-bold border border-white/30"
            : "text-white/60"
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentStep === 1
              ? "bg-white text-primary"
              : "bg-white/20 text-white/60"
          }`}
        >
          {currentStep > 1 ? <CheckIcon className="w-3 h-3" /> : "1"}
        </span>
        Informasi Rapat
      </div>
      <div className="w-8 h-[1px] bg-white/30"></div>
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          currentStep === 2
            ? "bg-white/20 text-white font-bold border border-white/30"
            : "text-white/60"
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentStep === 2
              ? "bg-white text-primary"
              : "bg-white/20 text-white/60"
          }`}
        >
          2
        </span>
        Peserta & Petugas
      </div>
    </div>
  );
}
