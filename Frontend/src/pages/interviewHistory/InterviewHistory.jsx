import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  BrainCircuit,
  CalendarDays,
  MessageSquareText,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  getHistories,
  deleteHistory,
} from "../../services/interviewHistoryService";

import HistoryCard from "./components/HistoryCard";
import QuestionsModal from "./components/QuestionsModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

// ─── Skeleton loader ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 animate-pulse">
      <div className="h-4 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700 mb-3" />
      <div className="h-3 w-1/2 rounded-lg bg-slate-100 dark:bg-slate-800 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="h-3 w-1/3 rounded-lg bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function InterviewHistory() {
  const navigate = useNavigate();

  // ── data state ──
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    totalSessions: 0,
    totalQuestions: 0,
    mostRecent: null,
  });

  // ── filter / sort state ──
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [interviewType, setInterviewType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState("newest");

  // ── pagination state ──
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const LIMIT = 9;

  // ── modal state ──
  const [viewSession, setViewSession] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── toast state ──
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }
  const toastTimer = useRef(null);

  // ── debounce search input ──
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── show transient toast ──
  const showToast = (type, message) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // ── fetch histories ──
  const fetchHistories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        search: debouncedSearch,
        interviewType,
        difficulty,
        sort,
        page,
        limit: LIMIT,
      };
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;

      const res = await getHistories(params);
      const { data, total, totalPages: tp, summary: s } = res.data;

      setHistories(data ?? []);
      setTotalCount(total ?? 0);
      setTotalPages(tp ?? 1);

      // Summary reflects total across ALL sessions (not just this page)
      // We received the current-page summary; persist running totals from
      // the server's `summary.totalSessions` which equals `total`.
      setSummary({
        totalSessions: s?.totalSessions ?? total ?? 0,
        totalQuestions: s?.totalQuestions ?? 0,
        mostRecent: s?.mostRecent ?? null,
      });
    } catch (err) {
      console.error("Fetch interview history error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load your interview history. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, interviewType, difficulty, dateFrom, dateTo, sort, page]);

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  // ── reset page when filters change ──
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  // ── delete ──
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteHistory(deleteTarget._id);
      setDeleteTarget(null);
      showToast("success", "Interview session deleted.");
      // refresh list
      fetchHistories();
    } catch (err) {
      console.error("Delete history error:", err);
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete session."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ── continue prep ──
  const handleContinue = (session) => {
    const params = new URLSearchParams({
      role: session.role ?? "",
      company: session.company ?? "",
      interviewType: session.interviewType ?? "Mixed",
      difficulty: session.difficulty ?? "Intermediate",
    });
    navigate(`/interview-preparation?${params.toString()}`);
  };

  // ─── helper: format most-recent date ────────────────────────────
  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  // ─── render ───────────────────────────────────────────────────────
  return (
    <div className="space-y-7">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg transition
            ${
              toast.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
        >
          {toast.message}
        </div>
      )}

      {/* ── Page Header ── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-950">
            <BrainCircuit className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            AI Career Assistant
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Interview Preparation History
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track your previous interview preparation sessions.
        </p>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: History,
            label: "Total Sessions",
            value: summary.totalSessions,
            color: "indigo",
          },
          {
            icon: MessageSquareText,
            label: "Total Questions",
            value: summary.totalQuestions,
            color: "teal",
          },
          {
            icon: Clock,
            label: "Most Recent",
            value: formatDate(summary.mostRecent),
            color: "violet",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className={`flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900`}
          >
            <div
              className={`rounded-xl bg-${color}-50 p-3 dark:bg-${color}-950/60`}
            >
              <Icon
                className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters & Search ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by role or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950"
              />
            </div>

            {/* Sort toggle */}
            <button
              onClick={() =>
                handleFilterChange(setSort)(
                  sort === "newest" ? "oldest" : "newest"
                )
              }
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sort === "newest" ? "Newest" : "Oldest"}
            </button>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-400" />

            {/* Interview Type */}
            <select
              value={interviewType}
              onChange={(e) =>
                handleFilterChange(setInterviewType)(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Types</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Mixed">Mixed</option>
            </select>

            {/* Difficulty */}
            <select
              value={difficulty}
              onChange={(e) =>
                handleFilterChange(setDifficulty)(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) =>
                  handleFilterChange(setDateFrom)(e.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => handleFilterChange(setDateTo)(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Clear filters */}
            {(search || interviewType !== "All" || difficulty !== "All" || dateFrom || dateTo) && (
              <button
                onClick={() => {
                  setSearch("");
                  setInterviewType("All");
                  setDifficulty("All");
                  setDateFrom("");
                  setDateTo("");
                  setPage(1);
                }}
                className="text-xs font-semibold text-rose-500 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      {loading ? (
        /* Skeleton */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        /* Error state */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center dark:border-rose-900 dark:bg-rose-950/20">
          <AlertCircle className="h-8 w-8 text-rose-500 mb-3" />
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
            {error}
          </p>
          <button
            onClick={() => fetchHistories()}
            className="mt-4 rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition"
          >
            Retry
          </button>
        </div>
      ) : histories.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-950/40 mb-5">
            <History className="h-10 w-10 text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            No interview sessions yet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {debouncedSearch || interviewType !== "All" || difficulty !== "All" || dateFrom || dateTo
              ? "No sessions match your current filters. Try adjusting them."
              : "Start your first AI-powered interview prep session and it will appear here."}
          </p>
          <button
            onClick={() => navigate("/interview-preparation")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            <MessageSquareText className="h-4 w-4" />
            Start Interview Prep
          </button>
        </div>
      ) : (
        /* History grid */
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {histories.map((session) => (
              <HistoryCard
                key={session._id}
                session={session}
                onView={() => setViewSession(session)}
                onContinue={() => handleContinue(session)}
                onDelete={() => setDeleteTarget(session)}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {(page - 1) * LIMIT + 1}–
                {Math.min(page * LIMIT, totalCount)} of {totalCount} sessions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - page) <= 1
                  )
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1)
                      acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-slate-400"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                          p === page
                            ? "bg-indigo-600 text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Modals ── */}
      <QuestionsModal
        isOpen={!!viewSession}
        onClose={() => setViewSession(null)}
        session={viewSession}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
        sessionName={deleteTarget ? `"${deleteTarget.role}"` : ""}
      />
    </div>
  );
}
