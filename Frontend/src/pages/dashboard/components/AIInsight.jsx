
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function AIInsight({
  insights,
  loading,
  error,
  onAnalyze,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-teal-50 p-5 shadow-sm dark:border-indigo-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400">
          <Sparkles className="h-4 w-4 text-white" />
        </div>

        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
          AI Career Insights
        </h3>
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Get personalized career insights based on your internship applications.
      </p>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {insights ? "Analyze Again" : "Analyze My Applications"}
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {insights && (
        <div className="mt-5 rounded-xl border border-indigo-100 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-800/80">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" />
            Your Career Analysis
          </div>

          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>
              {insights
                .replace(/\\#/g, "#")
                .replace(/\\\*/g, "*")
                .replace(/&#x20;/g, " ")}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
