import { useContext } from "react";
import AuthContext from "../context/AuthContext";

/**
 * useAuth — convenience hook for consuming AuthContext.
 * Usage: const { user, login, logout, isAuthenticated, loading } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

export default useAuth;
