import { Pencil, Trash2, MapPin, Building2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ApplicationTable = ({ applications, onEdit, onDelete }) => {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Company
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Role
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Location
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Applied On
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Stipend
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {applications.map((app) => (
              <tr
                key={app.id || app._id}
                className="group transition-colors duration-150 hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
              >
                {/* Company */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0 dark:border-slate-700 dark:bg-slate-800">
                      {app.logo ? (
                        <img
                          src={app.logo}
                          alt={`${app.company} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {typeof app.company === "object" ? app.company.name || "Company" : app.company}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {app.role || app.title}
                  </span>
                </td>

                {/* Location */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {app.location}
                  </div>
                </td>

                {/* Applied Date */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {app.appliedDate || app.createdAt
                      ? new Date(app.appliedDate || app.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Recent"}
                  </span>
                </td>

                {/* Stipend */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{app.stipend || "N/A"}</span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <StatusBadge status={app.status} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(app)}
                      aria-label={`Edit application`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-400 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(app)}
                      aria-label={`Delete application`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;