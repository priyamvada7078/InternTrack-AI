import { createContext, useContext, useEffect, useState, useCallback } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and provides centralized auth state.
 *
 * On mount:
 *  1. Checks localStorage for a saved token.
 *  2. If a token exists, calls GET /api/auth/me to restore the current user.
 *  3. Sets loading=false once done.
 *
 * Provides:
 *  user           — { id, name, email, role } or null
 *  isAuthenticated — boolean
 *  loading        — true while restoring session on startup
 *  login()        — logs in, fetches user, sets state
 *  logout()       — clears token + user state, returns to /login
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until session check is done

  // Restore session on app startup
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getMe();
        if (data?.user) {
          setUser(data.user);
        } else {
          // Token exists but /me failed — clear stale token
          localStorage.removeItem("token");
        }
      } catch {
        // Invalid/expired token — clear it
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * login — calls authService.login, then fetches the user via /me.
   * @param {object} credentials — { email, password }
   */
  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials); // stores token in localStorage
    // After token is stored, fetch the real user object
    const meData = await authService.getMe();
    if (meData?.user) {
      setUser(meData.user);
    }
    return data;
  }, []);

  /**
   * logout — clears token, clears user state.
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — consume AuthContext in any component.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

export default AuthContext;
