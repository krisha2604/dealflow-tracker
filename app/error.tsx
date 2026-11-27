"use client";

import { Button } from "@/components/ui/button";

export default function PipelineError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl bg-card px-6 py-14 text-center ring-1 ring-foreground/10">
      <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Pipeline
      </p>
      <h1 className="mt-2 font-serif text-3xl tracking-tight">Could not load companies</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {error.message || "Something went wrong while reading the pipeline."}
      </p>
      <Button type="button" onClick={reset} className="mt-6 h-10">
        Try again
      </Button>
    </div>
  );
}
