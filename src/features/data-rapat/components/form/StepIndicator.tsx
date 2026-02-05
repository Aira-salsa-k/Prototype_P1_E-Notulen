import { CheckIcon } from "@heroicons/react/24/outline";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          currentStep === 1
            ? "bg-primary/10 text-primary font-bold border border-primary/20"
            : "text-gray-500"
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentStep === 1
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep > 1 ? <CheckIcon className="w-3 h-3" /> : "1"}
        </span>
        Informasi Rapat
      </div>
      <div className="w-8 h-[1px] bg-gray-300"></div>
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          currentStep === 2
            ? "bg-primary/10 text-primary font-bold border border-primary/20"
            : "text-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentStep === 2
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          2
        </span>
        Peserta & Petugas
      </div>
    </div>
  );
}
