"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isStage } from "@/lib/stages";
import { createSupabaseServer, isSupabaseConfigured } from "@/lib/supabase";
import { parseNote, parseStartupForm, type FieldErrors } from "@/lib/validation";

export type ActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
};

const idleActionState: ActionState = { status: "idle" };

const READ_ONLY =
  "Supabase is not connected, so this preview cannot be saved. Add the keys in .env.local and restart the server.";

export async function createStartup(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseStartupForm(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return { status: "error", message: READ_ONLY };
  }

  const supabase = createSupabaseServer();
  if (!supabase) return { status: "error", message: READ_ONLY };

  const { data, error } = await supabase
    .from("startups")
    .insert(parsed.value)
    .select("id")
    .single();

  if (error || !data) {
    return {
      status: "error",
      message: error
        ? `Could not add the company. ${error.message}`
        : "Could not add the company.",
    };
  }

  revalidatePath("/");
  redirect(`/startups/${data.id}`);
}

export async function updateStartupStage(
  id: string,
  stage: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isStage(stage)) {
    return { ok: false, error: "Choose a pipeline stage." };
  }
  if (!isSupabaseConfigured()) {
    return { ok: false, error: READ_ONLY };
  }

  const supabase = createSupabaseServer();
  if (!supabase) return { ok: false, error: READ_ONLY };

  const { error } = await supabase.from("startups").update({ stage }).eq("id", id);
  if (error) {
    return { ok: false, error: `Could not update the stage. ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath(`/startups/${id}`);
  return { ok: true };
}

export async function addNote(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const startupId = stringField(formData, "startup_id");
  const parsed = parseNote(stringField(formData, "body"));
  if (!startupId) {
    return { status: "error", message: "Missing company." };
  }
  if (!parsed.ok) {
    return { status: "error", message: parsed.error, fieldErrors: { body: parsed.error } };
  }
  if (!isSupabaseConfigured()) {
    return { status: "error", message: READ_ONLY };
  }

  const supabase = createSupabaseServer();
  if (!supabase) return { status: "error", message: READ_ONLY };

  const { error } = await supabase.from("notes").insert({
    startup_id: startupId,
    body: parsed.value,
  });

  if (error) {
    return { status: "error", message: `Could not save the note. ${error.message}` };
  }

  revalidatePath(`/startups/${startupId}`);
  return idleActionState;
}

function stringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
