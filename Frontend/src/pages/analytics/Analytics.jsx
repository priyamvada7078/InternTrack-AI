import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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
  Info,
  Building2,
  Calendar,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Demo/Static Analytics Datasets (clearly labeled in UI as Demo Analytics Data)
const MONTHLY_APPLICATIONS_DATA = [
  { month: "Jan", applications: 12, interviews: 2, offers: 0 },
  { month: "Feb", applications: 18, interviews: 4, offers: 1 },
  { month: "Mar", applications: 24, interviews: 6, offers: 1 },
  { month: "Apr", applications: 15, interviews: 3, offers: 0 },
  { month: "May", applications: 28, interviews: 7, offers: 2 },
  { month: "Jun", applications: 35, interviews: 9, offers: 3 },
];

const STATUS_DISTRIBUTION_DATA = [
  { name: "Applied", value: 42, color: "#6366F1" },
  { name: "OA", value: 8, color: "#F59E0B" },
  { name: "Interview", value: 9, color: "#8B5CF6" },
  { name: "Offer", value: 3, color: "#10B981" },
  { name: "Rejected", value: 11, color: "#EF4444" },
];

const FUNNEL_STAGES = [
  { stage: "Applied", count: 42, rate: "100%" },
  { stage: "Online Assessment", count: 18, rate: "42.8%" },
  { stage: "Interview", count: 9, rate: "21.4%" },
  { stage: "Offer Received", count: 3, rate: "7.1%" },
];

const TOP_COMPANIES = [
  { company: "Stripe", role: "SDE Intern", status: "Interview", responseDays: "4 days" },
  { company: "Vercel", role: "Frontend Intern", status: "OA", responseDays: "2 days" },
  { company: "Notion", role: "Product Intern", status: "Applied", responseDays: "5 days" },
  { company: "Linear", role: "Design Engineer", status: "Offer", responseDays: "3 days" },
  { company: "Figma", role: "Frontend Intern", status: "Rejected", responseDays: "7 days" },
];

export default function Analytics() {
  const { isDark } = useTheme();

  // Dynamic Chart Theme Colors based on Light/Dark mode
  const gridColor = isDark ? "#334155" : "#E2E8F0";
  const textColor = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#0F172A" : "#FFFFFF";
  const tooltipBorder = isDark ? "#1E293B" : "#E2E8F0";
  const tooltipText = isDark ? "#F8FAFC" : "#0F172A";

  const metrics = useMemo(
    () => [
      {
        label: "Response Rate",
        value: "21.4%",
        change: "+4.2% vs last month",
        icon: TrendingUp,
        color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80",
      },
      {
        label: "Interview Conversion",
        value: "21.4%",
        change: "9 interview rounds",
        icon: Clock,
        color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80",
      },
      {
        label: "Offer Conversion Rate",
        value: "7.1%",
        change: "3 active offers",
        icon: Trophy,
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80",
      },
      {
        label: "Rejection Rate",
        value: "26.1%",
        change: "11 total rejections",
        icon: XCircle,
        color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80",
      },
    ],
    []
  );

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
            Insights on application frequency, response rates, and interview conversion funnel.
          </p>
        </div>

        {/* Demo Data Notice Pill */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3.5 py-1.5 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
          <Info className="h-4 w-4 shrink-0" />
          <span>Demo Analytics Data (Backend Analytics API Pending)</span>
        </div>
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
        {/* Line Chart — Applications Over Time */}
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
              6 Month Trend
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_APPLICATIONS_DATA}>
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
                  data={STATUS_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {STATUS_DISTRIBUTION_DATA.map((entry, index) => (
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
            {STATUS_DISTRIBUTION_DATA.map((item) => (
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
            {FUNNEL_STAGES.map((f, idx) => (
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
                    style={{ width: f.rate }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Company Activity */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Target Company Response Speeds
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Average response times and current statuses.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {TOP_COMPANIES.map((c) => (
              <div key={c.company} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                    {c.company[0]}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {c.company}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {c.responseDays} avg
                  </span>
                  <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
