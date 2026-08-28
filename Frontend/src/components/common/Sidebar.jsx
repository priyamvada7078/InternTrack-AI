import {
  LayoutDashboard,
  Briefcase,
  User,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Radar,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/applications", icon: Briefcase, label: "Applications" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/resume", icon: FileText, label: "Resume" },
];

function NavItem({ item, collapsed, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
          isActive
            ? "bg-indigo-50 text-indigo-600 font-semibold shadow-2xs dark:bg-indigo-950/80 dark:text-indigo-400"
            : "text-slate-500 font-medium hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200"
        }`
      }
    >
      <item.icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <span className="text-sm truncate">
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  onMobileClose,
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`
        fixed
        top-[72px]
        left-0
        z-50
        h-[calc(100vh-72px)]
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-200/80
        dark:border-slate-800
        shadow-2xs
        transition-all
        duration-300
        flex
        flex-col
        justify-between

        ${collapsed ? "w-20" : "w-[260px]"}

        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div>
          {/* Top Brand Section inside Sidebar */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 shadow-2xs">
                <Radar className="h-5 w-5 text-white" />
              </div>

              {!collapsed && (
                <div className="truncate">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    InternTrack AI
                  </h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    Career Assistant
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:block cursor-pointer"
              aria-label="Toggle Sidebar"
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-3 flex flex-col gap-1 px-3">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.to}
                item={item}
                collapsed={collapsed}
                onClick={onMobileClose}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <NavItem
            item={{
              to: "/settings",
              icon: Settings,
              label: "Settings",
            }}
            collapsed={collapsed}
            onClick={onMobileClose}
          />

          <NavItem
            item={{
              to: "/help",
              icon: HelpCircle,
              label: "Help & Support",
            }}
            collapsed={collapsed}
            onClick={onMobileClose}
          />

          <button
            type="button"
            onClick={() => {
              if (onMobileClose) onMobileClose();
              logout();
              navigate("/login");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-rose-500 font-medium transition-all hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <span className="text-sm truncate">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}