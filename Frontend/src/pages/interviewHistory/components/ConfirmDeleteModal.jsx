import { AlertTriangle, Loader2 } from "lucide-react";

/**
 * ConfirmDeleteModal
 * A simple confirmation dialog before permanently deleting an interview session.
 *
 * Props:
 *   isOpen    {boolean}   – whether the modal is visible
 *   onClose   {Function}  – called when user cancels
 *   onConfirm {Function}  – called when user confirms deletion
 *   deleting  {boolean}   – shows a spinner while the API call is in-flight
 *   sessionName {string}  – displayed in the confirmation message
 */
export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  deleting = false,
  sessionName = "this session",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={!deleting ? onClose : undefined}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 mx-auto">
          <AlertTriangle className="h-6 w-6 text-rose-500" />
        </div>

        {/* Text */}
        <h2 className="mt-4 text-center text-base font-bold text-slate-900 dark:text-white">
          Delete Interview Session?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          You are about to permanently delete{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {sessionName}
          </span>
          . This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
