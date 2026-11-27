"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Note, Startup } from "@/lib/types";

type Brief = {
  what: string;
  notes: string;
  next: string;
};

export function SummaryPanel({
  startup,
  notes,
}: {
  startup: Startup;
  notes: Note[];
}) {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function generate() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startup: {
            name: startup.name,
            sector: startup.sector,
            stage: startup.stage,
            one_liner: startup.one_liner,
            website: startup.website,
            location: startup.location,
          },
          notes: notes.map((note) => ({
            body: note.body,
            created_at: note.created_at,
          })),
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { summary?: Brief; error?: string }
        | null;
      if (!response.ok || !payload?.summary) {
        setBrief(null);
        setError(payload?.error ?? "Could not generate a summary.");
        return;
      }
      setBrief(payload.summary);
    } catch {
      setBrief(null);
      setError("The summary request did not reach the server.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="rounded-2xl bg-card px-5 py-5 ring-1 ring-foreground/10 lg:sticky lg:top-6">
      <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
        Investment brief
      </p>
      <h2 className="mt-2 font-serif text-2xl tracking-tight">Three bullets</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Drafted from this record and its notes. Nothing is stored.
      </p>
      <Button
        type="button"
        onClick={generate}
        disabled={pending}
        className="mt-4 h-10"
      >
        <Sparkles />
        {pending ? "Drafting…" : "Generate summary"}
      </Button>

      {pending ? (
        <div className="mt-5 space-y-3" aria-hidden="true">
          <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {brief && !pending ? (
        <ul className="mt-5 space-y-4 text-sm leading-relaxed">
          <BriefItem label="What it does" body={brief.what} />
          <BriefItem label="From the notes" body={brief.notes} />
          <BriefItem label="Suggested next step" body={brief.next} />
        </ul>
      ) : null}
    </section>
  );
}

function BriefItem({ label, body }: { label: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <p>
        <span className="font-medium">{label}. </span>
        {body}
      </p>
    </li>
  );
}
