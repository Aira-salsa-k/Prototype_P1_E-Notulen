import { SemanticTone } from "@/types";

// Mapping ke HeroUI Color Props
// export const semanticToHeroColor: Record<SemanticTone, string> = {
//   info: "primary",
//   secondary: "secondary",
//   success: "success",
//   warning: "warning",
//   neutral: "default",
//   accent: "secondary",

//   teal: "primary",
//   cyan: "primary",
//   indigo: "secondary",
//   lime: "primary",
// };

export type HeroUIColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "default"
  | "danger";

export const semanticToHeroColor: Record<SemanticTone, HeroUIColor> = {
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
};


// Mapping ke Tailwind Classes (Untuk styling manual)
export const semanticToClassName: Record<SemanticTone, string> = {
  info: "bg-sky-100/60 text-sky-800 border border-sky-300/20",
  secondary: "bg-purple-100/60 text-purple-800 border border-purple-300/20",
  success: "bg-emerald-100/60 text-emerald-800 border border-emerald-300/30",
  warning: "bg-amber-100/60 text-amber-800 border border-amber-300/40",
  neutral: "bg-slate-100/60 text-slate-600 border border-slate-300/40",
  accent: "bg-orange-100/60 text-orange-800 border border-orange-300/40",
  
  teal: "bg-teal-100/60 text-teal-800 border border-teal-300/30",
  cyan: "bg-cyan-100/60 text-cyan-800 border border-cyan-400/30",
  indigo: "bg-indigo-100/60 text-indigo-800 border border-indigo-300/40",
  lime: "bg-lime-100/60 text-lime-800 border border-lime-500/30",
};
