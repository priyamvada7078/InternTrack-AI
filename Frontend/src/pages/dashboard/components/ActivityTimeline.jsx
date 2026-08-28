import { Clock } from "lucide-react";
import { ACTIVITY } from "../data/dashboardData";

export default function ActivityTimeline() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Recent Activity
        </h2>
      </div>

      {/* Main Timeline Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col">
          {ACTIVITY.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === ACTIVITY.length - 1;

            return (
              <div key={item.id || item.text} className="flex gap-4">
                {/* Timeline Icon Node + Connecting Line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-4 ring-white dark:ring-slate-900 border border-slate-200/60 dark:border-slate-700">
                    <Icon className="h-4 w-4" />
                  </div>

                  {!isLast && (
                    <span className="my-1.5 w-0.5 flex-1 bg-slate-200/80 dark:bg-slate-800 min-h-[28px]" />
                  )}
                </div>

                {/* Timeline Content */}
                <div className={isLast ? "pt-1" : "pb-5 pt-1"}>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {item.text}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}