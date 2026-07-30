import { createFileRoute } from "@tanstack/react-router";
import { Activity, Clock, Gauge, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { StatCard } from "@/components/nemo/StatCard";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({
    meta: [
      { title: "Productivity Analytics | Nemo" },
      {
        name: "description",
        content:
          "Lightweight Nemo analytics: weekly AI usage, monthly productivity, response times and activity timeline.",
      },
      { property: "og:title", content: "Productivity Analytics | Nemo" },
      { property: "og:description", content: "Compact analytics cards for your AI workspace." },
    ],
  }),
  component: Analytics,
});

const WEEK = [
  { day: "M", v: 18 },
  { day: "T", v: 26 },
  { day: "W", v: 22 },
  { day: "T", v: 34 },
  { day: "F", v: 41 },
  { day: "S", v: 12 },
  { day: "S", v: 8 },
];

const TIMELINE = [
  { label: "Email drafted", time: "09:12" },
  { label: "Meeting summarised", time: "11:40" },
  { label: "Weekly plan generated", time: "13:05" },
  { label: "Research briefing", time: "15:28" },
  { label: "Assistant conversation", time: "16:47" },
];

function Ring({ value }: { value: number }) {
  const data = [
    { name: "done", v: value },
    { name: "left", v: 100 - value },
  ];
  return (
    <div className="relative h-28 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="v"
            innerRadius={38}
            outerRadius={52}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="var(--aqua)" />
            <Cell fill="var(--muted)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
        {value}%
      </span>
    </div>
  );
}

function Analytics() {
  return (
    <div className="mx-auto max-w-7xl animate-rise space-y-6">
      <header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Lightweight signals on how Nemo is helping you work.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI usage today" value="34" icon={Zap} series={[6, 9, 12, 18, 24, 29, 34]} />
        <StatCard label="Avg response time" value="1.4s" icon={Clock} series={[2.2, 2, 1.8, 1.6, 1.5, 1.4]} />
        <StatCard label="Efficiency score" value="87%" icon={Gauge} series={[70, 74, 78, 81, 85, 87]} />
        <StatCard label="Documents saved" value="41" icon={Sparkles} series={[8, 14, 19, 26, 33, 41]} />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="glass p-6" aria-labelledby="weekly-usage">
          <h2 id="weekly-usage" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Weekly usage
          </h2>
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK}>
                <Bar dataKey="v" radius={6} fill="var(--aqua)" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">161 AI requests this week</p>
        </section>

        <section className="glass flex flex-col items-center justify-center p-6" aria-labelledby="monthly">
          <h2 id="monthly" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Monthly productivity
          </h2>
          <div className="mt-3">
            <Ring value={78} />
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-success">
            <TrendingUp className="size-3.5" /> +12% vs last month
          </p>
        </section>

        <section className="glass p-6" aria-labelledby="timeline">
          <h2 id="timeline" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Activity className="size-4" /> Activity timeline
          </h2>
          <ol className="mt-4 space-y-3 border-l border-border pl-4">
            {TIMELINE.map((item) => (
              <li key={item.time} className="relative text-sm">
                <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-primary" />
                {item.label}
                <span className="ml-2 text-xs text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="text-xs text-muted-foreground">
        Analytics shown here are illustrative workspace metrics for demonstration purposes.
      </p>
    </div>
  );
}
