import { Pencil, Trash2, MapPin, Calendar, Wallet, Building2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ApplicationCard = ({ application, onEdit, onDelete }) => {
  const { company, role, location, appliedDate, stipend, status, logo, mode, createdAt } = application;
  const companyName = typeof company === "object" ? company.name || "Company" : company;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Header: Logo, Company, Role + Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0 dark:border-slate-700 dark:bg-slate-800">
            {logo ? (
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{companyName}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{role}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(application)}
            aria-label={`Edit application`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-400 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(application)}
            aria-label={`Delete application`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {location}
          {mode && <><span className="text-slate-300 dark:text-slate-600">•</span>{mode}</>}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          Applied on{" "}
          {appliedDate || createdAt
            ? new Date(appliedDate || createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Recent"}
        </div>
        {stipend && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Wallet className="w-3.5 h-3.5 shrink-0" />
            {stipend}
          </div>
        )}
      </div>

      {/* Footer: Status badge */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

export default ApplicationCard;