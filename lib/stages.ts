export const STAGES = [
  "Sourced",
  "Screening",
  "Diligence",
  "Term Sheet",
  "Passed",
  "Invested",
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_STYLES: Record<
  Stage,
  { badge: string; dot: string; bar: string }
> = {
  Sourced: {
    badge: "bg-stone-100 text-stone-700 ring-stone-200",
    dot: "bg-stone-400",
    bar: "#a8a29e",
  },
  Screening: {
    badge: "bg-sky-50 text-sky-800 ring-sky-200",
    dot: "bg-sky-600",
    bar: "#0369a1",
  },
  Diligence: {
    badge: "bg-amber-50 text-amber-900 ring-amber-200",
    dot: "bg-amber-600",
    bar: "#b45309",
  },
  "Term Sheet": {
    badge: "bg-violet-50 text-violet-800 ring-violet-200",
    dot: "bg-violet-600",
    bar: "#6d28d9",
  },
  Passed: {
    badge: "bg-rose-50 text-rose-800 ring-rose-200",
    dot: "bg-rose-500",
    bar: "#be123c",
  },
  Invested: {
    badge: "bg-emerald-50 text-emerald-900 ring-emerald-200",
    dot: "bg-emerald-700",
    bar: "#1f6b4a",
  },
};

export function isStage(value: string): value is Stage {
  return (STAGES as readonly string[]).includes(value);
}
