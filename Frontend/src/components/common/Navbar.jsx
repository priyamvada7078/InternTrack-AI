import { useEffect, useRef, useState } from "react";
import {
  Radar,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import NotificationPanel from "./NotificationPanel";
import useGlobalSearch from "../../hooks/useGlobalSearch";

/**
 * Derive initials from a full name.
 * "Priyamvada Chaudhary" → "PC"
 * "Rahul" → "R"
 */
function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar({ onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useGlobalSearch();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const initials = getInitials(user?.name);
  const displayName = user?.name || "User";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelectResult = () => {
    clearSearch();
    setShowSearchResults(false);
    navigate("/applications");
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout(); // clears token + user state from AuthContext
    navigate("/login");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-slate-900/5 dark:shadow-black/20" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* LEFT: Branding strictly on Left */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:hidden cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div
            onClick={() => navigate("/dashboard")}
            className="flex shrink-0 items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-teal-400 shadow-sm transition-transform group-hover:scale-105">
              <Radar className="h-5 w-5 text-white" strokeWidth={2.25} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                InternTrack <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="hidden rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-indigo-600 ring-1 ring-inset ring-indigo-200/60 dark:bg-indigo-950/80 dark:text-indigo-400 dark:ring-indigo-800 uppercase sm:inline-block">
                AI Powered
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Search Bar */}
        <div className="relative mx-4 hidden w-full max-w-md flex-1 md:block" ref={searchRef}>
          <div className="group relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              placeholder="Search internships, companies..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-10 pr-9 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-xs dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-12 z-50 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in duration-150">
              {searchResults.length > 0 ? (
                searchResults.map((app) => {
                  const compName = typeof app.company === "object" ? app.company.name || "Company" : app.company;
                  const roleName = app.role || app.title || "";
                  return (
                    <div
                      key={app.id || app._id}
                      onClick={handleSelectResult}
                      className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {compName}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {roleName}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {app.status}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  No matching applications found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Notifications, Theme Toggle, Profile Menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((prev) => !prev)}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <NotificationPanel
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4.5 w-4.5 text-amber-400 transition-all duration-300" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-slate-600 transition-all duration-300" />
            )}
          </button>

          <span className="mx-0.5 hidden h-5 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

          {/* Profile Dropdown — shows real user name and dynamic initials */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {/* Dynamic avatar initials */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 text-xs font-bold text-white shadow-2xs">
                {initials}
              </div>
              {/* Real user's name from AuthContext */}
              <span className="hidden text-sm font-semibold text-slate-700 dark:text-slate-200 sm:block">
                {displayName}
              </span>
              <ChevronDown
                className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 transition-all duration-150 ease-out z-50 ${
                dropdownOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
            >
              {/* User info header in dropdown */}
              {user && (
                <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <User className="h-4 w-4 text-slate-400" />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                Settings
              </button>
              <span className="my-1 block h-px bg-slate-100 dark:bg-slate-800" />
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-rose-500" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
