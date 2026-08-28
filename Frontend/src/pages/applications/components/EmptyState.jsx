import { Inbox, SearchX, PlusCircle } from "lucide-react";

const EmptyState = ({ isFiltered = false, onAddClick, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-500 dark:text-indigo-400 mb-4">
        {isFiltered ? <SearchX className="w-7 h-7" /> : <Inbox className="w-7 h-7" />}
      </div>

      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1.5">
        {isFiltered ? "No matching applications" : "No applications yet"}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {isFiltered
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Start tracking your internship journey by adding your first application."}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
        >
          Clear filters
        </button>
      ) : (
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Add Application
        </button>
      )}
    </div>
  );
};

export default EmptyState;