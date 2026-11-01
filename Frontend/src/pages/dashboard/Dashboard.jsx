
import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import DashboardHeader from "./components/DashboardHeader";
import CareerMomentum from "./components/CareerMomentum";
import AIInsight from "./components/AIInsight";
import NextBestAction from "./components/NextBestAction";
import NextMoves from "./components/NextMoves";
import ApplicationJourney from "./components/ApplicationJourney";
import ActivityTimeline from "./components/ActivityTimeline";

import useDashboard from "./hooks/useDashboard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getCareerInsights } from "../../services/aiService";
import internshipService from "../../services/internshipService";

// Select the highest-priority application
const getPriorityAction = (applications) => {
  if (!applications || applications.length === 0) return null;

  const sortedApplications = [...applications].sort(
    (a, b) =>
      new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0)
  );

  // Priority 1: Offer
  const offer = sortedApplications.find(
    (app) => app.status === "Offer"
  );

  if (offer) {
    return {
      title: "Review Your Internship Offer",
      description:
        "You have an offer waiting in your application tracker. Review its details and decide your next steps.",
      application: offer,
    };
  }

  // Priority 2: Interview
  const interview = sortedApplications.find(
    (app) => app.status === "Interview"
  );

  if (interview) {
    return {
      title: "Prepare for Your Interview",
      description:
        "You have an application in the interview stage. Review the role and prepare for the next round.",
      application: interview,
    };
  }

  // Priority 3: Applied for 7 or more days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const oldApplication = sortedApplications.find((app) => {
    if (app.status !== "Applied" || !app.appliedDate) {
      return false;
    }

    const appliedDate = new Date(app.appliedDate);

    return (
      !Number.isNaN(appliedDate.getTime()) &&
      appliedDate <= sevenDaysAgo
    );
  });

  if (oldApplication) {
    return {
      title: "Consider Following Up",
      description:
        "This application has been in the Applied stage for at least 7 days. Consider checking its status or sending a polite follow-up.",
      application: oldApplication,
    };
  }

  return null;
};

export default function Dashboard() {
  const {
    loading,
    error,
    refetch,
    momentumData,
    journeyData,
    activityList,
  } = useDashboard();

  // AI Insights state
  const [insights, setInsights] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Application and Next Best Action state
  const [applications, setApplications] = useState([]);
  const [actionLoading, setActionLoading] = useState(true);

  // Fetch actual applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setActionLoading(true);

        const response = await internshipService.getAllInternships(1);

        setApplications(
          Array.isArray(response?.data) ? response.data : []
        );
      } catch (err) {
        console.error("Application fetch error:", err);
        setApplications([]);
      } finally {
        setActionLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Determine the highest-priority action
  const nextAction = getPriorityAction(applications);

  // Fetch AI career insights
  const handleAnalyze = async () => {
    try {
      setAiLoading(true);
      setAiError("");

      const data = await getCareerInsights();
      setInsights(data.insights);
    } catch (err) {
      console.error("AI insights error:", err);

      setAiError(
        err.response?.data?.message ||
          "Unable to generate AI insights. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

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

      <CareerMomentum data={momentumData} />

      <AIInsight
        insights={insights}
        loading={aiLoading}
        error={aiError}
        onAnalyze={handleAnalyze}
      />

      {!actionLoading && nextAction && (
        <NextBestAction action={nextAction} />
      )}

      <NextMoves />

      <ApplicationJourney data={journeyData} />

      <ActivityTimeline activities={activityList} />
    </div>
  );
}
