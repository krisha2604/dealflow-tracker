"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addNote, type ActionState } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import type { Note } from "@/lib/types";

export function NotesPanel({
  startupId,
  notes,
}: {
  startupId: string;
  notes: Note[];
}) {
  const [state, formAction, pending] = useActionState(
    addNote,
    { status: "idle" } satisfies ActionState,
  );

  return (
    <section className="rounded-2xl bg-card ring-1 ring-foreground/10">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-medium">Notes</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Calls, references, and the reason a stage moved.
        </p>
      </div>
      {notes.length === 0 ? (
        <p className="px-5 py-8 text-sm text-muted-foreground">
          No notes yet. The first one usually comes from a sourcing call.
        </p>
      ) : (
        <ol className="divide-y divide-border">
          {notes.map((note) => (
            <li key={note.id} className="px-5 py-4">
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                {formatDate(note.created_at)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">{note.body}</p>
            </li>
          ))}
        </ol>
      )}
      <form action={formAction} className="grid gap-2 border-t border-border px-5 py-4">
        <input type="hidden" name="startup_id" value={startupId} />
        <Label htmlFor="note-body">Add a note</Label>
        <Textarea
          id="note-body"
          name="body"
          key={notes[0]?.id ?? "empty"}
          required
          maxLength={2000}
          placeholder="What did we learn, and what is still open?"
          aria-invalid={Boolean(state.fieldErrors?.body)}
          className="min-h-24"
        />
        {state.status === "error" && state.message ? (
          <p className="text-xs text-destructive">{state.message}</p>
        ) : null}
        <div>
          <Button type="submit" disabled={pending} className="h-10">
            {pending ? "Saving…" : "Add note"}
          </Button>
        </div>
      </form>
    </section>
  );
}
