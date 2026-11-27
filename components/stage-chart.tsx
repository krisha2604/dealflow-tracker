"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { STAGES, STAGE_STYLES } from "@/lib/stages";
import type { Startup } from "@/lib/types";

export function StageChart({ startups }: { startups: Startup[] }) {
  const data = STAGES.map((stage) => ({
    stage,
    count: startups.filter((startup) => startup.stage === stage).length,
    fill: STAGE_STYLES[stage].bar,
  }));

  return (
    <section className="rounded-2xl bg-card px-4 py-5 ring-1 ring-foreground/10 sm:px-5">
      <div className="mb-2 flex items-baseline justify-between gap-4 px-1">
        <h2 className="text-sm font-medium">Companies by stage</h2>
        <p className="text-xs text-muted-foreground">Full book, not the filtered list</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 28, bottom: 0, left: 4 }}
            barCategoryGap={14}
          >
            <XAxis type="number" allowDecimals={false} hide />
            <YAxis
              type="category"
              dataKey="stage"
              width={92}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#78716c", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "oklch(0.955 0.01 90)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid oklch(0.9 0.012 85)",
                boxShadow: "none",
                fontSize: 12,
              }}
              formatter={(value) => [value, "Companies"]}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16} isAnimationActive={false}>
              {data.map((entry) => (
                <Cell key={entry.stage} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                fill="#78716c"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Startups per stage</caption>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.stage}>
              <td>{entry.stage}</td>
              <td>{entry.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
