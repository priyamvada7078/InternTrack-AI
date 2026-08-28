import { Building2 } from "lucide-react";

const Organizations = () => {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Organizations
          </h1>
          <p className="text-sm text-slate-500">
            Explore companies hiring interns and track application deadlines.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
        <Building2 className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-4 text-base font-semibold text-slate-800">
          Company Database & Insights
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          View application deadlines, interview process insights, and referral networks for top tech organizations.
        </p>
      </div>
    </div>
  );
};

export default Organizations;