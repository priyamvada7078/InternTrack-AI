import { User, Mail, Briefcase, Sparkles, MapPin, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Profile = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Student User";
  const displayEmail = user?.email || "user@example.com";
  const initials = getInitials(displayName);

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Profile & Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your career profile, target roles, and personalized application settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column — Personal Details Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-2xl font-bold text-white shadow-md">
              {initials}
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{displayName}</h2>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full mt-1">
              Active Candidate
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-sm">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span className="truncate">{displayEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>Available for Remote / On-site</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Account Status: Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column — Target Roles & Settings */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Career Alignment</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Primary Target Roles
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  Software Engineering Intern
                </span>
                <span className="rounded-lg bg-teal-50 dark:bg-teal-950/80 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                  Full Stack Intern
                </span>
                <span className="rounded-lg bg-purple-50 dark:bg-purple-950/80 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
                  Backend Engineer Intern
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-2">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Workspace Preferences
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Real-time Dashboard Synchronization Active</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Encrypted JWT Session Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;