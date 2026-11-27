"use client";

import { useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStartupStage } from "@/lib/actions";
import { STAGES, type Stage } from "@/lib/stages";

export function StageSelect({
  startupId,
  stage,
}: {
  startupId: string;
  stage: Stage;
}) {
  const [value, setValue] = useState(stage);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-1.5">
      <Select
        value={value}
        onValueChange={(next) => {
          const previous = value;
          setValue(next as Stage);
          setError(null);
          startTransition(async () => {
            const result = await updateStartupStage(startupId, next);
            if (!result.ok) {
              setValue(previous);
              setError(result.error);
            }
          });
        }}
      >
        <SelectTrigger className="h-10 w-full" aria-label="Change stage" disabled={pending}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STAGES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {pending ? "Saving stage…" : "Saves as soon as you pick a stage."}
      </p>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
