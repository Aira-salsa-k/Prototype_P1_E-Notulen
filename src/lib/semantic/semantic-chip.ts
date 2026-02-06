import { SemanticTone } from "@/types";



export type HeroUIColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "default"
  | "danger";

export const semanticToHeroColor: Record<string, HeroUIColor> = {
  info: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  neutral: "default",
  accent: "secondary",

  teal: "primary",
  cyan: "primary",
  indigo: "secondary",
  lime: "primary",

  // Aliases for HeroUI compatibility
  primary: "primary",
  default: "default",
  danger: "danger",
};

// Mapping ke Tailwind Classes (Untuk styling manual)
export const semanticToClassName: Record<string, string> = {
  info: "bg-sky-100 text-sky-800 border border-sky-300/20",
  secondary: "bg-purple-100 text-purple-800 border border-purple-300/20",
  success: "bg-emerald-100 text-emerald-800 border border-emerald-300/30",
  warning: "bg-amber-100 text-amber-800 border border-amber-300/40",
  neutral: "bg-slate-200/60 text-slate-600 border border-slate-300/40",
  accent: "bg-orange-100 text-orange-800 border border-orange-300/40",

  teal: "bg-teal-100 text-teal-800 border border-teal-300/30",
  cyan: "bg-cyan-100 text-cyan-800 border border-cyan-400/30",
  indigo: "bg-indigo-100 text-indigo-800 border border-indigo-300/40",
  lime: "bg-lime-100 text-lime-800 border border-lime-500/30",

  // Aliases for HeroUI compatibility
  primary: "bg-sky-200/70 text-sky-800 border border-sky-300/20",
  default: "bg-slate-200 text-slate-600 border border-slate-300/40",
  danger: "bg-red-200 text-red-800 border border-red-300/30",
};
