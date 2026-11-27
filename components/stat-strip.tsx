import { STAGES, STAGE_STYLES } from "@/lib/stages";
import type { Startup } from "@/lib/types";

export function StatStrip({ startups }: { startups: Startup[] }) {
  const counts = new Map<string, number>();
  for (const stage of STAGES) counts.set(stage, 0);
  for (const startup of startups) {
    counts.set(startup.stage, (counts.get(startup.stage) ?? 0) + 1);
  }

  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)]">
      <article className="rounded-2xl bg-primary px-5 py-5 text-primary-foreground">
        <p className="text-xs font-medium tracking-[0.14em] uppercase opacity-80">
          In the pipeline
        </p>
        <p className="mt-3 font-mono text-4xl tracking-tight tabular-nums">
          {startups.length}
        </p>
        <p className="mt-2 text-sm text-primary-foreground/80">
          {startups.length === 1 ? "Company" : "Companies"} across six stages.
        </p>
      </article>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="rounded-2xl bg-card px-4 py-3.5 ring-1 ring-foreground/10"
          >
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: STAGE_STYLES[stage].bar }}
                aria-hidden="true"
              />
              {stage}
            </dt>
            <dd className="mt-2 font-mono text-2xl tracking-tight tabular-nums">
              {counts.get(stage)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
