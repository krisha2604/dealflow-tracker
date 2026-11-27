import { connection } from "next/server";

import { demoNotes, demoStartups } from "@/lib/demo-data";
import { isStage } from "@/lib/stages";
import { createSupabaseServer, isSupabaseConfigured } from "@/lib/supabase";
import type { Note, Pipeline, Startup, StartupDetail } from "@/lib/types";

export async function listStartups(): Promise<Pipeline> {
  await connection();

  if (!isSupabaseConfigured()) {
    return { startups: demoStartups, demo: true };
  }

  const supabase = createSupabaseServer();
  if (!supabase) return { startups: demoStartups, demo: true };

  const { data, error } = await supabase
    .from("startups")
    .select("id, name, sector, stage, one_liner, website, location, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load the pipeline. ${error.message}`);
  }

  return { startups: (data ?? []).map(asStartup), demo: false };
}

export async function getStartup(id: string): Promise<StartupDetail | null> {
  await connection();

  if (!isSupabaseConfigured()) {
    const startup = demoStartups.find((item) => item.id === id);
    if (!startup) return null;
    return {
      startup,
      notes: demoNotes.filter((note) => note.startup_id === id),
      demo: true,
    };
  }

  const supabase = createSupabaseServer();
  if (!supabase) return null;

  const { data: startup, error } = await supabase
    .from("startups")
    .select("id, name, sector, stage, one_liner, website, location, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load this company. ${error.message}`);
  }
  if (!startup) return null;

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("id, startup_id, body, created_at")
    .eq("startup_id", id)
    .order("created_at", { ascending: false });

  if (notesError) {
    throw new Error(`Could not load notes. ${notesError.message}`);
  }

  return {
    startup: asStartup(startup),
    notes: (notes ?? []).map(asNote),
    demo: false,
  };
}

function asStartup(row: {
  id: string;
  name: string;
  sector: string | null;
  stage: string;
  one_liner: string | null;
  website: string | null;
  location: string | null;
  created_at: string;
}): Startup {
  if (!isStage(row.stage)) {
    throw new Error(`Unexpected stage "${row.stage}" on ${row.name}.`);
  }
  return { ...row, stage: row.stage };
}

function asNote(row: Note): Note {
  return row;
}
