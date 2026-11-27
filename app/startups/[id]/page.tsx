import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { NotesPanel } from "@/components/notes-panel";
import { SetupBanner } from "@/components/setup-banner";
import { StageBadge } from "@/components/stage-badge";
import { StageSelect } from "@/components/stage-select";
import { SummaryPanel } from "@/components/summary-panel";
import { formatDate, websiteLabel } from "@/lib/format";
import { getStartup } from "@/lib/startups";

export const dynamic = "force-dynamic";

export default async function StartupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getStartup(id);
  if (!record) notFound();

  const { startup, notes, demo } = record;

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Pipeline
      </Link>

      {demo ? <SetupBanner /> : null}

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <StageBadge stage={startup.stage} />
          {startup.sector ? (
            <span className="text-sm text-muted-foreground">{startup.sector}</span>
          ) : null}
        </div>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{startup.name}</h1>
        {startup.one_liner ? (
          <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground italic">
            {startup.one_liner}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No one-liner yet.</p>
        )}
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl bg-card ring-1 ring-foreground/10">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-medium">Record</h2>
            </div>
            <dl className="grid gap-5 px-5 py-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Stage
                </dt>
                <dd className="mt-2 max-w-xs">
                  <StageSelect startupId={startup.id} stage={startup.stage} />
                </dd>
              </div>
              <Fact label="Sector" value={startup.sector} />
              <Fact label="Location" value={startup.location} />
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Website
                </dt>
                <dd className="mt-1.5 text-sm">
                  {startup.website ? (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                    >
                      {websiteLabel(startup.website)}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </dd>
              </div>
              <Fact label="Added" value={formatDate(startup.created_at)} />
            </dl>
          </section>
          <NotesPanel startupId={startup.id} notes={notes} />
        </div>
        <SummaryPanel startup={startup} notes={notes} />
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm">{value || "—"}</dd>
    </div>
  );
}
