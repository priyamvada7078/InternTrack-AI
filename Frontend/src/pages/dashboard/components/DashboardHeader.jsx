import { Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Extract only the first name from the full name (e.g. "Priyamvada Chaudhary" → "Priyamvada")
  const firstName = user?.name?.trim().split(" ")[0] || "there";

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {greeting}, {firstName} 👋
          </h1>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span>{today}</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:inline-block" />
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
            Here's what is happening with your internship search.
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/applications")}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/30 active:translate-y-0 sm:self-auto cursor-pointer"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        <span>Add Application</span>
      </button>
    </div>
  );
}