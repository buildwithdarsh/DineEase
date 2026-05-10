import { cn } from "@/lib/utils";
import type { DietaryTag } from "@/types";

const dietaryConfig: Record<DietaryTag, { label: string; color: string; dot: string }> = {
  veg: { label: "Veg", color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800", dot: "bg-green-500" },
  "non-veg": { label: "Non-Veg", color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800", dot: "bg-red-500" },
  egg: { label: "Egg", color: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800", dot: "bg-yellow-500" },
  vegan: { label: "Vegan", color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800", dot: "bg-emerald-500" },
  jain: { label: "Jain", color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800", dot: "bg-purple-500" },
  "gluten-free": { label: "GF", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800", dot: "bg-blue-500" },
  halal: { label: "Halal", color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800", dot: "bg-teal-500" },
  keto: { label: "Keto", color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800", dot: "bg-orange-500" },
  "nut-free": { label: "Nut-Free", color: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-400 dark:border-pink-800", dot: "bg-pink-500" },
  "dairy-free": { label: "DF", color: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800", dot: "bg-cyan-500" },
  "low-calorie": { label: "Low-Cal", color: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950 dark:text-lime-400 dark:border-lime-800", dot: "bg-lime-500" },
};

export function DietaryBadge({ tag, className }: { tag: DietaryTag; className?: string }) {
  const config = dietaryConfig[tag];
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase", config.color, className)}>
      <span className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
