import { AlertTriangle, X } from "lucide-react";

const DeleteApplicationModal = ({ isOpen, onClose, onConfirm, application }) => {
  if (!isOpen || !application) return null;

  const companyName = typeof application.company === "object" ? application.company.name || "Company" : application.company;
  const roleName = application.role || application.title || "Role";

  const handleConfirm = () => {
    onConfirm(application.id || application._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 z-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-500 mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h2 className="text-base font-semibold text-slate-800 dark:text-white mb-1.5">
            Delete Application?
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Are you sure you want to delete the application for{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">{roleName}</span> at{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">{companyName}</span>? This
            action cannot be undone.
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-rose-600 shadow-sm hover:bg-rose-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteApplicationModal;