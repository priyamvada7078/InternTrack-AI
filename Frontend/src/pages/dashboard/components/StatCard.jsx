import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  description,
  trend,
  icon: Icon,
  tint,
}) {
  const TrendIcon =
    trend.direction === "up" ? ArrowUpRight : ArrowDownRight;

  const trendColor =
    trend.direction === "up"
      ? "text-emerald-600"
      : "text-rose-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}
        >
          <Icon className="h-5.5 w-5.5" />
        </div>

        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {trend.value}
        </span>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-0.5 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}