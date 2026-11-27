import { AddStartupDialog } from "@/components/add-startup-dialog";
import { SetupBanner } from "@/components/setup-banner";
import { StageChart } from "@/components/stage-chart";
import { StatStrip } from "@/components/stat-strip";
import { StartupTable } from "@/components/startup-table";
import { listStartups } from "@/lib/startups";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { startups, demo } = await listStartups();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Internal
          </p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Pipeline</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every company the team is tracking, from a first mention to a closed round.
            Open any company to add notes, change its stage and generate an investment brief.
          </p>
        </div>
        <AddStartupDialog />
      </div>

      {demo ? <SetupBanner /> : null}

      {startups.length === 0 ? (
        <section className="rounded-2xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
          <h2 className="font-serif text-3xl tracking-tight">The pipeline is empty</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Add the first company, then move it through sourced, screening, diligence, and a term sheet.
          </p>
        </section>
      ) : (
        <>
          <StatStrip startups={startups} />
          <StageChart startups={startups} />
          <StartupTable startups={startups} />
        </>
      )}
    </div>
  );
}
