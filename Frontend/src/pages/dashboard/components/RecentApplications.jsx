import Card from "./Card";
import StatusBadge from "./StatusBadge";
import { APPLICATIONS } from "../data/dashboardData";

export default function RecentApplications() {
  return (
    <Card
      title="Recent Applications"
      action={
        <button className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700">
          View all
        </button>
      }
      className="lg:col-span-2"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="pb-3 pr-4">Company</th>
              <th className="pb-3 pr-4">Role</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Applied Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {APPLICATIONS.map((app) => (
              <tr
                key={`${app.company}-${app.role}`}
                className="text-sm"
              >
                <td className="py-3 pr-4 font-medium text-slate-800">
                  {app.company}
                </td>

                <td className="py-3 pr-4 text-slate-500">
                  {app.role}
                </td>

                <td className="py-3 pr-4">
                  <StatusBadge status={app.status} />
                </td>

                <td className="py-3 text-slate-500">
                  {app.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}