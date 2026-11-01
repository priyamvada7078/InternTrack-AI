import { X, MessageSquareText, BookOpen } from "lucide-react";

/**
 * QuestionsModal
 * Displays all questions (and their expected answer points) from a saved
 * interview-prep session in a full-screen scrollable overlay.
 *
 * Props:
 *   isOpen   {boolean}   – whether the modal is visible
 *   onClose  {Function}  – called when the user closes the modal
 *   session  {Object}    – the InterviewHistory document
 */
export default function QuestionsModal({ isOpen, onClose, session }) {
  if (!isOpen || !session) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {session.role}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {session.questions?.length ?? 0} questions · {session.interviewType} · {session.difficulty}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
          {session.questions && session.questions.length > 0 ? (
            session.questions.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50"
              >
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    Q{index + 1}
                  </span>
                  {item.category && (
                    <span className="rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {item.category}
                    </span>
                  )}
                  {item.difficulty && (
                    <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                      {item.difficulty}
                    </span>
                  )}
                </div>

                {/* Question */}
                <h3 className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                  <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                  {item.question}
                </h3>

                {/* Expected points */}
                {Array.isArray(item.expectedPoints) &&
                  item.expectedPoints.length > 0 && (
                    <div className="mt-4 rounded-xl bg-white p-4 dark:bg-slate-800">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <BookOpen className="h-3.5 w-3.5" />
                        Key points a good answer should cover
                      </p>
                      <ul className="space-y-1.5">
                        {item.expectedPoints.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-10">
              No questions found in this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
