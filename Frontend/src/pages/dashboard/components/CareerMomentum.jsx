import { Sparkles, TrendingUp, CheckCircle2, Award, Briefcase, MessageSquareText } from "lucide-react";
import { CAREER_MOMENTUM } from "../data/dashboardData";

export default function CareerMomentum({ data }) {
  const momentum = data || CAREER_MOMENTUM;
  const { score, maxScore = 100, statusText, aiExplanation, metrics, weeklyGrowth } = momentum;

  const metricCards = [
    {
      label: "Applications",
      value: metrics?.applications ?? 0,
      icon: Briefcase,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/80 dark:border-indigo-900/60",
    },
    {
      label: "Response Rate",
      value: metrics?.responseRate ?? "0%",
      icon: MessageSquareText,
      color: "text-teal-600 bg-teal-50 border-teal-100 dark:text-teal-400 dark:bg-teal-950/80 dark:border-teal-900/60",
    },
    {
      label: "Interviews",
      value: metrics?.interviews ?? 0,
      icon: CheckCircle2,
      color: "text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/80 dark:border-purple-900/60",
    },
    {
      label: "Offers",
      value: metrics?.offers ?? 0,
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/80 dark:border-emerald-900/60",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 sm:p-8">
      {/* Background Accent Pill Decoration */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-50/60 to-teal-50/60 blur-2xl dark:from-indigo-950/30 dark:to-teal-950/30" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Column — Score & Heading */}
        <div className="flex flex-col gap-4 lg:max-w-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h2 className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Career Momentum
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-900/80">
              {weeklyGrowth}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {score}
            </span>
            <span className="text-lg font-medium text-slate-400 dark:text-slate-500">
              / {maxScore}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{statusText}</p>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, Math.max(5, (score / maxScore) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden h-36 w-px bg-slate-100 dark:bg-slate-800 lg:block" />

        {/* 4 Key Metrics Grid */}
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {metricCards.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-800/40 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {m.label}
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border ${m.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {m.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Explanation Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-100/80 bg-gradient-to-r from-indigo-50/60 via-slate-50 to-teal-50/60 p-4 text-slate-700 shadow-2xs dark:border-indigo-900/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-teal-950/40 dark:text-slate-300">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 text-xs leading-relaxed sm:text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">AI Insight: </span>
          {aiExplanation}
        </div>
      </div>
    </div>
  );
}
