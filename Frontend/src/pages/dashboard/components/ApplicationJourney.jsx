import { ArrowRight, ChevronRight, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_JOURNEY, STATUS_STYLES } from "../data/dashboardData";

export default function ApplicationJourney() {
  const navigate = useNavigate();
  const { stages, recentMovement } = APPLICATION_JOURNEY;

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Application journey
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            See how your applications are moving through the pipeline.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/applications")}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors sm:self-auto cursor-pointer"
        >
          <span>View all applications</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-6">
        {/* Pipeline Stage Connected Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stages.map((stage, idx) => {
            const isLast = idx === stages.length - 1;
            return (
              <div key={stage.key} className="relative">
                <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/70 dark:border-slate-800/80 dark:bg-slate-800/40 p-4 transition-all duration-200 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {stage.label}
                    </span>
                    {stage.key === "Offer" && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                      {stage.count}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      apps
                    </span>
                  </div>
                </div>

                {/* Arrow connector between stages on desktop */}
                {!isLast && (
                  <div className="pointer-events-none absolute -right-2.5 top-1/2 hidden -translate-y-1/2 z-10 sm:block">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 shadow-2xs">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sub-section: Recent Movement */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3.5">
            Recent movement
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {recentMovement.map((item) => {
              const statusBadgeStyle =
                STATUS_STYLES[item.status] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-lg px-2"
                >
                  {/* Left: Company Logo Initial + Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white shadow-2xs ${item.bgTint}`}
                    >
                      {item.initial}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.company}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                    </div>
                  </div>

                  {/* Right: Status Tag + Time Ago */}
                  <div className="flex items-center gap-3 ml-auto sm:ml-0">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 ${statusBadgeStyle}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 min-w-[70px] text-right">
                      {item.dateAgo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
