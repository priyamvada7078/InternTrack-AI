
import { Target, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NextBestAction({ action }) {
  const navigate = useNavigate();

  if (!action || !action.application) return null;

  const { title, description, application } = action;

  const applicationId = application._id || application.id;

  const handleViewApplication = () => {
    navigate("/applications", {
      state: {
        openApplicationId: applicationId,
      },
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm dark:border-emerald-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
          <Target className="h-5 w-5 text-white" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
            Next Best Action
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Your priority recommendation
          </p>
        </div>

        <Sparkles className="ml-auto h-5 w-5 text-emerald-500" />
      </div>

      <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <div className="mt-3 rounded-xl bg-white/70 p-3 dark:bg-slate-800">
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          {application.company}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {application.role || application.title}
        </p>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
          Status: {application.status}
        </p>
      </div>

      <button
        type="button"
        onClick={handleViewApplication}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        View Application
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-400">
        Based on your application activity
      </p>
    </div>
  );
}
