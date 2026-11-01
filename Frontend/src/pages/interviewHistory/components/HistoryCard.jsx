import {
  Sparkles,
  Building2,
  BriefcaseBusiness,
  BarChart2,
  Calendar,
  Eye,
  RotateCcw,
  Trash2,
} from "lucide-react";

// Native date formatter — no extra dependency required
const formatDate = (d) => {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(d));
  } catch {
    return "—";
  }
};

/**
 * HistoryCard
 * Displays a summary of one saved interview-prep session.
 *
 * Props:
 *   session    {Object}   – InterviewHistory document
 *   onView     {Function} – open the Q&A view modal
 *   onContinue {Function} – navigate back to prep page pre-filled
 *   onDelete   {Function} – open the delete confirmation modal
 */
export default function HistoryCard({ session, onView, onContinue, onDelete }) {
  const {
    role,
    company,
    interviewType,
    difficulty,
    questions = [],
    generatedAt,
    aiGenerated,
  } = session;

  // Colour map for interview type badge
  const typeBadge = {
    Technical: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    HR: "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    Mixed: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  };

  // Colour map for difficulty badge
  const diffBadge = {
    Beginner:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Intermediate:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    Advanced:
      "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  };

  const formattedDate = formatDate(generatedAt);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Card Body */}
      <div className="flex-1 p-5">
        {/* Top row – role + AI badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white truncate">
              <BriefcaseBusiness className="h-4 w-4 shrink-0 text-indigo-500" />
              <span className="truncate">{role}</span>
            </h3>

            {company && (
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{company}</span>
              </p>
            )}
          </div>

          {aiGenerated && (
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Sparkles className="h-3 w-3" />
              AI
            </span>
          )}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
              typeBadge[interviewType] ?? typeBadge.Mixed
            }`}
          >
            {interviewType}
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
              diffBadge[difficulty] ?? diffBadge.Intermediate
            }`}
          >
            {difficulty}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4 text-slate-400" />
            <span className="font-medium">{questions.length}</span> questions
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-400" />
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Action strip */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 px-5 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition dark:text-indigo-400 dark:hover:bg-indigo-950/60"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>

          <button
            onClick={onContinue}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Continue
          </button>
        </div>

        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 transition dark:hover:bg-rose-950/40"
          aria-label="Delete session"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
