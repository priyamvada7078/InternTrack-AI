
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Main Product Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Applications from "../pages/applications/Applications";
import Analytics from "../pages/analytics/Analytics";
import Resume from "../pages/resume/Resume";
import InterviewPreparation from "../pages/interview/InterviewPreparation";
import InterviewHistory from "../pages/interviewHistory/InterviewHistory";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated Dashboard Shell */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/resume" element={<Resume />} />
        <Route
          path="/interview-preparation"
          element={<InterviewPreparation />}
        />
        <Route path="/interview-history" element={<InterviewHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/help" element={<Profile />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
