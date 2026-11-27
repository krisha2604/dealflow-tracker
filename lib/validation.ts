import { z } from "zod";

import { normalizeWebsite } from "@/lib/format";
import { STAGES, type Stage } from "@/lib/stages";

const startupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(120, "Keep the name under 120 characters."),
  sector: z.string().trim().max(80, "Keep the sector under 80 characters."),
  stage: z.enum(STAGES, { error: "Choose a pipeline stage." }),
  one_liner: z
    .string()
    .trim()
    .max(280, "Keep the one-liner under 280 characters."),
  website: z.string().trim().max(300, "That website is too long."),
  location: z.string().trim().max(80, "Keep the location under 80 characters."),
});

const noteSchema = z
  .string()
  .trim()
  .min(1, "Write a note before saving.")
  .max(2000, "Keep the note under 2000 characters.");

export type StartupInput = {
  name: string;
  sector: string | null;
  stage: Stage;
  one_liner: string | null;
  website: string | null;
  location: string | null;
};

export type FieldErrors = Partial<
  Record<"name" | "sector" | "stage" | "one_liner" | "website" | "location" | "body", string>
>;

export function parseStartupForm(formData: FormData):
  | { ok: true; value: StartupInput }
  | { ok: false; fieldErrors: FieldErrors } {
  const parsed = startupSchema.safeParse({
    name: stringField(formData, "name"),
    sector: stringField(formData, "sector"),
    stage: stringField(formData, "stage") || "Sourced",
    one_liner: stringField(formData, "one_liner"),
    website: stringField(formData, "website"),
    location: stringField(formData, "location"),
  });

  const fieldErrors: FieldErrors = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof FieldErrors] = issue.message;
      }
    }
  }

  const rawWebsite = parsed.success ? parsed.data.website : stringField(formData, "website");
  const website = normalizeWebsite(rawWebsite);
  if (rawWebsite && !website) {
    fieldErrors.website = "Enter a valid website, like https://example.com.";
  }

  if (!parsed.success || fieldErrors.website) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      name: parsed.data.name,
      sector: emptyToNull(parsed.data.sector),
      stage: parsed.data.stage,
      one_liner: emptyToNull(parsed.data.one_liner),
      website,
      location: emptyToNull(parsed.data.location),
    },
  };
}

export function parseNote(body: string):
  | { ok: true; value: string }
  | { ok: false; error: string } {
  const parsed = noteSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Write a note before saving." };
  }
  return { ok: true, value: parsed.data };
}

export const summaryRequestSchema = z.object({
  startup: z.object({
    name: z.string().trim().min(1).max(200),
    sector: z.string().trim().max(120).nullable(),
    stage: z.enum(STAGES),
    one_liner: z.string().trim().max(400).nullable(),
    website: z.string().trim().max(300).nullable(),
    location: z.string().trim().max(120).nullable(),
  }),
  notes: z
    .array(
      z.object({
        body: z.string().trim().min(1).max(4000),
        created_at: z.string().max(40),
      }),
    )
    .max(50),
});

function stringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function emptyToNull(value: string) {
  return value.trim() ? value.trim() : null;
}
