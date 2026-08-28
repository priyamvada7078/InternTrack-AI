import { useState, useEffect, useCallback } from "react";
import internshipService from "../../../services/internshipService";
import { CAREER_MOMENTUM, APPLICATION_JOURNEY } from "../data/dashboardData";

export default function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await internshipService.getDashboardStats();
      if (result?.success && result?.data) {
        setStats(result.data);
      } else {
        setStats(null);
      }
    } catch (err) {
      console.warn("Dashboard stats API notice: using fallback data", err?.message);
      setError(null); // Keep graceful fallback active
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Derived dashboard metrics (combining real stats when available with dashboard representation)
  const momentumData = {
    ...CAREER_MOMENTUM,
    metrics: {
      applications: stats?.total ?? CAREER_MOMENTUM.metrics.applications,
      responseRate: CAREER_MOMENTUM.metrics.responseRate,
      interviews: stats?.interview ?? CAREER_MOMENTUM.metrics.interviews,
      offers: stats?.offer ?? CAREER_MOMENTUM.metrics.offers,
    },
  };

  const journeyData = {
    ...APPLICATION_JOURNEY,
    stages: [
      { key: "Applied", label: "Applied", count: stats?.applied ?? 42, color: "indigo" },
      { key: "OA", label: "Online Assessment", count: stats?.oa ?? 8, color: "amber" },
      { key: "Interview", label: "Interview", count: stats?.interview ?? 9, color: "purple" },
      { key: "Offer", label: "Offer", count: stats?.offer ?? 3, color: "emerald" },
    ],
  };

  return {
    loading,
    error,
    stats,
    momentumData,
    journeyData,
    refetch: fetchStats,
  };
}
