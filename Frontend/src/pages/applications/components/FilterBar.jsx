import { Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import { STATUS_OPTIONS, MODE_OPTIONS } from "../data/applicationsData";

const FilterBar = ({
  statusFilter,
  onStatusChange,
  modeFilter,
  onModeChange,
  sortBy,
  onSortChange,
}) => {
  const selectClasses =
    "appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 shadow-sm outline-none cursor-pointer transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className={selectClasses}
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      </div>

      {/* Mode Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <select
          value={modeFilter}
          onChange={(e) => onModeChange(e.target.value)}
          className={selectClasses}
        >
          <option value="All">All Modes</option>
          {MODE_OPTIONS.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      </div>

      {/* Sort By */}
      <div className="relative">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClasses}
        >
          <option value="dateDesc">Newest First</option>
          <option value="dateAsc">Oldest First</option>
          <option value="companyAsc">Company (A-Z)</option>
          <option value="companyDesc">Company (Z-A)</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default FilterBar;