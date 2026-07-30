import type { LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  series?: number[];
};

/** Compact glass metric card with an optional sparkline. */
export function StatCard({ label, value, delta, icon: Icon, series }: StatCardProps) {
  const data = (series ?? []).map((v, i) => ({ i, v }));

  return (
    <article className="glass glass-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl border border-border text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      {data.length > 1 && (
        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--aqua)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--aqua)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--aqua)"
                strokeWidth={2}
                fill={`url(#spark-${label.replace(/\s/g, "")})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
