import { useState, useEffect, useMemo, useCallback } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Trophy,
  XCircle,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import internshipService from "../../services/internshipService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Fallback/Default chart data
const DEFAULT_MONTHLY_DATA = [
  { month: "Jan", applications: 0, interviews: 0, offers: 0 },
];

const DEFAULT_STATUS_DATA = [
  { name: "Applied", value: 0, color: "#6366F1" },
  { name: "OA", value: 0, color: "#F59E0B" },
  { name: "Interview", value: 0, color: "#8B5CF6" },
  { name: "Offer", value: 0, color: "#10B981" },
  { name: "Rejected", value: 0, color: "#EF4444" },
];

const DEFAULT_FUNNEL = [
  { stage: "Applied", count: 0, rate: "0%" },
  { stage: "Online Assessment", count: 0, rate: "0%" },
  { stage: "Interview", count: 0, rate: "0%" },
  { stage: "Offer Received", count: 0, rate: "0%" },
];

export default function Analytics() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [recentInternships, setRecentInternships] = useState([]);

  // Dynamic Chart Theme Colors based on Light/Dark mode
  const gridColor = isDark ? "#334155" : "#E2E8F0";
  const textColor = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#0F172A" : "#FFFFFF";
  const tooltipBorder = isDark ? "#1E293B" : "#E2E8F0";
  const tooltipText = isDark ? "#F8FAFC" : "#0F172A";

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const [analyticsRes, internshipsRes] = await Promise.allSettled([
        internshipService.getAnalytics(),
        internshipService.getAllInternships(1, "", "", ""),
      ]);

      if (analyticsRes.status === "fulfilled" && analyticsRes.value?.data) {
        setAnalyticsData(analyticsRes.value.data);
      }
      if (internshipsRes.status === "fulfilled" && internshipsRes.value?.data) {
        setRecentInternships(internshipsRes.value.data.slice(0, 5));
      }
    } catch (err) {
      console.warn("Analytics fetch notice:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const metrics = useMemo(() => {
    const raw = analyticsData?.metrics || {};
    return [
      {
        label: "Response Rate",
        value: raw.responseRate || "0%",
        change: `${raw.interviewCount || 0} active interviews`,
        icon: TrendingUp,
        color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80",
      },
      {
        label: "Interview Conversion",
        value: raw.interviewConversion || "0%",
        change: `${raw.interviewCount || 0} interview stages`,
        icon: Clock,
        color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80",
      },
      {
        label: "Offer Conversion Rate",
        value: raw.offerRate || "0%",
        change: `${raw.offerCount || 0} active offers`,
        icon: Trophy,
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80",
      },
      {
        label: "Rejection Rate",
        value: raw.rejectionRate || "0%",
        change: `${raw.rejectionCount || 0} total rejections`,
        icon: XCircle,
        color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80",
      },
    ];
  }, [analyticsData]);

  const monthlyData = analyticsData?.monthlyData || DEFAULT_MONTHLY_DATA;
  const statusDistribution = analyticsData?.statusDistribution || DEFAULT_STATUS_DATA;
  const funnelStages = analyticsData?.funnelStages || DEFAULT_FUNNEL;

  if (loading) {
    return <LoadingSpinner label="Calculating career analytics..." />;
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Career & Search Analytics
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time insights on your application volume, response rates, and interview conversion funnel.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {m.label}
                </span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${m.color}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                {m.value}
              </div>
              <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                {m.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1: Applications Over Time & Status Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Line / Area Chart — Applications Over Time */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Application Activity Over Time
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly application submissions, interview invites, and offers.
              </p>
            </div>
            <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              Live Trend
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: "12px",
                    color: tooltipText,
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area type="monotone" dataKey="applications" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" name="Applications" />
                <Area type="monotone" dataKey="interviews" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInterviews)" name="Interviews" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart — Status Distribution */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Status Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribution across all application pipeline statuses.
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: "12px",
                    color: tooltipText,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {item.name}: <strong className="text-slate-900 dark:text-white">{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Application Funnel & Top Target Companies */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Application Conversion Funnel */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Application Conversion Funnel
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Progression from application submit to offer acceptance.
              </p>
            </div>
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="space-y-3 pt-2">
            {funnelStages.map((f) => (
              <div key={f.stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{f.stage}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {f.count} apps ({f.rate})
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 transition-all duration-700"
                    style={{ width: f.rate || "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications from Real Database */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Application Statuses
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live updates on your latest active submissions.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentInternships.length > 0 ? (
              recentInternships.map((c) => {
                const compName = typeof c.company === "object" ? c.company?.name || "Company" : (c.company || "Company");
                const roleName = c.role || c.title || "Internship";
                return (
                  <div key={c._id || c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/80 font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                        {compName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                          {compName}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{roleName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {c.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No applications added yet. Add an application to see analytics.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
