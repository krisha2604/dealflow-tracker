import type { Stage } from "@/lib/stages";

export type Startup = {
  id: string;
  name: string;
  sector: string | null;
  stage: Stage;
  one_liner: string | null;
  website: string | null;
  location: string | null;
  created_at: string;
};

export type Note = {
  id: string;
  startup_id: string;
  body: string;
  created_at: string;
};

export type Pipeline = {
  startups: Startup[];
  demo: boolean;
};

export type StartupDetail = {
  startup: Startup;
  notes: Note[];
  demo: boolean;
};
