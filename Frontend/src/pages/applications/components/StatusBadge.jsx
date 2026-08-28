import { CheckCircle2, Clock, XCircle, Trophy, Send } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied: {
      icon: Send,
      classes: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    },
    Interviewing: {
      icon: Clock,
      classes: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/80 dark:text-indigo-400 dark:border-indigo-900/60",
    },
    Interview: {
      icon: Clock,
      classes: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/80 dark:text-indigo-400 dark:border-indigo-900/60",
    },
    OA: {
      icon: Clock,
      classes: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-900/60",
    },
    "Online Assessment": {
      icon: Clock,
      classes: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-900/60",
    },
    Offer: {
      icon: Trophy,
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-900/60",
    },
    Rejected: {
      icon: XCircle,
      classes: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/80 dark:text-rose-400 dark:border-rose-900/60",
    },
    Accepted: {
      icon: CheckCircle2,
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-900/60",
    },
  };

  const config = statusConfig[status] || statusConfig.Applied;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${config.classes}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

export default StatusBadge;