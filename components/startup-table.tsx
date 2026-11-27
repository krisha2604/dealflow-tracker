"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { StageBadge } from "@/components/stage-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { STAGES } from "@/lib/stages";
import type { Startup } from "@/lib/types";

export function StartupTable({ startups }: { startups: Startup[] }) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("all");
  const [sector, setSector] = useState("all");

  const sectors = useMemo(() => {
    return Array.from(
      new Set(
        startups
          .map((startup) => startup.sector)
          .filter((value): value is string => Boolean(value)),
      ),
    ).sort((a, b) => a.localeCompare(b));
  }, [startups]);

  const filtered = startups.filter((startup) => {
    const matchesQuery = startup.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesStage = stage === "all" || startup.stage === stage;
    const matchesSector = sector === "all" || startup.sector === sector;
    return matchesQuery && matchesStage && matchesSector;
  });

  const filtersActive = query.trim() !== "" || stage !== "all" || sector !== "all";

  return (
    <section className="rounded-2xl bg-card ring-1 ring-foreground/10">
      <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium">Directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Showing {filtered.length} of {startups.length}
            </p>
          </div>
          {filtersActive ? (
            <Button
              type="button"
              variant="ghost"
              className="h-8"
              onClick={() => {
                setQuery("");
                setStage("all");
                setSector("all");
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name"
              aria-label="Search by name"
              className="h-10 pl-8"
            />
          </div>
          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger className="h-10 w-full" aria-label="Filter by stage">
              <SelectValue placeholder="All stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {STAGES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="h-10 w-full" aria-label="Filter by sector">
              <SelectValue placeholder="All sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sectors</SelectItem>
              {sectors.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <p className="font-medium">No companies match</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Try another name, or clear the stage and sector filters.
          </p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-border md:hidden">
            {filtered.map((startup) => (
              <li key={startup.id}>
                <Link
                  href={`/startups/${startup.id}`}
                  className="block px-4 py-4 transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{startup.name}</p>
                    <StageBadge stage={startup.stage} />
                  </div>
                  {startup.one_liner ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {startup.one_liner}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {[startup.sector, startup.location, formatDate(startup.created_at)]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="text-xs tracking-wide text-muted-foreground uppercase">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-3 py-3 font-medium">Sector</th>
                  <th className="px-3 py-3 font-medium">Stage</th>
                  <th className="px-3 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((startup) => (
                  <tr key={startup.id} className="border-b border-border last:border-0">
                    <td className="relative px-5 py-3.5">
                      <Link
                        href={`/startups/${startup.id}`}
                        className="font-medium after:absolute after:inset-0 after:content-['']"
                      >
                        {startup.name}
                      </Link>
                      {startup.one_liner ? (
                        <p className="mt-0.5 max-w-md truncate text-xs text-muted-foreground">
                          {startup.one_liner}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      {startup.sector ?? "—"}
                    </td>
                    <td className="px-3 py-3.5">
                      <StageBadge stage={startup.stage} />
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      {startup.location ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                      {formatDate(startup.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
