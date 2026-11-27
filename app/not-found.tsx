import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="rounded-2xl bg-card px-6 py-14 text-center ring-1 ring-foreground/10">
      <h1 className="font-serif text-3xl tracking-tight">That page is not in the book</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        The link may be old, or the company was never added.
      </p>
      <Button asChild className="mt-6 h-10">
        <Link href="/">Back to the pipeline</Link>
      </Button>
    </div>
  );
}
