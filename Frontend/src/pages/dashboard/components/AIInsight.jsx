import { Sparkles } from "lucide-react";

export default function AIInsight() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-teal-50 p-5 shadow-sm">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-200/40 blur-2xl" />

      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400">
          <Sparkles className="h-4 w-4 text-white" />
        </div>

        <h3 className="text-sm font-semibold text-slate-800">
          AI Insight
        </h3>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-600">
        You've applied to 18 companies this month. Based on your previous
        activity, applying to 5 more companies this week could increase your
        interview chances.
      </p>
    </div>
  );
}