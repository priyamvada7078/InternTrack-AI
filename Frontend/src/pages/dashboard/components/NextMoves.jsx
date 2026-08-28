import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NEXT_MOVES } from "../data/dashboardData";

export default function NextMoves() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Your next moves
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            AI-powered actions based on your current progress.
          </p>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {NEXT_MOVES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md"
            >
              <div>
                {/* Top Row: Icon + Priority Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.iconBg} dark:bg-slate-800 dark:text-indigo-400`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${item.priorityBg} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300`}
                  >
                    {item.priority}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  "{item.description}"
                </p>
              </div>

              {/* Action Button CTA */}
              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => navigate(item.actionLink)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
