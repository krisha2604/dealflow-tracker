"use client";

import { useActionState, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createStartup, type ActionState } from "@/lib/actions";
import { STAGES } from "@/lib/stages";

export function AddStartupDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createStartup,
    { status: "idle" } satisfies ActionState,
  );
  const errors = state.fieldErrors ?? {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 px-3.5">
          <Plus />
          Add startup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a startup</DialogTitle>
          <DialogDescription>
            Name is required. Everything else can wait until the first call.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} noValidate className="grid gap-4">
          <Field label="Name" htmlFor="name" error={errors.name}>
            <Input
              id="name"
              name="name"
              maxLength={120}
              placeholder="Northwind Robotics"
              aria-invalid={Boolean(errors.name)}
              className="h-10"
            />
          </Field>
          <Field label="One-liner" htmlFor="one_liner" error={errors.one_liner}>
            <Textarea
              id="one_liner"
              name="one_liner"
              maxLength={280}
              placeholder="What they do, in one sentence."
              aria-invalid={Boolean(errors.one_liner)}
              className="min-h-20"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Sector" htmlFor="sector" error={errors.sector}>
              <Input
                id="sector"
                name="sector"
                maxLength={80}
                placeholder="Fintech"
                aria-invalid={Boolean(errors.sector)}
                className="h-10"
              />
            </Field>
            <Field label="Location" htmlFor="location" error={errors.location}>
              <Input
                id="location"
                name="location"
                maxLength={80}
                placeholder="New York, NY"
                aria-invalid={Boolean(errors.location)}
                className="h-10"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website" htmlFor="website" error={errors.website}>
              <Input
                id="website"
                name="website"
                inputMode="url"
                placeholder="https://"
                aria-invalid={Boolean(errors.website)}
                className="h-10"
              />
            </Field>
            <Field label="Stage" htmlFor="stage" error={errors.stage}>
              <Select name="stage" defaultValue="Sourced">
                <SelectTrigger id="stage" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          {state.status === "error" && state.message ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {state.message}
            </p>
          ) : null}
          <DialogFooter className="mt-1">
            <Button type="submit" disabled={pending} className="h-10">
              {pending ? "Saving…" : "Save startup"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
