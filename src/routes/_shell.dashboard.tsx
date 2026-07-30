import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ChevronRight,
  Clock,
  FileCheck2,
  Gauge,
  ListTodo,
  Pin,
  Sparkles,
  Zap,
} from "lucide-react";

import { StatCard } from "@/components/nemo/StatCard";
import { NEMO_TOOLS } from "@/lib/nemo-tools";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Workspace Dashboard | Nemo" },
      {
        name: "description",
        content:
          "Your Nemo workspace home: quick actions, AI activity, productivity widgets and every AI application in one place.",
      },
      { property: "og:title", content: "Workspace Dashboard | Nemo" },
      { property: "og:description", content: "One dashboard for every Nemo AI application." },
    ],
  }),
  component: Dashboard,
});

const RECENT = [
  { label: "Drafted a follow-up email to Harbour Logistics", time: "4 min ago", icon: Sparkles },
  { label: "Summarised 'Q3 Planning' meeting notes", time: "38 min ago", icon: FileCheck2 },
  { label: "Built a weekly schedule for the design team", time: "2 h ago", icon: ListTodo },
  { label: "Researched AI copilot adoption benchmarks", time: "Yesterday", icon: Activity },
];

const FOCUS = [
  "Send the Harbour Logistics proposal",
  "Review meeting action items with Priya",
  "Block two hours for the Q3 report",
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl animate-rise space-y-6">
      <section className="glass-panel flex flex-wrap items-center gap-6 p-6 sm:p-8">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{greeting()}</p>
          <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">Welcome back to Nemo</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Work smarter. Pick a tool below, or jump straight into a conversation with your AI
            assistant.
          </p>
        </div>
        <div className="glass flex items-center gap-3 px-4 py-3">
          <span className="size-2.5 rounded-full bg-success animate-pulse-dot" />
          <div>
            <p className="text-sm font-medium">AI Ready</p>
            <p className="text-xs text-muted-foreground">Nemo AI · avg 1.4s response</p>
          </div>
        </div>
      </section>

      <section aria-label="Quick actions" className="flex flex-wrap gap-2">
        {NEMO_TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            to={tool.to}
            className="glass glass-hover flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <tool.icon className="size-4 text-primary" />
            {tool.title}
          </Link>
        ))}
      </section>

      <section aria-label="Productivity widgets" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="AI Requests"
          value="248"
          delta="+18% this week"
          icon={Zap}
          series={[12, 18, 14, 22, 26, 31, 38]}
        />
        <StatCard
          label="Tasks Completed"
          value="63"
          delta="+9 today"
          icon={ListTodo}
          series={[4, 6, 5, 9, 8, 11, 12]}
        />
        <StatCard
          label="Efficiency"
          value="87%"
          delta="+4 pts"
          icon={Gauge}
          series={[70, 72, 75, 79, 81, 84, 87]}
        />
        <StatCard
          label="Avg Response Time"
          value="1.4s"
          icon={Clock}
          series={[2.4, 2.1, 1.9, 1.8, 1.6, 1.5, 1.4]}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="glass p-6 lg:col-span-2" aria-labelledby="recent-activity">
          <h2 id="recent-activity" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent AI Activity
          </h2>
          <ul className="mt-4 space-y-3">
            {RECENT.map((item) => (
              <li key={item.label} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-border text-primary">
                  <item.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">{item.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-6" aria-labelledby="todays-focus">
          <h2 id="todays-focus" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Pin className="size-4" /> Today&apos;s Focus
          </h2>
          <ul className="mt-4 space-y-3">
            {FOCUS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Today&apos;s sessions</p>
            <p className="mt-1 text-2xl font-semibold">12</p>
            <p className="text-xs text-muted-foreground">7 documents saved</p>
          </div>
        </section>
      </div>

      <section aria-labelledby="applications">
        <h2 id="applications" className="text-lg font-semibold">
          Nemo AI Applications
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {NEMO_TOOLS.map((tool) => (
            <Link key={tool.slug} to={tool.to} className="glass glass-hover group p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-border surface-gradient text-primary-foreground transition-transform group-hover:scale-110">
                <tool.icon className="size-5" />
              </span>
              <h3 className="mt-4 flex items-center gap-2 text-base font-semibold">
                {tool.title}
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
