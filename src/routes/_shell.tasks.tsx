import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { ToolWorkspace } from "@/components/nemo/ToolWorkspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/_shell/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Nemo" },
      {
        name: "description",
        content:
          "Prioritise tasks by urgency and importance and get a realistic daily or weekly schedule from Nemo.",
      },
      { property: "og:title", content: "AI Task Planner | Nemo" },
      {
        property: "og:description",
        content: "Daily and weekly AI schedules with priority matrix and productivity tips.",
      },
    ],
  }),
  component: TasksPage,
});

type Horizon = "Daily" | "Weekly";

function TasksPage() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<Horizon>("Daily");
  const [workingHours, setWorkingHours] = useState("09:00 - 17:00");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (tasks.trim().length < 5) {
      setError("List at least one task.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { text } = await run({ data: { tasks, horizon, workingHours } });
      setResult(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkspace
      title="AI Task Planner"
      description="Prioritised, time-blocked plans built around your real workload."
      icon={<CalendarDays className="size-5" />}
      statusLabel="Planning Tasks"
      downloadName="nemo-plan"
      examples={[
        "Finish Q3 report, 3 client calls, team 1:1s",
        "Launch prep: copy review, QA, stakeholder sign-off",
        "Inbox zero, roadmap draft, hiring interviews",
      ]}
      onExample={(example) => setTasks(example)}
      result={result}
      loading={loading}
      error={error}
      onRegenerate={() => void submit()}
      form={
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="tasks">Tasks and commitments</Label>
            <Textarea
              id="tasks"
              value={tasks}
              rows={10}
              maxLength={8000}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="One task per line, with any deadlines you know..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="horizon">Planning horizon</Label>
              <Select value={horizon} onValueChange={(value) => setHorizon(value as Horizon)}>
                <SelectTrigger id="horizon">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily schedule</SelectItem>
                  <SelectItem value="Weekly">Weekly schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Working hours</Label>
              <Input
                id="hours"
                value={workingHours}
                maxLength={80}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="btn-shine w-full rounded-xl">
            {loading ? "Planning..." : "Build My Plan"}
          </Button>
        </form>
      }
    />
  );
}
