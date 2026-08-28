import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const applyBreakpoint = () => {
      if (tabletQuery.matches) {
        setCollapsed(true);
      }
      if (desktopQuery.matches || tabletQuery.matches) {
        setMobileOpen(false);
      }
    };

    applyBreakpoint();
    tabletQuery.addEventListener("change", applyBreakpoint);
    desktopQuery.addEventListener("change", applyBreakpoint);

    return () => {
      tabletQuery.removeEventListener("change", applyBreakpoint);
      desktopQuery.removeEventListener("change", applyBreakpoint);
    };
  }, []);

  // Still restoring session from localStorage — wait before deciding
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingSpinner label="Loading your workspace..." />
      </div>
    );
  }

  // Session restored and user is not authenticated — redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar — fixed on tablet/desktop, off-canvas drawer on mobile */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={`transition-all duration-300 ${
          collapsed ? "md:pl-20" : "md:pl-[260px]"
        }`}
      >
        <Navbar
          collapsed={collapsed}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="pt-[88px] px-4 sm:px-6 lg:px-8 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}