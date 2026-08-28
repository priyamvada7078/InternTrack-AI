import DashboardHeader from "./components/DashboardHeader";
import CareerMomentum from "./components/CareerMomentum";
import NextMoves from "./components/NextMoves";
import ApplicationJourney from "./components/ApplicationJourney";
import ActivityTimeline from "./components/ActivityTimeline";
import useDashboard from "./hooks/useDashboard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const { loading, error, refetch } = useDashboard();

  if (loading) {
    return <LoadingSpinner label="Loading career dashboard..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1400px] py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
          Unable to load dashboard data
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {error}
        </p>
        <button
          type="button"
          onClick={refetch}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 pb-10">
      <DashboardHeader />
      <CareerMomentum />
      <NextMoves />
      <ApplicationJourney />
      <ActivityTimeline />
    </div>
  );
}