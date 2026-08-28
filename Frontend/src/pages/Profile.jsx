import { User, Mail, Briefcase, Sparkles, MapPin, Globe } from "lucide-react";

const Profile = () => {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profile & Preferences
        </h1>
        <p className="text-sm text-slate-500">
          Manage your career profile, target roles, and AI recommendation settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column — Personal Details Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-2xl font-bold text-white shadow-md">
              AS
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Aarav Sharma</h2>
            <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-1">
              Computer Science Senior
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>aarav.sharma@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>San Francisco, CA (Open to Remote)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Globe className="h-4 w-4 text-slate-400" />
              <span>github.com/aaravsharma</span>
            </div>
          </div>
        </div>

        {/* Right Column — Target Roles & Resume */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">AI Resume & Profile Sync</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Primary Target Roles
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 border border-indigo-200/60">
                  Backend Engineer Intern
                </span>
                <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 border border-teal-200/60">
                  Full Stack Intern
                </span>
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  Software Engineering Intern
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Resume Version
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Aarav_Sharma_Backend_Resume_2026.pdf
              </p>
              <p className="text-xs text-slate-500">
                Last updated 2 days ago • AI Score: 88/100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;