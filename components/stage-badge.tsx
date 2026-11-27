import { cn } from "cn";

import { STAGE_STYLES, type Stage } from "@/lib/stages";

export function StageBadge({ stage, className }: { stage: Stage; className?: string }) {
  const style = STAGE_STYLES[stage];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        style.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {stage}
    </span>
  );
}
