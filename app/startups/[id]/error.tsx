"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function StartupError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl bg-card px-6 py-14 text-center ring-1 ring-foreground/10">
      <h1 className="font-serif text-3xl tracking-tight">Could not open this company</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {error.message || "Something went wrong while reading the record."}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={reset} className="h-10">
          Try again
        </Button>
        <Button asChild variant="outline" className="h-10">
          <Link href="/">Back to the pipeline</Link>
        </Button>
      </div>
    </div>
  );
}
